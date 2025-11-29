import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./crypto-slice";
import authReducer from "./auth-slice";
import authFormReducer from "./login-slice";
import searchReducer from "./search-slice";

export const store = configureStore({
	reducer: {
		crypto: cryptoReducer,
		search: searchReducer,
		auth: authReducer,
		authForm: authFormReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
