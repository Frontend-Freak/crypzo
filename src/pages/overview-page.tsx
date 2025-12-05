import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCoinOverview } from "../RTK/crypto-thunk";
import AboutCoin from "../components /overview-about-coin";
import Loading from "../components /loading";
import Error from "../components /error";

export default function Overview() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.crypto);
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			dispatch(fetchCoinOverview(id));
		}
	}, [dispatch, id]);

	function handleExitClick() {
		navigate("/");
	}

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;

	return (
		<Box sx={{ marginTop: "60px", padding: "0 24px" }}>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={handleExitClick}>Назад</Button>
			</Box>
			<AboutCoin />
		</Box>
	);
}
