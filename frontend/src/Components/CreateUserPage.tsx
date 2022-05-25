import React from 'react'
import { useState } from 'react';
import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"

import {LOGIN} from '../Constants'
import { UserType } from "../Types/types";
import LoginPage from './LoginPage';


const default_form_values: UserType = {
	email: '',
	password: ''
}


// Typed error states for inputs
interface errorState {
	error: boolean,
	msg: string
}
const errorStateFalse: errorState = {
	error: false,
	msg: ""
}
const errorStateTrue: errorState = {
	error: true,
	msg: LOGIN.HelperText
}

const CreateUserPage = () => {

	let [infoState, setInfoState] = useState(default_form_values);
	let [hasSubmit, setHasSubmit] = useState(false);

	let [emailErrorState, setEmailErrorState] = useState(errorStateFalse)
	let [passwordErrorState, setPasswordErrorState] = useState(errorStateFalse)


	const handleSubmit = (event: any) => {
		event.preventDefault();
		const email = event.target[0].value
		const password = event.target[1].value

		if(isValidSubmit(email, password)){

			console.log(event.target[0].value);
			console.log(event.target[1].value);

			let newInfo: UserType = {
					email: event.target[0].value,
					password: event.target[1].value
				}
			
	
			setInfoState(newInfo);
			setHasSubmit(true);

		} else {
			setInfoState(default_form_values);
			setHasSubmit(false);
		}
	}


	const isValidSubmit = (email: string, password: string): Boolean => {
		let isValid = true;
		
		if(email === default_form_values.email) {
			setEmailErrorState(errorStateTrue)
			isValid = false;
		} else {
			setEmailErrorState(errorStateFalse)
		}

		if(password === default_form_values.password) {
			setPasswordErrorState(errorStateTrue)
			isValid = false;
		} else {
			setPasswordErrorState(errorStateFalse)
		}

		return isValid;
	}

	const SubmitReply = () => {
		if(hasSubmit){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>Welcome, {infoState.email}, to Lend a Hand!</Typography>
				</Box>
			)
		}

		const space = ''
		return(<Box>{space}</Box>)
	}
	
	return(
		<>
			<Box mt={30} display='flex' justifyContent='center'>
				<Container maxWidth='xs'>
					<Paper elevation={6}>
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Typography variant='h4'>
								Create New User
							</Typography>
						</Box>
						<form onSubmit={handleSubmit}>
							<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>

									<TextField
									
										error={emailErrorState.error}
										helperText={emailErrorState.msg}
										id = 'user-email'
										variant = 'filled'
										label = '*Email'
									/>

								<TextField
									
									error={passwordErrorState.error}
									helperText={passwordErrorState.msg}
									sx={{mt:2}}
									id = 'user-password'
									variant = 'filled'
									label = '*Password'
								/>

								<Box display='flex'>
									<Button fullWidth sx={{mt:2, mr: 1}} variant='contained' type='submit' value='Submit'>Create</Button>
								</Box>
								
							</Box>
						</form>
					</Paper>
				</Container>
			</Box>

			<SubmitReply/>
		</>
	);
}



export default CreateUserPage;