import { Box, Typography } from "@mui/material";

export default function Error({ error }: { error: string }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "70vh",
			}}
		>
			<Typography color="error">{error} :(</Typography>
		</Box>
	);
}
