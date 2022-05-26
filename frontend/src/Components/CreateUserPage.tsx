import React, { useEffect } from 'react'
import { useState } from 'react';
import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"

import {LOGIN, ROUTER_PATHS} from '../Constants'
import { UserType } from "../Types/types";
import { UserService } from '../services/UserService';
import { useNavigate } from 'react-router-dom';



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

	const navigation: any = useNavigate();

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


	useEffect(() => {
		if(submitted){
			const timeout = setTimeout(() => {
				navigation(ROUTER_PATHS.login)
			}, 3000)

			return () => clearTimeout(timeout)
		}
	},[submitted, navigation])


	const handleSubmit = (event: any) => {
		event.preventDefault();

		if(isValidSubmit()){
				console.log("Creating User with: ",user)
				UserService.create(user)
					.then(res => {
						setSubmitted(true);
						console.log("New User Info: ",res);
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

	
	return(
		<>
			<Box mt={30} display='flex' justifyContent='center'>
				<Container maxWidth='xs'>
					<Paper elevation={6}>
						{submitted === false && 
						<>
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
						</>
						}
						{ submitted === true &&
						<>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='h3'>
									Success!
								</Typography>
							</Box>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='h4'>
									Welcome {user.username}!
								</Typography>
							</Box>
							<Box sx={{p:2}} display='flex' justifyContent='center'>
								<Typography variant='h5'>
									Redirecting to Login...
								</Typography>
							</Box>
						</>
						}
					</Paper>
				</Container>
			</Box>
		</>
	);
}



export default CreateUserPage;