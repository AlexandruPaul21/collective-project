import {handleGetUser,handleUpdateUser} from './userApi';
import {User} from "@/utils/types";

const getCurrentUser = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    return handleGetUser(username,password)
        .then((response) => {
            console.log(response)
            return response.data;
        }) as Promise<User>;
};

const updateCurrentUser = (user) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    return handleUpdateUser(user,username,password)
        .then((response) => {
            console.log(response);
            return response.data;
        }) as Promise<User>;
};

export const UserService = {
    getCurrentUser,
    updateCurrentUser,
};