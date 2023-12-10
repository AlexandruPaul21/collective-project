import axios from "axios";
import {UserProps} from "@/utils/types/userProps";

const usersUrl = `http://localhost:8082/users`;

export const getAllUsers: (username: string, password: string) => Promise<UserProps[]> = (username, password) => {
    const result = axios.get(usersUrl, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
