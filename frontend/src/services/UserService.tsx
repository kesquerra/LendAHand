import { UserType } from "../Types/types";
import BackendClient from "./HttpService";


export const UserService = {
	async create(user: UserType) {
		console.log(">>>>> Attempting POST(create) @ /api/user with: ", user);
		let res = await BackendClient.post("/api/user", {username: user.username, password: user.password});
		console.log("<<<<< Attempt to POST(create) @ /api/user finished.");
		return res
	},


	async login(user: UserType) {
		console.log(">>>>> Attempting Post(login) @ /api/user with: ", user);
		let res = await BackendClient.post("/api/user", {username: user.username, password: user.password});
		console.log("<<<<< Attempt to Post(login) @ /api/user finished.");
		return res
	}
}