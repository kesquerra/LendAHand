import { ItemType } from "../Types/types";
import BackendClient from "./HttpService";
import axios from "axios";


const lendService = {
	async getItems(){
		let response = await BackendClient.get("/api/item")
		return response
	},

	async createItem(item: ItemType) {
		let response = await BackendClient.post(
			"/api/item", 
			{
				name: item.name, 
				owner_id: item.id, 
				lend_start: item.lend_start, 
				lend_end: item.lend_end, 
				img_uri: item.img_uri
			}
		)
		return response
	},

	async isValidImageUri(imguri: string){
		let isValid = true
		await axios.get(imguri)	
			.catch(e => {
				console.log("Error: ",e)
				isValid = false
			})

		return isValid
	}
}

export default lendService;