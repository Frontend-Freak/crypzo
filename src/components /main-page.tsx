import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, CircularProgress, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { formatNumbers, addSpaces } from "../shared/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { fetchCryptoList, fetchTotalCoins, searchCoins } from "../RTK/crypto-thunk";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { list, loading, error, totalPages } = useSelector((state: RootState) => state.crypto);
	const { list: searchResult, loading: searchLoading } = useSelector((state: RootState) => state.search);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	const showList = search.trim() ? searchResult : list;

	useEffect(() => {
		dispatch(fetchTotalCoins());
		dispatch(fetchCryptoList(page));
	}, [dispatch, page]);

	function handlePageChange(_: unknown, value: number) {
		setPage(value);
	}

	function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			dispatch(searchCoins(search));
		}
	}

	if (loading || searchLoading) {
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
		<Box sx={{ marginTop: "70px", padding: "0 24px" }}>
			<TextField
				sx={{ width: "20vw", "& .MuiOutlinedInput-root": { height: 40 } }}
				placeholder="Поиск"
				value={search}
				onChange={handleSearchChange}
				onKeyDown={handleKeyDown}
			/>
			{search.trim() && showList.length === 0 ? (
				<Typography>Монета не найдена</Typography>
			) : (
				<TableContainer>
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
							{showList.map((coin, index) => (
								<TableRow
									key={coin.id}
									hover
									sx={{ cursor: "pointer" }}
									onClick={() => navigate(`/coin/${coin.id}`)}
								>
									<TableCell>{(page - 1) * 100 + index + 1}</TableCell>
									<TableCell sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
										<img
											src={typeof coin.image === "string" ? coin.image : coin.image.large}
											width={30}
											height={30}
											alt={coin.name}
										/>
										<Typography>{coin.name}</Typography>
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
