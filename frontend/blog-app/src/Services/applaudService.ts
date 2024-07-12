import { ApplaudBlogProps } from "../Pages/ViewSingleBlog/type";
import { api } from "./apiConfig"

export class applaudServieAPI{
    static applaudBlog = async(token:string|null, data:ApplaudBlogProps)=>{
        const response = await api.post('blogs/applaud/',data,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        return response.data;
    }

}