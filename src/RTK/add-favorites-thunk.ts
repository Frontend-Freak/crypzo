import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getFavorites, addFavorite, removeFavorite, type FavoriteItem } from "../shared/add-favorite";
import { apiKey } from "../shared/constants";


export const fetchFavorites = createAsyncThunk<string[], string>("favorites/fetch", async (userId: string) => {
	const response: FavoriteItem[] = await getFavorites(userId);
	return response.map((item) => item.coin_id);
});

export const addFavorites = createAsyncThunk<string, { userId: string; coinId: string }, { state: RootState }>("favorites/add", async ({ userId, coinId }) => {
	await addFavorite(userId, coinId);
	return coinId;
});

export const removeFavorites = createAsyncThunk<string, { userId: string; coinId: string }, { state: RootState }>("favorites/remove", async ({ userId, coinId }) => {
	await removeFavorite(userId, coinId);
	return coinId;
});

export const fetchFavoriteCoins = createAsyncThunk("favorites/fetchFavoriteCoins", async (ids: string[], thunkAPI) => {
	try {
		const query = ids.join(",");
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}`, {
			headers: { "x-cg-demo-api-key": apiKey },
		});
		const data = await response.json();
		return data;
	} catch (error: unknown) {
		return thunkAPI.rejectWithValue(error);
	}
});
