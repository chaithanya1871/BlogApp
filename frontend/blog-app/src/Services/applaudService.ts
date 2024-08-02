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
    static whetherUserApplauded =async (token:string|null, user_id:string|null, blogId:string) => {
        const response = await api.get('blogs/applaud/',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            params:{
                user:user_id,
                blog_id:blogId
            }
        })
        return response.data;

        
    }

}