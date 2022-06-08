export interface UserType {
	username: string,
	password: string
}

export interface ItemType  {
	id: number,
	name: string,
	img_uri: string,
	lend_start: string,
	lend_end: string,
	is_lent_item: boolean
}


export interface logState {
	id: number, 
	loggedIn: boolean
}