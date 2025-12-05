import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import SearchInput from "./search-input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../RTK/store";
import { toggleTheme } from "../RTK/theme-slice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header() {
	const dispatch = useDispatch<AppDispatch>();
	function handleToggleTheme() {
		dispatch(toggleTheme());
	}

	const mode = useSelector((state: RootState) => state.theme.mode);
	return (
		<Box>
			<AppBar>
				<Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Link to={"/"}>
						<Typography>CRYPZO</Typography>
					</Link>
					<Box sx={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
						<SearchInput />
						<Button
							color="inherit"
							onClick={handleToggleTheme}
						>
							{mode === "light" ?  <LightModeIcon/> : <DarkModeIcon/>}
						</Button>
						<Link to={"/favorites"}>Избранное</Link>
						<Link to={"/profile"}>
							<IconButton>
								<AccountCircle />
							</IconButton>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
