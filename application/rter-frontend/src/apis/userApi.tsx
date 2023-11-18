import axios from "axios";

const usersUrl = `http://localhost:8080/users`;

export const getAllUsers: (username: string, password: string) => Promise<UserProps[]> = (username, password) => {
    const result = axios.get(usersUrl, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
