import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { signInThunk } from "../RTK/auth-thunk";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setEmail, setPassword, toggleShowPassword } from "../RTK/login-slice";

export default function LoginPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { error } = useSelector((state: RootState) => state.auth);
	const { email, password, showPassword } = useSelector((state: RootState) => state.authForm);
	const navigate = useNavigate();

	async function handleSignInClick() {
		const result = await dispatch(signInThunk({ email, password }));
		if (signInThunk.fulfilled.match(result)) {
			navigate("/profile");
		}
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setEmail(e.target.value));
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setPassword(e.target.value));
	}

	function handleShowPassword() {
		dispatch(toggleShowPassword());
	}
	function handleExitClick() {
		navigate("/");
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
				<Typography>Вход</Typography>
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
								<IconButton onClick={handleShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button onClick={handleSignInClick}>Войти</Button>
				<Link to="/register">
					<Button>Зарегистрироваться</Button>
				</Link>
				{error && <Typography color="error">{error}</Typography>}
			</Box>
		</Box>
	);
}
