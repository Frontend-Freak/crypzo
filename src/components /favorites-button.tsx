import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../RTK/store";
import { addFavorites, removeFavorites } from "../RTK/add-favorites-thunk";
import { toggleLocalFavorite } from "../RTK/add-favorites-slice";
import { IconButton } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

interface ToggleFavoriteButtonProps {
	coinId: string;
}

export default function ToggleFavoriteButton({ coinId }: ToggleFavoriteButtonProps) {
	const dispatch = useDispatch<AppDispatch>();
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const favorites = useSelector((state: RootState) => state.favorites.coins);

	const isFavorite = favorites.includes(coinId);

	const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (!userId) return;

		dispatch(toggleLocalFavorite(coinId));

		if (isFavorite) {
			dispatch(removeFavorites({ userId, coinId }));
		} else {
			dispatch(addFavorites({ userId, coinId }));
		}
	};

	return (
		<IconButton
			onClick={toggleFavorite}
			sx={{ padding: "0px", maxHeight: "32px", height: "100%" }}
		>
			{isFavorite ? <Star color="primary" /> : <StarBorder />}
		</IconButton>
	);
}
