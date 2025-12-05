import { useDispatch } from "react-redux";
import type { AppDispatch } from "../RTK/store";
import { useState } from "react";
import { searchCoins } from "../RTK/crypto-thunk";
import { TextField } from "@mui/material";

export default function SearchInput() {
	const dispatch = useDispatch<AppDispatch>();
	const [value, setValue] = useState("");

	console.log(value);

	function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
		dispatch(searchCoins(e.target.value));
	}
	return (
		<TextField
			sx={{ width: "250px", "& .MuiOutlinedInput-root": { height: 40 } }}
			placeholder="Поиск монеты"
			value={value}
			onChange={handleChangeValue}
		/>
	);
}
