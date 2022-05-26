export const BASENAME =  process.env.PUBLIC_URL

export const ROUTER_PATHS = {
	landing: '/',
	lend: '/lend',
	createLendItem: '/create-lend-item',
	request: '/request',
	login: '/login',
	profile: '/profile',
	createUser: '/create-user',
	error: '*'
}

export const E404 = {
	TITLE: '404 - Not Found!',
	MESSAGE: 'Looks Like something went wrong. Better ',
	BUTTON: 'Go Home'
}

export const APPBAR = {
	TITLE:  'Lend a hand',
	LEND: 'Lend',
	REQUEST: 'Request',
	PROFILE: 'Profile',
	LOGIN: 'Login'
}


export const LANDING = {
	WELCOME: '	Welcome to Lend a hand! Click one of the above buttons to get started!',
	imgsrc: 'https://thumbs.dreamstime.com/b/siblings-relationship-kids-sharing-delicious-fruit-together-sister-brother-holding-apple-siblings-relationship-kids-sharing-145343792.jpg'
}

export const LEND = {
	welcome: 'Welcome the Lend Page!',
	subtitle: 'You can search through requested items or create a lend post!'
}

export const REQUEST = {
	welcome: 'Welcome the Request Page!',
	subtitle: 'You can search through items out for lending or create a request post!'
}

export const PROFILE = {
	welcome: 'Welcome the Profile Page!',
	subtitle: 'This is probably a Strectch Goal.'
}

export const LOGIN = {
	SubmitStatement1: 'Welcome ',
	SubmitStatement2: ' !',
	Title: 'Login',
	HelperText: '*Field is required.',
	UsernameAlreadyExists: "Username already exists."
}