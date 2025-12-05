import { Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../RTK/store";
import { addSpaces, formatNumbers } from "../shared/utils";
import ToggleFavoriteButton from "./favorites-button";

export default function AboutCoin() {
	const { overview } = useSelector((state: RootState) => state.crypto);
	if (!overview) return;
	const athDate = overview.market_data.ath_date.rub.slice(0, 10);
	const athPrice = `$ ${overview.market_data.ath.usd}`;
	const athPercent = `${overview.market_data.ath_change_percentage.usd.toFixed(2)} %`;
	const athDesc = `${athPrice} ${athPercent}`;
	const atlDate = overview.market_data.atl_date.rub.slice(0, 10);
	const atlPrice = `$ ${overview.market_data.atl.usd}`;
	const atlPercent = `+${overview.market_data.atl_change_percentage.usd.toFixed(2)} %`;
	const atlDesc = `${atlPrice} ${atlPercent}`;
	const high_24h = addSpaces(overview.market_data.high_24h.usd);
	const low_24h = addSpaces(overview.market_data.low_24h.usd);
	const total_supply = formatNumbers(overview.market_data.total_supply);
	const total_volume = formatNumbers(overview.market_data.total_volume.usd);
	const market_cap = `${addSpaces(overview.market_data.market_cap.usd)} $`;
	const overviewHead = `${overview.name} (${overview.symbol.toUpperCase()})  #${overview.market_data.market_cap_rank}`;
	const currentPrice = `${addSpaces(overview.market_data.current_price.usd)} $`;

	return (
		<Box sx={{ maxWidth: "250px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
				<img
					src={typeof overview.image === "string" ? overview.image : overview.image.large}
					width={50}
					height={50}
					alt={overview.name}
				/>
				<Typography>{overviewHead}</Typography>
				<ToggleFavoriteButton coinId={overview.id} />
			</Box>
			<Typography sx={{ fontSize: "30px" }}>{currentPrice}</Typography>
			<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<ComponentOverview
					title="Рын. капитализация"
					desc={market_cap}
				/>
			</Paper>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
				<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
					<ComponentOverview
						title="Объем"
						desc={total_volume}
					/>
				</Paper>
				<Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
					<ComponentOverview
						title="Оборот"
						desc={total_supply}
					/>
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
					<ComponentOverview
						title="Минимум"
						desc={high_24h}
					/>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<ComponentOverview
						title="Максимум"
						desc={low_24h}
					/>
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<ComponentOverview
					title={`Исторический максимум ${athDate}`}
					desc={athDesc}
				/>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<ComponentOverview
					title={`Исторический максимум ${atlDate}`}
					desc={atlDesc}
				/>
			</Box>
		</Box>
	);
}

export function ComponentOverview({ title, desc }: { title: string; desc: string }) {
	return (
		<>
			<Typography sx={{ fontSize: "12px" }}>{title}</Typography>
			<Typography sx={{ textAlign: "right" }}>{desc}</Typography>
		</>
	);
}
