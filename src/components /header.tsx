import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import SearchInput from "./search-input";

export default function Header() {
	return (
		<Box>
			<AppBar>
				<Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Link to={"/"}>
						<Typography>CRYPZO</Typography>
					</Link>
					<Box sx={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
						<SearchInput />
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
