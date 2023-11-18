import axios from "axios";
import {NGOProps} from "@/utils/types/ngoProps";
const ngosUrl = `http://localhost:8080/ngos`;

export const getAllNGOs: (username: string, password: string, nrOfNGOs: number) => Promise<NGOProps[]> = (username, password, nrOfNGOs) => {
    const result = axios.get(`${ngosUrl}?nrOfNGOs=${nrOfNGOs}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
