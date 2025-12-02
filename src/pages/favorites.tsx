import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { useEffect, useState } from "react";
import { fetchFavoriteCoins, fetchFavorites } from "../RTK/add-favorites-thunk";
import { supabase } from "../shared/supabase";
import Loading from "../components /loading";
import Error from "../components /error";
import { addSpaces, formatNumbers } from "../shared/utils";
import { useNavigate } from "react-router-dom";

export default function Favorites({ userId }: { userId: string }) {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { coins, favoriteCoinsData, loading, error } = useSelector((state: RootState) => state.favorites);
	useEffect(() => {
		if (userId) {
			dispatch(fetchFavorites(userId));
		}
	}, [userId, dispatch]);

	useEffect(() => {
		dispatch(fetchFavoriteCoins(coins));
	}, [coins, dispatch]);

	function handleExitClick() {
		navigate("/");
	}

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;

	return (
		<Box sx={{ marginTop: "70px", padding: "0 24px" }}>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={handleExitClick}>Назад</Button>
			</Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Монета</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Рын.Кап.</TableCell>
							<TableCell>Объем (24ч)</TableCell>
							<TableCell>Все монеты</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{favoriteCoinsData.map((coin) => (
							<TableRow
								key={coin.id}
								hover
								sx={{ cursor: "pointer", maxHeight: "32px", height: "100%" }}
								onClick={() => navigate(`/coin/${coin.id}`)}
							>
								<TableCell sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
									<img
										src={typeof coin.image === "string" ? coin.image : coin.image.large}
										width={32}
										height={32}
										alt={coin.name}
									/>
									<Typography noWrap>{coin.name}</Typography>
								</TableCell>
								<TableCell>${addSpaces(coin.current_price)}</TableCell>
								<TableCell>${addSpaces(coin.market_cap)}</TableCell>
								<TableCell>${addSpaces(coin.total_volume)}</TableCell>
								<TableCell>
									{formatNumbers(coin.total_supply)} {coin.symbol.toUpperCase()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export function FavoritesWrapper() {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const { data } = await supabase.auth.getUser();
			if (data.user?.id) setUserId(data.user.id);
		}
		fetchUser();
	}, []);

	if (!userId) return <Box>Пожалуйста, войдите в систему</Box>;

	return <Favorites userId={userId} />;
}
