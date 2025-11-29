import { Box, Button, Typography } from "@mui/material";
import PrivateRoute from "./private-route";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../RTK/store";
import { signOutThunk } from "../RTK/auth-thunk";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	function handleExitAccountClick() {
		dispatch(signOutThunk());
	}

	function handleExitClick() {
		navigate("/");
	}
	return (
		<PrivateRoute>
			<Box sx={{ px: 3, py: 2, height: "100vh", boxSizing: "border-box" }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "70px" }}>
					<Button onClick={handleExitClick}>Назад</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-between",
						height: "calc(100% - 110px)",
						pt: 4,
						pb: 4,
					}}
				>
					<Typography sx={{ fontSize: "25px" }}>Профиль</Typography>
					<Button
						color="error"
						onClick={handleExitAccountClick}
					>
						Выйти из аккаунта
					</Button>
				</Box>
			</Box>
		</PrivateRoute>
	);
}
