import {jwtDecode} from "jwt-decode";

export const setUserInfoInLocalStorage = (token:string):void =>{
    let decodedAuthToken: any = jwtDecode(token);

    localStorage.setItem('token',token),
    localStorage.setItem('user_id',decodedAuthToken.user_id)
}