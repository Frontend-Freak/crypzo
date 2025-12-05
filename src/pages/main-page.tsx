import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { formatNumbers, addSpaces } from "../shared/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { fetchCryptoList, fetchTotalCoins } from "../RTK/crypto-thunk";
import { useNavigate } from "react-router-dom";
import ToggleFavoriteButton from "../components /favorites-button";
import { fetchFavorites } from "../RTK/add-favorites-thunk";
import Loading from "../components /loading";
import Error from "../components /error";

export default function MainPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { list, loading, error, totalPages } = useSelector((state: RootState) => state.crypto);
	const { list: searchResult, loading: searchLoading } = useSelector((state: RootState) => state.search);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const userId = useSelector((state: RootState) => state.auth.user?.id);

	useEffect(() => {
		if (userId) {
			dispatch(fetchFavorites(userId));
		}
	}, [dispatch, userId]);

	const showList = searchResult.length ? searchResult : list;

	useEffect(() => {
		dispatch(fetchTotalCoins());
		dispatch(fetchCryptoList(page));
	}, [dispatch, page]);

	function handlePageChange(_: unknown, value: number) {
		setPage(value);
	}

	if (loading || searchLoading) return <Loading />;
	if (error) return <Error error={error} />;
	return (
		<Box sx={{ marginTop: "60px", padding: "0 24px" }}>
			{showList.length === 0 ? (
				<Typography>Монета не найдена</Typography>
			) : (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>#</TableCell>
								<TableCell>Монета</TableCell>
								<TableCell>Цена</TableCell>
								<TableCell>Рын.Кап.</TableCell>
								<TableCell>Объем (24ч)</TableCell>
								<TableCell>Все монеты</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{showList.map((coin, index) => (
								<TableRow
									key={coin.id}
									hover
									sx={{ cursor: "pointer", maxHeight: "32px", height: "100%" }}
									onClick={() => navigate(`/coin/${coin.id}`)}
								>
									<TableCell>
										<ToggleFavoriteButton coinId={coin.id} />
									</TableCell>
									<TableCell>{(page - 1) * 100 + index + 1}</TableCell>
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
					<Pagination
						sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px 0" }}
						count={totalPages}
						variant="outlined"
						page={page}
						onChange={handlePageChange}
					/>
				</TableContainer>
			)}
		</Box>
	);
}
