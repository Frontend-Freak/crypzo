import { Box } from "@mui/material";
import MainPage from "./components /main-page";

export default function App() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<MainPage />
		</Box>
	);
}
