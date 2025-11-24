import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../RTK/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCoinOverview } from "../../RTK/crypto-thunk";
import AboutCoin from "./overview-about-coin";

export default function Overview() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.crypto);
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			dispatch(fetchCoinOverview(id));
		}
	}, [dispatch, id]);

	function handleExitClick() {
		navigate("/");
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}
	if (error) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<Typography color="error">{error} :(</Typography>;
			</Box>
		);
	}

	return (
		<Box sx={{ marginTop: "70px", padding: "0 24px" }}>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={handleExitClick}>Назад</Button>
			</Box>
			<AboutCoin />
		</Box>
	);
}
