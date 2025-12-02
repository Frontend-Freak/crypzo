import { Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../RTK/store";
import { addSpaces, formatNumbers } from "../shared/utils";
import ToggleFavoriteButton from "./favorites-button";

export default function AboutCoin() {
	const { overview } = useSelector((state: RootState) => state.crypto);
	if (!overview) return;
	return (
		<Box sx={{ maxWidth: "250px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
				<img
					src={typeof overview.image === "string" ? overview.image : overview.image.large}
					width={50}
					height={50}
					alt={overview.name}
				/>
				<Typography>{`${overview.name} (${overview.symbol.toUpperCase()})  #${overview.market_data.market_cap_rank}`}</Typography>
				<ToggleFavoriteButton coinId={overview.id} />
			</Box>
			<Typography sx={{ fontSize: "30px" }}>{addSpaces(overview.market_data.current_price.usd)} $</Typography>
			<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography>Рын. капитализация</Typography>
				<Typography>{addSpaces(overview.market_data.market_cap.usd)} $</Typography>
			</Paper>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
				<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
					<Typography>Объем</Typography>
					<Typography>{formatNumbers(overview.market_data.total_volume.usd)}</Typography>
				</Paper>
				<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
					<Typography>Оборот</Typography>
					<Typography>{formatNumbers(overview.market_data.total_supply)}</Typography>
				</Paper>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Typography>Сайт</Typography>
				<Button
					sx={{ textTransform: "none" }}
					href={overview.links.homepage[0] || "#"}
				>
					Website
				</Button>
			</Box>
			<Typography>Ценовые показатели (24ч)</Typography>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography>Минимум</Typography>
					<Typography>$ {addSpaces(overview.market_data.high_24h.usd)}</Typography>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography>Максимум</Typography>
					<Typography>$ {addSpaces(overview.market_data.low_24h.usd)}</Typography>
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<Typography sx={{ fontSize: "12px" }}>Исторический максимум {overview.market_data.ath_date.rub.slice(0, 10)}</Typography>
				<Typography sx={{ textAlign: "right" }}>
					$ {overview.market_data.ath.usd} {overview.market_data.ath_change_percentage.usd.toFixed(2)} %
				</Typography>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<Typography sx={{ fontSize: "12px" }}>Исторический минимум {overview.market_data.atl_date.rub.slice(0, 10)}</Typography>
				<Typography sx={{ textAlign: "right" }}>
					$ {overview.market_data.atl.usd} +{overview.market_data.atl_change_percentage.usd.toFixed(2)} %
				</Typography>
			</Box>
		</Box>
	);
}
