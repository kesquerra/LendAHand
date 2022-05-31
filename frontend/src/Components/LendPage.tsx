import { Typography, Box, Paper, Button, Table, TableBody, TableRow, TableCell} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LEND, ROUTER_PATHS } from "../Constants";
import lendService from "../services/LendService";
import { ItemType, logState } from "../Types/types";




const ItemCard = (props: ItemType) => {

	return(
		<>
			<Box  sx={{ p:1, border: '1px solid', borderRadius: '10px'	}} >
				<Box display='flex'>
					<Box>
						<img alt='lend-card-img' width={200} height={200} src={props.img_uri}/>
					</Box>
					<Box sx={{flexGrow: 1}} ml={2} mr={2} width={1}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell width={1} align='left'><Typography variant='h5'>Item: </Typography></TableCell>
									<TableCell align='left'><Typography variant='h5'>{props.name}</Typography></TableCell>
								</TableRow>
								<TableRow>
									<TableCell width={1} align='left'><Typography variant='h5'>Posted: </Typography></TableCell>
									<TableCell align='left'><Typography variant='h5'>{props.lend_start.slice(0,10)}</Typography></TableCell>
								</TableRow>
								<TableRow>
									<TableCell width={1} align='left'><Typography variant='h5'>End: </Typography></TableCell>
									<TableCell align='left'><Typography variant='h5'>{props.lend_end.slice(0,10)}</Typography></TableCell>
								</TableRow>
							</TableBody>
						</Table>
						
						<br/><br/>
						
					</Box>	
				</Box>
				<Button sx={{width: 1}} size='large' variant='contained'>Request!</Button>
			</Box>
			<br/>
		</>
	);
}



interface LendPageProps {
	userState: logState
}

const LendPage = (props: LendPageProps) => {
	let [lendItems, setLendItems] = useState([]);

	const navigation: any = useNavigate();

	useEffect(() => {
		lendService.getItems()
			.then(res => {
				setLendItems(res.data)
			})
	},[])

	console.log("Lend Items: {}",lendItems)


	const handleLendItemClick = () => {
		navigation(ROUTER_PATHS.createLendItem)
	}


	const handleLoginClick = () => {
		navigation(ROUTER_PATHS.login)
	}


	return(
		<>
			<Box mt={15} display='flex' justifyContent='center'>
				<Typography variant='h3'>
					{LEND.welcome}
				</Typography>
			</Box>

			
				<Box mt={5} display='flex' justifyContent='center'>
					<Paper elevation={10}>
						{props.userState.loggedIn &&
							<>
								<Box sx={{p:2}} display='flex' justifyContent='center'>
									<Typography variant='h4'>
										Items ready to be lent!
									</Typography>
									<Button size='medium' sx={{ml: 5}} variant='contained' color='success' onClick={handleLendItemClick}>
										<Typography variant='h6' sx={{textTransform: 'none'}}>Lend an Item</Typography>
									</Button>
								</Box>
								<Box sx={{p:2}}>
									{lendItems.map( (card: any, index: number) => (<ItemCard key={index} {...card} />) )}
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



export default LendPage;