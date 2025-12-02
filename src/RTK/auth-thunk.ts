import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../shared/supabase";

export const signInThunk = createAsyncThunk("auth/signIn", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) return thunkAPI.rejectWithValue(error.message);
	return data.user;
});

export const signUpThunk = createAsyncThunk("auth/signUp", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});
	if (error) return thunkAPI.rejectWithValue(error.message);
	return data.user;
});

export const signOutThunk = createAsyncThunk("auth/signOut", async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
	return null;
});

export const checkAuthThunk = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) return thunkAPI.rejectWithValue(error.message);
	if (!data.session?.user) return null;
	return data.session?.user ?? null;
});
