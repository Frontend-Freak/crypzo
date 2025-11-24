import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabase";
import type { AuthState } from "../shared/types";

export const checkAuthThunk = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) return thunkAPI.rejectWithValue(error.message);
	return data.session?.user ?? null;
});

export const signInThunk = createAsyncThunk("auth/signIn", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) return thunkAPI.rejectWithValue(error.message);
	return data.user;
});

export const signUpThunk = createAsyncThunk("auth/signUp", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) return thunkAPI.rejectWithValue(error.message);
	return data.user;
});

export const signOutThunk = createAsyncThunk("auth/signOut", async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
	return null;
});

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
