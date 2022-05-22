import httpClient from "./HttpService";


async function testBackendConnection() {
	console.log("Attempting to connect to the backend.")
	httpClient.get("/")
		.then((response) => {
			console.log("GET / Response: ",response.status);
			if(response.status === 200){
				console.log("Successful connection")
			} else {
				console.log("Backend test failed.")
			}
		})
		.catch((error) => {
			console.log("ERROR: ",error)
			console.log("Backend test failed.")
		})
		.finally(() => {
			console.log("Attempt complete.")
		})
}

export default testBackendConnection