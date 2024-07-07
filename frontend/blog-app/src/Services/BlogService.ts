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
}