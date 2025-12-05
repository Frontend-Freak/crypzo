import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addFavorites, fetchFavorites, removeFavorites, fetchFavoriteCoins } from "./add-favorites-thunk";
import type { FavoritesState } from "../shared/types";

const initialState: FavoritesState = {
	coins: [],
	loading: false,
	favoriteCoinsData: [],
	error: null,
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		toggleLocalFavorite(state, action: PayloadAction<string>) {
			const coinId = action.payload;
			if (state.coins.includes(coinId)) {
				state.coins = state.coins.filter((currentId) => currentId !== coinId);
			} else {
				state.coins.push(coinId);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorites.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
				state.loading = false;
				state.coins = action.payload;
			})
			.addCase(fetchFavorites.rejected, (state) => {
				state.loading = false;
			})
			.addCase(addFavorites.fulfilled, (state, action: PayloadAction<string>) => {
				if (!state.coins.includes(action.payload)) state.coins.push(action.payload);
			})
			.addCase(removeFavorites.fulfilled, (state, action: PayloadAction<string>) => {
				state.coins = state.coins.filter((coinId) => coinId !== action.payload);
			})
			.addCase(fetchFavoriteCoins.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoriteCoins.fulfilled, (state, action) => {
				state.loading = false;
				state.favoriteCoinsData = action.payload;
				state.error = null;
			})
			.addCase(fetchFavoriteCoins.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? null;
			});
	},
});

export const { toggleLocalFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
