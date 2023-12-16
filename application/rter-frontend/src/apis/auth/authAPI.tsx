import axios from 'axios';
import {LoginRequest, User} from "@/utils/types.tsx";
import {loginUrl, signupUrl} from "@/apis/urlConstants.tsx";
import {config, secureConfig} from "@/apis/config/apiConfigs";

export const handleSignup = (user: User) => {
  return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
  return axios.get(`${loginUrl}`, secureConfig(request.username, request.password));
}