import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CoinTypes, SearchCoin } from "../shared/types";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const apiKey = "CG-by3eATfETrP41v21nPAumTuG";

export const fetchTotalCoins = createAsyncThunk<number>("crypto/fetchTotalCoins", async (_, thunkAPI) => {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/list", {
			headers: { "x-cg-demo-api-key": apiKey },
		});
		if (!response.ok) throw new Error(`Status: ${response.status}`);
		const data = await response.json();
		return data.length;
	} catch (error: unknown) {
		let message = "Unknown error";
		if (error instanceof Error) message = error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const fetchCryptoList = createAsyncThunk<CoinTypes[], number>("crypto/fetchList", async (page = 1, thunkAPI) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}`, { headers: { "x-cg-demo-api-key": apiKey } });
		if (!response.ok) throw new Error(`Status: ${response.status}`);
		const data: CoinTypes[] = await response.json();
		return data;
	} catch (error: unknown) {
		let message = "Unknown error";
		if (error instanceof Error) message = error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const fetchCoinOverview = createAsyncThunk<CoinTypes, string>("crypto/fetchCoinOverview", async (id: string, thunkAPI) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
			headers: { "x-cg-demo-api-key": apiKey },
		});
		if (!response.ok) throw new Error(`Status: ${response.status}`);
		const data: CoinTypes = await response.json();
		return data;
	} catch (error: unknown) {
		let message = "Unknown error";
		if (error instanceof Error) message = error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const searchCoins = createAsyncThunk<CoinTypes[], string>("crypto/search", async (query, thunkAPI) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
			headers: { "x-cg-demo-api-key": apiKey },
		});
		if (!response.ok) throw new Error(`Status: ${response.status}`);
		const data: { coins: SearchCoin[] } = await response.json();

		await sleep(1000);

		const ids = data.coins.map((c) => c.id).join(",");
		if (!ids) return [];

		const marketResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, { headers: { "x-cg-demo-api-key": apiKey } });
		if (!marketResponse.ok) throw new Error(`Status: ${marketResponse.status}`);
		const coins: CoinTypes[] = await marketResponse.json();

		return coins;
	} catch (error: unknown) {
		let message = "Unknown error";
		if (error instanceof Error) message = error.message;
		return thunkAPI.rejectWithValue(message);
	}
});
