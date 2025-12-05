import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootState } from "./RTK/store";
import App from "./App";
import Layout from "./layout";
import ErrorPage from "./pages/error-page";
import { FavoritesWrapper } from "./pages/favorites";
import LoginPage from "./pages/login-page";
import Overview from "./pages/overview-page";
import Profile from "./pages/profile";
import RegisterPage from "./pages/register-page";
import { useMemo } from "react";

export default function ThemeRouter() {
	const mode = useSelector((state: RootState) => state.theme.mode);

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <App />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/favorites",
					element: <FavoritesWrapper />,
				},
				{
					path: "/coin/:id",
					element: <Overview />,
				},
				{
					path: "/login",
					element: <LoginPage />,
				},
				{
					path: "/register",
					element: <RegisterPage />,
				},
			],
		},
	]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
