import { api } from "./apiConfig"

export class BlogServiceAPI{
    static createBlog =async (data:FormData, token:string|null)=>{
        const response = await api.post("blogs/blog/",data,{
            headers:{
                "Content-type": "multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

    })
    return response.data;
}   
    static getAllBlogs = async(token:string|null)=>{
        const response = await api.get('blogs/blog',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
    })
    return response.data
    }
}