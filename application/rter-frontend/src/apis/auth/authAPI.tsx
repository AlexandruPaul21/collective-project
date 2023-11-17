import axios from 'axios';
import {LoginRequest, User} from "@/utils/types.tsx";
import {loginUrl, signupUrl} from "@/apis/urlConstants.tsx";


const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const handleSignup = (user: User) => {
    return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
    return axios.post(`${loginUrl}`, request, config);
}