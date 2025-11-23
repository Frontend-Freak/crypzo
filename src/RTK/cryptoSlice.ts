import type {PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CryptoState, CoinTypes } from "../shared/types";
import { COINS_PER_PAGE } from "../shared/constants";

export const fetchTotalCoins = createAsyncThunk<number>("crypto/fetchTotalCoins", async (_, thunkAPI) => {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/list", {
			headers: {
				"x-cg-demo-api-key": "CG-by3eATfETrP41v21nPAumTuG",
			},
		});
		const data = await response.json();
		console.log(data);
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
		console.log(data);
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

const initialState: CryptoState = {
	list: [],
	overview: null,
	totalPages: 1,
	loading: false,
	error: null,
};

const cryptoSlice = createSlice({
	name: "crypto",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTotalCoins.fulfilled, (state, action: PayloadAction<number>) => {
				state.totalPages = Math.ceil(action.payload / COINS_PER_PAGE);
			})
			.addCase(fetchCryptoList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCryptoList.fulfilled, (state, action: PayloadAction<CoinTypes[]>) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(fetchCryptoList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Оштбка";
			})
			.addCase(fetchCoinOverview.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoinOverview.fulfilled, (state, action: PayloadAction<CoinTypes>) => {
				state.loading = false;
				state.overview = action.payload;
			})
			.addCase(fetchCoinOverview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error";
			});
	},
});

export default cryptoSlice.reducer;
