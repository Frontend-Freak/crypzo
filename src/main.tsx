import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page";
import { FavoritesWrapper } from "./pages/favorites";
import { Provider } from "react-redux";
import { store } from "./RTK/store";
import Layout from "./layout";
import Overview from "./pages/overview-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import Profile from "./pages/profile";

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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
