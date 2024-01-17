import axios from "axios";
import {NGOProps} from "@/utils/types/ngoProps";
import { ngosUrl } from "./urlConstants";

export const getAllNGOs: () => Promise<NGOProps[]> = () => {
    const result = axios.get(`${ngosUrl}`);
    return result.then(x => x.data)
}