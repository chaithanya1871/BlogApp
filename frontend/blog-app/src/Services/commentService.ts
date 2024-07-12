import { CommentDataProps } from "../utils/types";
import { api } from "./apiConfig";

export class commentServiceAPI{
    static postComment = async(data:CommentDataProps, token:string|null) =>{
        const response = await api.post('blogs/comment/',data,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }})
        return response.data
    }

    static getComments = async(token:string|null, blogID:string)=>{
        const response = await api.get('blogs/comment/',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            params:{
                blog_id:blogID,
            }

        })
        return response.data
    }
    static deleteComment = async(commentID:number,token:string|null)=>{
        const response = await api.delete(`blogs/comment/${commentID}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }

        })
        return response.data
    }
}