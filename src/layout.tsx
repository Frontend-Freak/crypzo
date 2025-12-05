import { Box, useTheme } from "@mui/material";
import Header from "./components /header";
import { Outlet } from "react-router-dom";

export default function Layout() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
			}}
		>
			<Header />
			<Outlet />
		</Box>
	);
}
