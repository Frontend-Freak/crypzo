import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CoinTypes, SearchCoin } from "../shared/types";
import { apiKey } from "../shared/constants";

export const fetchTotalCoins = createAsyncThunk<number>("crypto/fetchTotalCoins", async (_, thunkAPI) => {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/list", {
			headers: {
				"x-cg-demo-api-key": apiKey,
			},
		});
		const data = await response.json();
		return data.length;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const fetchCryptoList = createAsyncThunk<CoinTypes[], number>("crypto/fetchList", async (page = 1, thunkAPI) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}`, {
			headers: {
				"x-cg-demo-api-key": apiKey,
			},
		});
		const data = await response.json();
		return data;
	} catch (error: unknown) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const fetchCoinOverview = createAsyncThunk<CoinTypes, string>("crypto/fetchCoinOverview", async (id: string) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
			headers: {
				"x-cg-demo-api-key": apiKey,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return console.error(error);
	}
});

export const searchCoins = createAsyncThunk<CoinTypes[], string>("crypto/search", async (query, thunkAPI) => {
	try {
		const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
			headers: {
				"x-cg-demo-api-key": apiKey,
			},
		});
		const data: { coins: SearchCoin[] } = await response.json();

		function sleep(ms: number) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		await sleep(1000);

		const ids = data.coins.map((coin) => coin.id).join(",");

		const marketResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, {
			headers: {
				"x-cg-demo-api-key": apiKey,
			},
		});
		const coins: CoinTypes[] = await marketResponse.json();

		return coins;
	} catch (error: unknown) {
		return thunkAPI.rejectWithValue(error);
	}
});
