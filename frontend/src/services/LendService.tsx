import BackendClient from "./HttpService";



const getLendItems = () => {
	console.log("Attempting to get lend items.")
	let items = {}
	BackendClient.get("/api/item")
		.then((response) => {
			console.log("GET /api/item Response: ",response.status);
			if(response.status === 200){
				console.log("Items obtained.")
				items = response.data
			} else {
				console.log("Get lend items failed.")
			}
		})
		.catch((error) => {
			console.log("ERROR: ", error)
			console.log("Get lend items failed.")
		})
		.finally(() => {
			console.log("Atempt to check backend status complete.")
		})
		return items
}

export default getLendItems;