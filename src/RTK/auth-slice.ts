import { createSlice} from "@reduxjs/toolkit";
import type { AuthState } from "../shared/types";
import { checkAuthThunk, signInThunk, signUpThunk, signOutThunk } from "./auth-thunk";


const initialState: AuthState = {
	user: null,
	checkingAuth: true,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuthThunk.pending, (state) => {
				state.checkingAuth = true;
			})
			.addCase(checkAuthThunk.fulfilled, (state, action) => {
				state.user = action.payload;
				state.checkingAuth = false;
			})
			.addCase(checkAuthThunk.rejected, (state) => {
				state.user = null;
				state.checkingAuth = false;
			})
			.addCase(signInThunk.pending, (state) => {
				state.checkingAuth = true;
				state.error = null;
			})
			.addCase(signInThunk.fulfilled, (state, action) => {
				state.user = action.payload;
				state.checkingAuth = false;
			})
			.addCase(signInThunk.rejected, (state, action) => {
				state.error = action.payload as string;
				state.checkingAuth = false;
			})
			.addCase(signUpThunk.pending, (state) => {
				state.checkingAuth = true;
				state.error = null;
			})
			.addCase(signUpThunk.fulfilled, (state, action) => {
				state.user = action.payload;
				state.checkingAuth = false;
			})
			.addCase(signUpThunk.rejected, (state, action) => {
				state.error = action.payload as string;
				state.checkingAuth = false;
			})
			.addCase(signOutThunk.fulfilled, (state) => {
				state.user = null;
				state.checkingAuth = false;
			});
	},
});

export default authSlice.reducer;
