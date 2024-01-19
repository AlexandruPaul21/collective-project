import axios from "axios";
import { NGOProps } from "@/utils/types/ngoProps";
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
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
};

export const removeNgoFromFavorites: (username: string, password: string, favoriteNgo: FavoriteNgoProps) => Promise<Response> = (username, password, favoriteNgo) => {
    return axios.delete(`${ngosUrl}/favorites`, {
        data: favoriteNgo,
        auth: {
            username: username,
            password: password
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
};

export const getAllFavoriteNGOs: (username: string, password: string, userId: number) => Promise<NGOProps[]> = (username, password, userId) => {
    const result = axios.get(`${ngosUrl}/favorites/${userId}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
};

export const getNgoById: (username: string, password: string, ngoId: number) => Promise<NGOProps> = (username, password, ngoId) => {
    const result =  axios.get(`${ngosUrl}/${ngoId}`, {
        auth: {
            username: username,
            password: password
        }
    });
    return result.then(x => x.data)
};