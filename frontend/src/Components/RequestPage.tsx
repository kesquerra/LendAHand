import { Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { REQUEST, ROUTER_PATHS } from '../Constants'
import { logState } from "../Types/types";


interface RequestPageProps {
	userState: logState
}

const RequestPage = (props: RequestPageProps) => {
	const navigation: any = useNavigate();


	const handleLoginClick = () => {
		navigation(ROUTER_PATHS.login)
	}


	return(
		<>
			<Box mt={15} display='flex' justifyContent='center'>
				<Typography variant='h3'>
					{REQUEST.welcome}
				</Typography>
			</Box>
			<Box mt={5} display='flex' justifyContent='center'>
				<Paper elevation={10}>
					{props.userState.loggedIn &&
						<>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='h5'>
									CURRENTLY UNDER CONSTRUCTION
								</Typography>
							</Box>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='subtitle1'>
									Thank for understanding!
								</Typography>
							</Box>
						</>
					}
					{props.userState.loggedIn === false &&
						<>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='h4' color='error'>
									You need to login before requesting or lending an item!
								</Typography>
							</Box>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Button variant='contained' onClick={handleLoginClick}>
									<Typography>
										Login
									</Typography>
								</Button>
							</Box>
						</>
					}
				</Paper>
			</Box>
		</>
	);
}

export default RequestPage;