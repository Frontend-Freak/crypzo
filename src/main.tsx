import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/error-page.tsx";
import { FavoritesWrapper } from "./pages/favorites.tsx";
import { Provider } from "react-redux";
import { store } from "./RTK/store.ts";
import Layout from "./layout.tsx";
import Overview from "./pages/overview-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import Profile from "./pages/profile.tsx";

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
