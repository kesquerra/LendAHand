import { UserType } from "../Types/types";
import BackendClient from "./HttpService";


export const UserService = {
	async create(user: UserType) {
		console.log(">>>>> Attempting to client post to create new user: ", user);
		return BackendClient.post("/api/user", {email: user.email, password: user.password});
	}
}