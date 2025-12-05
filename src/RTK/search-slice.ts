import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CoinTypes } from "../shared/types";
import { searchCoins } from "./crypto-thunk";

interface SearchState {
	list: CoinTypes[];
	loading: boolean;
	error: string | null;
}

const initialState: SearchState = {
	list: [],
	loading: false,
	error: null,
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchCoins.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.list = [];
			})
			.addCase(searchCoins.fulfilled, (state, action: PayloadAction<CoinTypes[]>) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(searchCoins.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.list = [];
			});
	},
});

export default searchSlice.reducer;
