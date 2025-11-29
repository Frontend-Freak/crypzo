import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CryptoState, CoinTypes } from "../shared/types";
import { COINS_PER_PAGE } from "../shared/constants";
import { fetchCoinOverview, fetchCryptoList, fetchTotalCoins } from "./crypto-thunk";

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
