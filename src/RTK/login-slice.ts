import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthFormState } from "../shared/types";

const initialState: AuthFormState = {
	email: "",
	password: "",
	confirmPassword: "",
	showPassword: false,
};

const authFormSlice = createSlice({
	name: "authForm",
	initialState,
	reducers: {
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		setPassword(state, action: PayloadAction<string>) {
			state.password = action.payload;
		},
		setConfirmPassword(state, action: PayloadAction<string>) {
			state.confirmPassword = action.payload;
		},
		toggleShowPassword(state) {
			state.showPassword = !state.showPassword;
		},
	},
});

export const { setEmail, setPassword, setConfirmPassword, toggleShowPassword } = authFormSlice.actions;
export default authFormSlice.reducer;
