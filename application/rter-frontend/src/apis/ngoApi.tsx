import axios from "axios";
import {NGOProps} from "@/utils/types/ngoProps";
const ngosUrl = `http://localhost:8082/ngos`;

export const getAllNGOs: (username: string, password: string) => Promise<NGOProps[]> = (username, password) => {
    const result = axios.get(`${ngosUrl}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
