import { CreateBlogData } from "../Pages/CreateBlog/types";
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
    static getAllBlogs = async(token:string|null,category:string)=>{
        const response = await api.get('blogs/list/blog',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            params:{
                category:category
            }
    })
    return response.data
    }
    static getBlogData = async(token:string|null, blogId:number)=>{
        const response = await api.get(`blogs/blog/${blogId}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
    })
    return response.data
    }
    static updateBlog = async(token:string|null, blogId:number, data:FormData)=>{
        
        const response = await api.put(`blogs/blog/${blogId}/`,data,{
            headers:{
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${token}`
            }
        })
        return response.data;
    }
    static getUserBlog = async(token:string|null, user_id:string|null)=>{
        const response = await api.get(`blogs/blog/`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            params:{
                user:user_id,
            }
        }
        )
        return response.data;
    }
    static deleteBlog = async(token:string|null, blogId:string)=>{
        const response = await api.delete(`blogs/blog/${blogId}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        )
        return response.data;
    }
    static savedBlogs =async (token:string | null, user_id:string|null) => {
        const response = await api.get('blogs/list/blog',{
            headers:{
                "Content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            params:{
                user:user_id,
                is_saved:"true"
            }
        })
     return response.data;   
    }

}