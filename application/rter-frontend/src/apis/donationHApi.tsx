import axios from "axios";
import {NGOProps} from "@/utils/types/ngoProps";
import { donationsUrl } from "./urlConstants";

export const getAllDonations: (username: string, password: string) => Promise<NGOProps[]> = (username, password) => {
    const result = axios.get(`${donationsUrl}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
