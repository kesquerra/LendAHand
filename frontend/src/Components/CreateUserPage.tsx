import React from 'react'
import { useState } from 'react';
import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"

import {LOGIN} from '../Constants'
import { UserType } from "../Types/types";
import { UserService } from '../services/UserService';



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
const errorUsernameAlreadyExists: errorState = {
	error: true,
	msg: LOGIN.UsernameAlreadyExists
}

const CreateUserPage = () => {

	let [user, setUser] = useState(default_form_values);
	const [submitted, setSubmitted] = useState(false);

	let [usernameErrorState, setUsernameErrorState] = useState(errorStateFalse)
	let [passwordErrorState, setPasswordErrorState] = useState(errorStateFalse)


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


	const handleSubmit = (event: any) => {
		event.preventDefault();

		if(isValidSubmit()){
				console.log("Creating User with: ",user)
				UserService.create(user)
					.then(res => {
						setSubmitted(true);
						console.log(res.data);
					})
					.catch(e => {
						setSubmitted(false);
						setUsernameErrorState(errorUsernameAlreadyExists)
						console.log("Error creating new user", e);
					});
					
		} 
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


	const SubmitReply = () => {
		if(submitted){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>Welcome, {user.username}, to Lend a Hand!</Typography>
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