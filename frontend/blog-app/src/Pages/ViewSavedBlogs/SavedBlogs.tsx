import {  useQuery } from "@tanstack/react-query";
import { BlogServiceAPI } from "../../Services/BlogService";
import { Link, useNavigate } from "react-router-dom";

const SavedBlogs = () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const SavedBlogs = useQuery({
        queryKey:['saved-blogs',token,user_id],
        queryFn:()=>{
            return BlogServiceAPI.savedBlogs(token, user_id)
        }
    });
    if(SavedBlogs.isLoading){
        return <div className=" h-[100vh]">Loading......</div>
    }
    const navigate = useNavigate();
    const handleBlogDetail = (blogId:string)=>{
        navigate(`/blog/${blogId}`)
    }
    console.log(SavedBlogs.data);
    return (
        <div className=" h-[90vh] w-[500px] mt-20 flex justify-center items-center flex-col gap-10">
            {SavedBlogs.data.length? <div>
                {SavedBlogs.data.map((blog:any)=>(
                <div className=" border border-slate-500 w-[400px] rounded-md shadow-md cursor-pointer" onClick={()=>handleBlogDetail(blog.id)}>
                    <h2>{blog.title}</h2>
                </div>
            ))}
            </div>: 
            <div>
                <h2 className=" text-xl">No saved Blogs</h2>
                <Link to='/' className=" cursor-pointer text-blue-400">check out new blogs</Link>
            </div>}
            
            
        </div>
    );
};

export default SavedBlogs;