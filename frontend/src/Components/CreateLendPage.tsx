import { Box, Container, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableRow} from "@mui/material";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../Constants";
import lendService from "../services/LendService";
import { ItemType, logState } from "../Types/types";


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
	days: '',
	imguri: ''
}

interface CreateLendPageProps {
	userState: logState
}

const CreateLendPage = (props: CreateLendPageProps) => {

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

	let [imgError, setImgError] = useState(false)
	let [imgErrorMsg, setImgErrorMsg] = useState("")


	useEffect(()=>{
		//console.log("New item specs: {}",item)
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


	const handleSubmit = async () => {	
		console.log("Attempting submit with Form Values: {}",formValues);
		if(await isValidSubmit()){

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
				id: props.userState.id,
				name: formValues.name,
				lend_start: currentTime,
				lend_end: endTime,
				img_uri: formValues.imguri
			})
			setIsCreated(true)
			setTitle("Here is your Lend Item!")

			const createItem: ItemType = {
				id: props.userState.id,
				name: formValues.name,
				lend_start: currentTime,
				lend_end: endTime,
				img_uri: formValues.imguri,
				is_lent_item: true
			}

			lendService.createItem(createItem)
				.then(res => {
					console.log("New Item Info: ",res);
				})
				.catch(e => {
					console.log("Error creating new item", e);
				});
		} else {
			console.log("Invalid Form Values.")
		}
	}

	const isValidSubmit = async () => {
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


		// check img uri if not default ("" is an ok option)
		if(formValues.imguri !== defaultFormValues.imguri){
			if(await isValidImage(formValues.imguri) === false){
				setImgError(true)
				setImgErrorMsg("Unable to load image.")
				isValid = false
			} else {
				setImgError(false)
				setImgErrorMsg("")
			}
		}

		return isValid
	}


	const isValidImage = (imguri: string) => {
		return lendService.isValidImageUri(imguri)
	}

	const createLendFormProps = {
		title: title,
		onClickGoBack: onClickGoBack,
		handleSubmit: handleSubmit,
		handleInputChange: handleInputChange,
		nameError: nameError,
		nameErrorMsg: nameErrorMsg,
		daysError: daysError,
		daysErrorMsg: daysErrorMsg,
		imgError: imgError,
		imgErrorMsg: imgErrorMsg
	}


	const showCreatedItemProps = {
		title: title,
		onClickGoBack: onClickGoBack,
		lend_start: item.lend_start,
		startIndex: startIndex,
		lend_end: item.lend_end,
		endIndex: endIndex,
		name: item.name,
		img_uri: item.img_uri
	}

	const createLendForm = <CreateLendForm {...createLendFormProps}/>
	const showCreatedItem = <ShowCreatedItem {...showCreatedItemProps}/>

	return(
		<>
			{isCreated === false&& createLendForm}
			{isCreated === true && showCreatedItem}
		</>
	);
}



interface CreateLendFormProps {
	title: string,
	onClickGoBack: () => void,
	handleSubmit: () => void,
	handleInputChange: (event: any) => void;
	nameError: boolean,
	nameErrorMsg: string,
	daysError: boolean,
	daysErrorMsg: string,
	imgError: boolean,
	imgErrorMsg: string
}

const CreateLendForm = (props: CreateLendFormProps) => {

	return(
		<Box mt={30} display='flex' justifyContent='center'>
			<Container  maxWidth='xs'>
				<Paper elevation={6}>
					<Box width='auto' sx={{flexgrow: 1, p:2}} display='flex' justifyContent='center'>
						<Typography variant='h4'>
							{props.title}
						</Typography>
					</Box>
					<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>
							<form onSubmit={(props.handleSubmit)}>
								<TextField
									fullWidth
									error={props.nameError}
									helperText={props.nameErrorMsg}
									onChange={props.handleInputChange}
									id = 'name'
									variant = 'filled'
									label = '*Item Name'
									type='text'
								/>
								<TextField
									fullWidth
									error={props.daysError}
									helperText={props.daysErrorMsg}
									onChange={props.handleInputChange}
									sx={{mt:2}}
									id = 'days'
									variant = 'filled'
									label = '*Days willing to lend'
								/>
								<TextField
									fullWidth
									error={props.imgError}
									helperText={props.imgErrorMsg}
									onChange={props.handleInputChange}
									sx={{mt:2}}
									id='imguri'
									variant='filled'
									label = 'Image Url'
								/>
								<Button fullWidth sx={{mt:2}} variant='contained' type='submit' value='Submit'>Submit</Button>
							</form>
						<Box display='flex' justifyContent='center'>
							<Button sx={{mt:2}} variant='contained' onClick={props.onClickGoBack}>Go Back</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	)
}


interface ShowCreatedItemProps {
	title: string,
	onClickGoBack: () => void
	lend_start: string,
	startIndex: number
	lend_end: string,
	endIndex: number,
	name: string,
	img_uri: string
}

const ShowCreatedItem = (props: ShowCreatedItemProps) => {
	return(
		<Box mt={30} display='flex' justifyContent='center'>
			<Container  maxWidth='sm'>
				<Paper elevation={6}>
					<Box width='auto' sx={{flexgrow: 1, p:2}} display='flex' justifyContent='center'>
						<Typography variant='h4'>
							{props.title}
						</Typography>
					</Box>
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Typography variant='subtitle1'>
								Click 'Go Back'
							</Typography>
						</Box>			
					<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>
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
												<TableCell align='left'><Typography variant='h5'>{props.lend_start.slice(0,props.startIndex)}</Typography></TableCell>
											</TableRow>
											<TableRow>
												<TableCell width={1} align='left'><Typography variant='h5'>End: </Typography></TableCell>
												<TableCell align='left'><Typography variant='h5'>{props.lend_end.slice(0,props.endIndex)}</Typography></TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Box>	
							</Box>
						</Box>
						<Box display='flex' justifyContent='center'>
							<Button sx={{mt:2}} variant='contained' onClick={props.onClickGoBack}>Go Back</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	)
}

export default CreateLendPage;