import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./crypto-slice";
import authReducer from "./auth-slice"

export const store = configureStore({
	reducer: {
		crypto: cryptoReducer,
		auth: authReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
