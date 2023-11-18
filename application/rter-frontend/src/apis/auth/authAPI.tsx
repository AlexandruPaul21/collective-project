import axios from 'axios';
import {LoginRequest, User} from "@/utils/types.tsx";
import {loginUrl, signupUrl} from "@/apis/urlConstants.tsx";


const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};

const secureConfig = (username: string, password: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    auth:{
      username: username,
      password: password,
    }
  }
}

export const handleSignup = (user: User) => {
  return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
  return axios.get(`${loginUrl}`, secureConfig(request.username, request.password));
}