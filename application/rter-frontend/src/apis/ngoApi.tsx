import axios from "axios";
import {NGOProps} from "@/utils/types/ngoProps";
import { ngosUrl } from "./urlConstants";
import { FavoriteNgoProps } from "@/utils/types/favoriteNgoProps";

export const getAllNGOs: () => Promise<NGOProps[]> = () => {
    const result = axios.get(`${ngosUrl}`);
    return result.then(x => x.data)
}

export const addNgoToFavorites: (username: string, password: string, favoriteNgo: FavoriteNgoProps) => Promise<Response> = (username, password, favoriteNgo) => {
    return axios.post(`${ngosUrl}/favorites`, favoriteNgo, {
        auth: {
            username: username,
            password: password
        }})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message); 
        });
};

export const removeNgoFromFavorites: (favoriteNgo: FavoriteNgoProps) => Promise<Response> = (favoriteNgo) => {
    return axios.delete(`${ngosUrl}/favorites`, { data: favoriteNgo },)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message); 
        });
};

export const getAllFavoriteNGOs: (userId: number) => Promise<FavoriteNgoProps[]> = (userId) => {
    return axios.get(`${ngosUrl}/favorites/${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message); 
        });
};