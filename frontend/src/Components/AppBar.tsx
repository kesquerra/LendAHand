import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {Box, AppBar as Bar, Toolbar, Typography, Button, ButtonGroup} from '@mui/material'
import { APPBAR, ROUTER_PATHS } from '../Constants';
import { logState } from "../Types/types";



interface AppBarProps {
	userState: logState
}

const AppBar = (props: AppBarProps) => {

	const navigation: any = useNavigate();


	useEffect (()=> {
		console.log("App bar has rerendered.")
	});

	const onClickLanding = () => {
		navigation(ROUTER_PATHS.landing);
	}

	const onClickLend = () => {
		navigation(ROUTER_PATHS.lend);
	}

	const onClickRequest = () => {
		navigation(ROUTER_PATHS.request);
	}

	const onClickProfile = () => {
		navigation(ROUTER_PATHS.profile);
	}

	const onClickLogin = () => {
		navigation(ROUTER_PATHS.login);
	}

	const middleButtonSX = {
		mr: 1,
		ml: 0, 
		textTransform: 'none',
		borderRadius: 28
	}

	const rightButtonsSX = {
		mr: 1,
		textTransform: 'none',
		borderRadius: 28
	}


	return (
		<Box mb={15}>
			<Bar>
				<Toolbar>

					<Box display='flex' width={1} justifyContent='left'>
						<Button onClick = {onClickLanding}>
							<Typography variant='h4' color='white' sx={{textTransform: 'none'}}>
								{APPBAR.TITLE}
							</Typography>
						</Button>
					</Box>

					<Box width={1} display='flex' justifyContent='center'>
						<ButtonGroup size='medium'  color='success' >
							<Button sx={middleButtonSX} variant='contained' onClick = {onClickLend}>
								<Typography variant="h5">
									{APPBAR.LEND}
								</Typography>
							</Button>
							<Button sx={middleButtonSX} variant='contained' onClick = {onClickRequest}>
								<Typography variant="h5">
									{APPBAR.REQUEST}
								</Typography>
							</Button>
						</ButtonGroup>
					</Box>

					<Box width={1} display='flex' justifyContent='right'>
						{ props.userState.loggedIn && 
							<Button sx={rightButtonsSX} size='medium' variant='contained' color='info' onClick = {onClickProfile}>
								<Typography variant="subtitle1" color='white'>
									{APPBAR.PROFILE}
								</Typography>
							</Button>
						}
						<Button sx={rightButtonsSX} size='medium' variant='contained' color='info' onClick = {onClickLogin}>
							<Typography variant="subtitle1" color='white'>
								{APPBAR.LOGIN}
							</Typography>
						</Button>
					</Box>

				</Toolbar>
			</Bar>	
		</Box>
	);
}


export default AppBar;