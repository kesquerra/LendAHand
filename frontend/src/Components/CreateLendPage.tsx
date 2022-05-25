import { Box, Container, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableRow} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../Constants";
import { ItemType } from "../Types/types";


const defaultItem: ItemType = {
	id: -1,
	name: '',
	lend_start: '',
	lend_end: '',
	img_uri: '',
	is_lent_item: true
}

const defaultFormValues = {
	name: '',
	days: ''
}

const CreateLendPage = () => {

	const navigation: any = useNavigate();

	let [formValues, setFormValues] = useState(defaultFormValues)
	let [item, setItem] = useState(defaultItem)

	let [isCreated, setIsCreated] = useState(false)
	let [title, setTitle] = useState("Create a Lend Item")
	let [startIndex, setStartIndex] = useState(0)
	let [endIndex, setEndIndex] = useState(0)

	let [nameError, setNameError] = useState(false)
	let [nameErrorMsg, setNameErrorMsg] = useState("")

	let [daysError, setDaysError] = useState(false)
	let [daysErrorMsg, setDaysErrorMsg] = useState("")


	useEffect(()=>{
		console.log("New item specs: {}",item)
	},[item])


	const onClickGoBack = () => {
		navigation(ROUTER_PATHS.lend)
	}


	const handleInputChange = (event: any) => {
    const {
      id,
      value
    } = event.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };


	const handleSubmit = () => {	
		if(isValidSubmit()){
			console.log("Form Values: {}",formValues);

			const today = new Date()
			const currentTime = today.toISOString()
			
			for(let i=0; i<currentTime.length; i++){
				if(currentTime[i]==='T'){
					setStartIndex(i)
					break
				}
			}

			today.setDate(today.getDate()+Number(formValues.days))
			const endTime = today.toISOString()
		
				for(let i=0; i<endTime.length; i++){
					if(endTime[i]==='T'){
						setEndIndex(i)
						break
					}
				}

			setItem({
				...item,
				name: formValues.name,
				lend_start: currentTime,
				lend_end: endTime
			})
			setIsCreated(true)
			setTitle("Here is your Lend Item!")
		}
	}

	const isValidSubmit = () => {
		let isValid = true;
		const isAlpha = (str: string) => {return (/^[a-zA-Z]*$/.test(str))};

		// check name
		if(formValues.name === defaultFormValues.name){
			setNameError(true)
			setNameErrorMsg("Field is required.")
			isValid = false
		} else {
			setNameError(false)
			setNameErrorMsg("")
		}

		// check days
		if(formValues.days === defaultFormValues.days){
			setDaysError(true)
			setDaysErrorMsg("Field is required.")
			isValid = false
		} else {
			if(isAlpha(formValues.days) || Number(formValues.days) < 0){
				setDaysError(true)
				setDaysErrorMsg("Must be a number greater than 0.")
				isValid = false
			} else {
				setDaysError(false)
				setDaysErrorMsg("")
			}
		}

		return isValid
	}


	return(
		<Box mt={30} display='flex' justifyContent='center'>
			<Container maxWidth='xs'>
				<Paper elevation={6}>
					<Box sx={{p:2}} display='flex' justifyContent='center'>
						<Typography variant='h4'>
							{title}
						</Typography>
					</Box>
					{ isCreated &&
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Typography variant='subtitle1'>
								Click 'Go Back'
							</Typography>
						</Box>			
					}
					<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>
						{isCreated===false &&
							<form onSubmit={(handleSubmit)}>
								<TextField
									fullWidth
									error={nameError}
									helperText={nameErrorMsg}
									onChange={handleInputChange}
									id = 'name'
									variant = 'filled'
									label = '*Item Name'
									type='text'
								/>
								<TextField
									fullWidth
									error={daysError}
									helperText={daysErrorMsg}
									onChange={handleInputChange}
									sx={{mt:2}}
									id = 'days'
									variant = 'filled'
									label = '*Days willing to lend'
								/>
								<Button fullWidth sx={{mt:2}} variant='contained' type='submit' value='Submit'>Submit</Button>
							</form>
						}
						{isCreated &&
							<Box  sx={{ p:1, border: '1px solid', borderRadius: '10px'	}} >
							<Box display='flex'>
								<Box>
									<img alt='lend-card-img' width={200} height={200} src={item.img_uri}/>
								</Box>
								<Box sx={{flexGrow: 1}} ml={2} mr={2} width={1}>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell width={1} align='left'><Typography variant='h5'>Item: </Typography></TableCell>
												<TableCell align='left'><Typography variant='h5'>{item.name}</Typography></TableCell>
											</TableRow>
											<TableRow>
												<TableCell width={1} align='left'><Typography variant='h5'>Posted: </Typography></TableCell>
												<TableCell align='left'><Typography variant='h5'>{item.lend_start.slice(0,endIndex)}</Typography></TableCell>
											</TableRow>
											<TableRow>
												<TableCell width={1} align='left'><Typography variant='h5'>End: </Typography></TableCell>
												<TableCell align='left'><Typography variant='h5'>{item.lend_end.slice(0,startIndex)}</Typography></TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Box>	
							</Box>
						</Box>
						}
						<Box display='flex' justifyContent='center'>
							<Button sx={{mt:2}} variant='contained' onClick={onClickGoBack}>Go Back</Button>
						</Box>
						
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}

export default CreateLendPage;