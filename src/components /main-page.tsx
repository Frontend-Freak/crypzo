import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { formatNumbers, addSpaces } from "../shared/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import {fetchCryptoList, fetchTotalCoins } from "../RTK/cryptoSlice";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { list, loading, error, totalPages } = useSelector((state: RootState) => state.crypto);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchTotalCoins());
		dispatch(fetchCryptoList(page));
	}, [dispatch, page]);

	function handlePageChange(_: unknown, value: number) {
		setPage(value);
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}
	if (error) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<Typography color="error">{error} :(</Typography>;
			</Box>
		);
	}
	return (
		<TableContainer sx={{ marginTop: "70px", padding: "0 24px" }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Монета</TableCell>
						<TableCell>Цена</TableCell>
						<TableCell>Рын.Кап.</TableCell>
						<TableCell>Объем (24ч)</TableCell>
						<TableCell>Все монеты</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{list.map((coin, index) => (
						<TableRow
							key={coin.id}
							hover
							sx={{ cursor: "pointer" }}
							onClick={() => navigate(`/coin/${coin.id}`)}
						>
							<TableCell>{(page - 1) * 100 + index + 1}</TableCell>
							<TableCell sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
								<img
									src={coin.image}
									width={30}
									height={30}
									alt={coin.name}
								/>
								<Typography>{coin.name}</Typography>
							</TableCell>
							<TableCell>${addSpaces(coin.current_price)}</TableCell>
							<TableCell>${addSpaces(coin.market_cap)}</TableCell>
							<TableCell>${addSpaces(coin.total_volume)}</TableCell>
							<TableCell sx={{ textTransform: "uppercase" }}>
								{formatNumbers(coin.total_supply)} {coin.symbol}
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
	);
}
