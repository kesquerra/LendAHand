import BackendClient from "./HttpService";


export async function getLendItems(){
	let response = await BackendClient.get("/api/item")
	return response
}


