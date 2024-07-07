import { api } from "./apiConfig"

export class userServiceAPI{
    static signup = async (data:FormData) =>{
        const response = await api.post("users/user/register/",data,{
            headers:{
                "Content-type": "multipart/form-data",
            }
        });
        return response.data;
    }
    static login = async(data:FormData)=>{
        const response = await api.post("users/token/", data,{
            headers:{
                "Content-type": "multipart/form-data",
            }
        });
        return response.data

    }
    static get_user_info = async(auth_token:string|null)=>{
        const response = await api.get('users/user/',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${auth_token}`
            }

        });
        return response.data;
    }
    static update_user = async (data:FormData, user_id:string|null,auth_token:string|null,)=>{
        const response = await api.patch(`users/user/${user_id}`,data,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${auth_token}`
            }
        });
        return response.data;
    }
    static delete_user = async (auth_token:string|null,user_id:string)=>{
        const response = await api.delete(`users/user/${user_id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${auth_token}`
            }
        });
        return response.data;
    }
}