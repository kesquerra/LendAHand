import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"
import { useState } from 'react';
import React from 'react'
import {LOGIN, ROUTER_PATHS} from '../Constants'
import { UserType } from "../Types/types";
import { useNavigate } from "react-router-dom";


const default_form_values: UserType = {
	email: '',
	password: ''
}


const LoginPage = () => {

	const navigation: any = useNavigate();

	let [infoState, setInfoState] = useState(default_form_values);
	let [hasSubmit, setHasSubmit] = useState(false);

	let[userExistsError, setUserExistsError] = useState(false)
	const userErrorMessage = "Email and Password combination not found."

	let [emailError, setEmailError] = useState(false);
	let [passwordError, setPasswordError] = useState(false);

	let [emailHelperText, setEmailHelperText] = useState("")
	let [passwordHelperText, setPasswordHelperText] = useState("")


	const handleCreateUserClick = () => {
		navigation(ROUTER_PATHS.createUser);
	}


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

			if(doesUserExist(email, password)){
				console.log(event.target[0].value);
				console.log(event.target[1].value);

				let newInfo: UserType = {
						email: event.target[0].value,
						password: event.target[1].value
					}
				
				setUserExistsError(false);
				setInfoState(newInfo);
				setHasSubmit(true);

			} else {
				setUserExistsError(true);
				setInfoState(default_form_values);
				setHasSubmit(false);
			}

		} else {
			setUserExistsError(false);
			setInfoState(default_form_values);
			setHasSubmit(false);
		}
	}

	const doesUserExist = (email: string, password: string) => {

		for(let i=0; i<mockDataBaseUsers.length; i++) {
			if (mockDataBaseUsers[i].email === email && mockDataBaseUsers[i].password === password){
				return true
			}
		}

		return false
	}

	
	const SubmitReply = () => {
		if(hasSubmit){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>{LOGIN.SubmitStatement1}{infoState.email}{LOGIN.SubmitStatement2}</Typography>
				</Box>
			)
		}

		const space = ''
		return(<Box>{space}</Box>)
	}

	const mockUser1: UserType = {
		email: 'test_email_1',
		password: 'password'
	}

	const mockUser2: UserType = {
		email: 'an_email',
		password: '1337'
	}

	const mockDataBaseUsers = [mockUser1, mockUser2]
	
	return(
		<>
			<Box mt={30} display='flex' justifyContent='center'>
				<Container maxWidth='xs'>
					<Paper elevation={6}>
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Typography variant='h4'>
								{LOGIN.Title}
							</Typography>
						</Box>
						{ userExistsError === true &&
							<>
								<Box sx={{p:2}} display='flex' justifyContent='center'>
									<Typography variant='subtitle1' color='error'>
										{userErrorMessage}
									</Typography>
								</Box>
								<Box sx={{p:2}} display='flex' justifyContent='center'>
									<Button variant="contained" onClick={handleCreateUserClick}>Create New User</Button>
								</Box>
							</>
						}
						
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
									<Button fullWidth sx={{mt:2, mr: 1}} variant='contained' type='submit' value='Submit'>Login</Button>
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



export default LoginPage;