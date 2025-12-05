import { Box, Typography } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
	const error: unknown = useRouteError();
	console.error(error);
	if (isRouteErrorResponse(error)) {
		return (
			<Box>
				<Typography>Oops!</Typography>
				<Typography>Sorry, an unexpected error has occurred.</Typography>
				<Typography>{error.statusText}</Typography>
			</Box>
		);
	}
}
