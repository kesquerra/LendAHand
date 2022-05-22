import httpClient from "./HttpService";


export async function testBackendStatus() {
	console.log("Attempting to check backend status.")
	httpClient.get("/api/status")
	.then((response) => {
		console.log("GET /api/Status Response: ",response.status);
		if(response.status === 200){
			console.log("Status obtained.")
			console.log("Payload: ",response.data)
		} else {
			console.log("Backend status test failed.")
		}
	})
	.catch((error) => {
		console.log("ERROR: ", error)
		console.log("Backend status test failed.")
	})
	.finally(() => {
		console.log("Atempt to check backend status complete.")
	})
}


export async function testBackendConnection() {
	console.log("Attempting to connect to the backend.")
	httpClient.get("/")
		.then((response) => {
			console.log("GET / Response: ",response.status);
			if(response.status === 200){
				console.log("Successful connection")
				console.log("Payload: ",response.data)
			} else {
				console.log("Backend test failed.")
			}
		})
		.catch((error) => {
			console.log("ERROR: ",error)
			console.log("Backend test failed.")
		})
		.finally(() => {
			console.log("Attempt to connect to the backend complete.")
		})
}