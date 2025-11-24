import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CoinTypes } from "../shared/types";

export const fetchTotalCoins = createAsyncThunk<number>("crypto/fetchTotalCoins", async (_, thunkAPI) => {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/list", {
			headers: {
				"x-cg-demo-api-key": "CG-by3eATfETrP41v21nPAumTuG",
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
				"x-cg-demo-api-key": "CG-by3eATfETrP41v21nPAumTuG",
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
				"x-cg-demo-api-key": "CG-by3eATfETrP41v21nPAumTuG",
			},
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		return console.error(error)
	}
});