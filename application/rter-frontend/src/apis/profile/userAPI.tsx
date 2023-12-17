import {User} from "@/utils/types.tsx";
import {usersUrl} from "@/apis/urlConstants";
import {secureConfig} from "@/apis/config/apiConfigs";
import axios from "axios";

export const handleUpdateUser = (user: User, username: string, password: string) => {
    return axios.put(`${usersUrl}/${username}`, user, secureConfig(username, password));
}

export const handleGetUser = (username: string, password: string) => {
    return axios.get(`${usersUrl}/${username}`, secureConfig(username, password));
}