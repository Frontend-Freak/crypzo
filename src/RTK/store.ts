import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./crypto-slice";
import authReducer from "./auth-slice";
import authFormReducer from "./login-slice";
import searchReducer from "./search-slice";
import favoriteReducer from "./add-favorites-slice";
import themeReducer from "./theme-slice"

export const store = configureStore({
	reducer: {
		crypto: cryptoReducer,
		search: searchReducer,
		auth: authReducer,
		authForm: authFormReducer,
		favorites: favoriteReducer,
		theme: themeReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
