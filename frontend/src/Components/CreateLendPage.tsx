import { Box, Container, Paper, Typography, TextField, Button, useEventCallback } from "@mui/material";
import { useEffect, useState } from "react";
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

	let [formValues, setFormValues] = useState(defaultFormValues)
	let [item, setItem] = useState(defaultItem)

	let [nameError, setNameError] = useState(false)
	let [nameErrorMsg, setNameErrorMsg] = useState("")

	let [daysError, setDaysError] = useState(false)
	let [daysErrorMsg, setDaysErrorMsg] = useState("")


	useEffect(()=>{
		console.log("New item specs: {}",item)
	},[item])


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
			const currentTime = 
				today.getFullYear().toString()+"-"
				+(today.getMonth()+1).toString()+"-"
				+today.getDate().toString()+"T"
				+today.getHours().toString()+":"
				+today.getMinutes().toString()+":"
				+today.getSeconds().toString()

			today.setDate(today.getDate()+Number(formValues.days))
			const endTime = 
				today.getFullYear().toString()+"-"
				+(today.getMonth()+1).toString()+"-"
				+today.getDate().toString()+"T"
				+today.getHours().toString()+":"
				+today.getMinutes().toString()+":"
				+today.getSeconds().toString()

			setItem({
				...item,
				name: formValues.name,
				lend_start: currentTime,
				lend_end: endTime
			})
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
			if(isAlpha(formValues.days) || Number(formValues) < 0){
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
							Create a Lend Item
						</Typography>
					</Box>
					<form onSubmit={(handleSubmit)}>
						<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>

								<TextField
									error={nameError}
									helperText={nameErrorMsg}
									onChange={handleInputChange}
									id = 'name'
									variant = 'filled'
									label = '*Item Name'
									type='text'
								/>
								<TextField
									error={daysError}
									helperText={daysErrorMsg}
									onChange={handleInputChange}
									sx={{mt:2}}
									id = 'days'
									variant = 'filled'
									label = '*Days willing to lend'
								/>

							<Box display='flex'>
								<Button fullWidth sx={{mt:2}} variant='contained' type='submit' value='Submit'>Submit</Button>
								<Button fullWidth sx={{mt:2}} variant='contained'>Go Back</Button>
							</Box>
							
						</Box>
					</form>
				</Paper>
			</Container>
		</Box>
	);
}

export default CreateLendPage;