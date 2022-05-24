import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"
import { useState } from 'react';
import React from 'react'
import {LOGIN} from '../Constants'
import { UserType } from "../Types/types";


const default_form_values: UserType = {
	email: '',
	password: ''
}


const CreateUserPage = () => {

	let [infoState, setInfoState] = useState(default_form_values);
	let [hasSubmit, setHasSubmit] = useState(false);

	let [emailError, setEmailError] = useState(false);
	let [passwordError, setPasswordError] = useState(false);

	let [emailHelperText, setEmailHelperText] = useState("")
	let [passwordHelperText, setPasswordHelperText] = useState("")


	const isValidSubmit = (email: string, password: string): Boolean => {
		let isValid = true;

		if(email === default_form_values.email) {
			setEmailError(true);
			setEmailHelperText(LOGIN.HelperText);
			isValid = false;
		} else {
			setEmailError(false);
			setEmailHelperText('');
		}

		if(password === default_form_values.password) {
			setPasswordError(true);
			setPasswordHelperText(LOGIN.HelperText);
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordHelperText('');
		}

		return isValid;
	}

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

	
	const SubmitReply = () => {
		if(hasSubmit){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>Created new user: {infoState.email}</Typography>
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
									
										error={emailError}
										helperText={emailHelperText}
										id = 'user-email'
										variant = 'filled'
										label = '*Email'
									/>

								<TextField
									
									error={passwordError}
									helperText={passwordHelperText}
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