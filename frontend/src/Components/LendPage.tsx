import { Typography, Box, Paper, Button, Table, TableBody, TableRow, TableCell} from "@mui/material";
import { useEffect, useState } from "react";
import { LEND } from "../Constants";
import {getLendItems} from "../Services/LendService";
import { ItemType } from "../Types/types";



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

const LendPage = () => {
	let [lendItems, setLendItems] = useState([]);

	useEffect(() => {
		getLendItems()
			.then(res => {
				setLendItems(res.data)
			})
	},[])

	console.log("Lend Items: {}",lendItems)


	//sort items by start(post) time and then by name
	// lendItems.sort(
	// 	(a: any,b: any)=>
	// 	(a.start_time < b.start_time) 
	// 		? 1 
	// 		: ((a.start_time === b.start_time) ? ( (a.name < b.name) ? 1 : -1 ) : -1)
	// )

	return(
		<>
			<Box mt={15} display='flex' justifyContent='center'>
				<Typography variant='h3'>
					{LEND.welcome}
				</Typography>
			</Box>

			<Box display='flex' justifyContent='center'>
				<Typography variant='h5'>
					{LEND.subtitle}
				</Typography>
			</Box>

			<Box mt={5} display='flex' justifyContent='center'>
				<Paper elevation={10}>
					<Box sx={{p:2}} display='flex' justifyContent='center'>
						<Typography sx={{textDecoration: 'underline'}} variant='h4' color='primary'>
							Items ready to be lent!
						</Typography>
						<Button size='medium' sx={{ml: 5}} variant='contained' color='success'>
							<Typography variant='h6' sx={{textTransform: 'none'}}>Lend an Item</Typography>
						</Button>
					</Box>
					<Box sx={{p:2}}>
						{lendItems.map( (card: any, index: number) => (<ItemCard key={index} {...card} />) )}
					</Box>
				</Paper>
			</Box>
		</>
	);
}



export default LendPage;