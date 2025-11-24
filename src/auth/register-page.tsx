import { Box, Button, IconButton, InputAdornment, TextField, Typography, Snackbar, Alert, type SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpThunk } from "../RTK/auth-thunk";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../RTK/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}
	function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setConfirmPassword(e.target.value);
	}

	function handleExitClick() {
		navigate("/login");
	}

	const handleCloseSnackbar = (_: Event | React.SyntheticEvent<unknown>, reason?: SnackbarCloseReason) => {
		if (reason === "clickaway") return;
		setOpenSnackbar(false);
	};

	async function handleRegister() {
		try {
			await dispatch(signUpThunk({ email, password }));
			setSnackbarMessage("На почту отправлено письмо для подтверждения регистрации");
			setSnackbarSeverity("success");
			setOpenSnackbar(true);
		} catch (error) {
			let message = "Неизвестная ошибка";
			if (error instanceof Error) message = error.message;

			setSnackbarMessage(message);
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
		}
	}

	return (
		<Box sx={{ minHeight: "100vh", overflow: "hidden" }}>
			<Box sx={{ display: "flex", justifyContent: "flex-end", margin: "70px 24px" }}>
				<Button onClick={handleExitClick}>Назад</Button>
			</Box>
			<Box
				sx={{
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "300px",
					alignItems: "center",
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Typography>Регистрация</Typography>
				<TextField
					sx={{ width: "100%" }}
					label="Почта"
					value={email}
					onChange={handleEmailChange}
					required
				/>
				<TextField
					sx={{ width: "100%" }}
					label="Пароль"
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={handlePasswordChange}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					sx={{ width: "100%" }}
					label="Подтвердите пароль"
					type={showPassword ? "text" : "password"}
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button onClick={handleRegister}>Зарегистрироваться</Button>
			</Box>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}
