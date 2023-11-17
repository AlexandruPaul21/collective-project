import {handleLogin, handleSignup} from "@/apis/auth/authAPI.tsx";
import {LoginRequest, User} from "@/utils/types.tsx";

const signup =  (data:User) => {
    handleSignup(data)
        .then((res) => {
            return res.data.data;
        })
        .then((data) => {
            console.log(data);
            history.pushState(data, '', '/sign-in');
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
}

const login = (data:LoginRequest) =>{
    handleLogin(data)
        .then((res) => {
            console.log(res.data);
            return JSON.parse(res.data.data);
        })
        .then((data) => {
            history.pushState(data, '', '/');
            location.reload();
            localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => {
            console.log(err);
        });
}

export const AuthService = {

    signup,
    login,
};