import { UserType } from "../Types/types";
import BackendClient from "./HttpService";


export const UserService = {
	async create(user: UserType) {
		console.log(">>>>> Attempting POST @ /api/user with: ", user);
		let res = await BackendClient.post("/api/user", {username: user.username, password: user.password});
		console.log("<<<<< Attempt to POST @ /api/user finished.");
		return res
	}
}