import {Box, Typography, Button} from '@mui/material'
import { E404 } from '../Constants';


const NotFound = () => (
	<Box>
	  <Typography variant='h1'>{E404.TITLE}</Typography>
	  <Box display='flex' mt={10}>
			<Typography>{E404.MESSAGE}</Typography>
			<Box mt={-1} ml={1}>
				<Button sx={{textTransform: 'none'}} variant='contained' href='/'>
					<Typography variant="body1">{E404.BUTTON}</Typography>
				</Button>
			</Box>
	  </Box>
	</Box>
);

export default NotFound;