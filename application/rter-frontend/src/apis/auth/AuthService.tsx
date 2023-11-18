import {handleLogin, handleSignup} from "@/apis/auth/authAPI.tsx";
import {LoginRequest, User} from "@/utils/types.tsx";
import {loginFail, loginSuccess, signupFail, signupSuccess} from "@/apis/auth/responseConstants.tsx";

const signup =  (data:User) => {
  return handleSignup(data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((data) => {
      console.log(data);
      history.pushState({}, '', '/sign-in');
      location.reload();
      return {status:data.status,message:signupSuccess};
    })
    .catch((err) => {
      console.log(err);
      return {status:err.response.status,message:signupFail};
    });
}

const login = (data:LoginRequest) =>{
  return handleLogin(data)
    .then((res) => {
      console.log(res)
      return res;
    })
    .then((res) => {
      localStorage.setItem('username', data.username);
      localStorage.setItem('password',data.password);
      history.pushState({}, '', '/');
      location.reload();
      return {status:res.status,message:loginSuccess};
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      return {status:err.response.status,message:loginFail};
    });
}

export const AuthService = {

  signup,
  login,
};