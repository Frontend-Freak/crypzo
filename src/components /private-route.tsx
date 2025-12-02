import { useSelector } from "react-redux";
import type { RootState } from "../RTK/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const { user, checkingAuth } = useSelector((state: RootState) => state.auth);

	if (checkingAuth) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", margin: "30vh auto" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!user) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
}
