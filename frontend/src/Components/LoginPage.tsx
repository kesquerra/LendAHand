import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"
import { useState } from 'react';
import React from 'react'
import {LOGIN, ROUTER_PATHS} from '../Constants'
import { UserType } from "../Types/types";
import { useNavigate } from "react-router-dom";


const default_form_values: UserType = {
	username: '',
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


const LoginPage = () => {

	const navigation: any = useNavigate();

	let [user, setUser] = useState(default_form_values)

	let [hasSubmit, setHasSubmit] = useState(false);

	let[userExistsError, setUserExistsError] = useState(false)
	const userErrorMessage = "Username and Password combination not found."

	let [usernameErrorState, setUsernameErrorState] = useState(errorStateFalse)
	let [passwordErrorState, setPasswordErrorState] = useState(errorStateFalse)


	const handleCreateUserClick = () => {
		navigation(ROUTER_PATHS.createUser);
	}


	const isValidSubmit = (): Boolean => {
		let isValid = true;

		if(user.username === default_form_values.username) {
			setUsernameErrorState(errorStateTrue)
			isValid = false;
		} else {
			setUsernameErrorState(errorStateFalse)
		}

		if(user.password === default_form_values.password) {
			setPasswordErrorState(errorStateTrue)
			isValid = false;
		} else {
			setPasswordErrorState(errorStateFalse)
		}

		return isValid;
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if(isValidSubmit()){
			console.log(user)
		}
	}

	const handleInputChange = (event: any) => {
    const {
      id,
      value
    } = event.target;
    setUser({
      ...user,
      [id]: value
    });
  };

	
	const SubmitReply = () => {
		if(hasSubmit){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>{LOGIN.SubmitStatement1}{user.username}{LOGIN.SubmitStatement2}</Typography>
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
								{LOGIN.Title}
							</Typography>
						</Box>
						{ userExistsError === true &&
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='subtitle1' color='error'>
									{userErrorMessage}
								</Typography>
							</Box>
						}
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Button variant="contained" onClick={handleCreateUserClick}>Create New User</Button>
						</Box>
						<form onSubmit={handleSubmit}>
							<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>

									<TextField
									
										error={usernameErrorState.error}
										helperText={usernameErrorState.msg}
										id = 'username'
										variant = 'filled'
										label = '*Username'
										onChange={handleInputChange}
									/>

								<TextField
									
									error={passwordErrorState.error}
									helperText={passwordErrorState.msg}
									sx={{mt:2}}
									id = 'password'
									variant = 'filled'
									label = '*Password'
									onChange={handleInputChange}
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