import { Box } from "@mui/material";
import { LANDING } from "../Constants";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const LandingPage = () => {
	useEffect (()=> {
		console.log("LandingPage has rerendered.")
	});

	return (
		<Box  display='flex' justifyContent='center'>
			<Typography variant='h4'>
				{LANDING.WELCOME}
			</Typography>
		</Box>
	);
}

export default LandingPage;