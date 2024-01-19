import axios from "axios";
import { donationsUrl } from "./urlConstants";
import { Donation } from "@/utils/types";

export const getAllDonations: (username: string, password: string, userId: number) => Promise<Donation[]> = (username, password,userId) => {
    const result = axios.get(`${donationsUrl}/history/${userId}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
}
