import { Typography, Box, Paper } from "@mui/material";
import { PROFILE } from '../Constants'

const ProfilePage = () => {
	return(
		<>
			<Box mt={15} display='flex' justifyContent='center'>
				<Typography variant='h3'>
					{PROFILE.welcome}
				</Typography>
			</Box>

			<Box mt={5} display='flex' justifyContent='center'>
				<Paper elevation={10}>
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
				</Paper>
			</Box>
		</>
	);
}



export default ProfilePage;