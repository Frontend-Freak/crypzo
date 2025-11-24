import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./RTK/store";
import { checkAuthThunk } from "./RTK/auth-thunk";
import MainPage from "./components /main-page";

export default function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { checkingAuth } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(checkAuthThunk());
	}, [dispatch]);

	if (checkingAuth) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", marginTop: "30vh" }}>
				<CircularProgress />
			</Box>
		);
	}

	return <MainPage />;
}
