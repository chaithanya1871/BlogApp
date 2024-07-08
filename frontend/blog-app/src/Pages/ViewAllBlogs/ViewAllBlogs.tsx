import { useState } from "react";
import CategorySelection from "./components/CategorySelection";
import { useQuery } from "@tanstack/react-query";
import { BlogServiceAPI } from "../../Services/BlogService";
import BlogCard from "./components/BlogCard";
import { BlogProps } from "./types";

const ViewAllBlogs = () => {
    const [catIndex, setCatIndex] = useState({
        index:0,
        cat:"all"
    });
    const token = localStorage.getItem('token');
    const blogData = useQuery({
        queryKey:['blogs'],
        queryFn:()=>{
            return BlogServiceAPI.getAllBlogs(token);
        }
    })
    if(blogData?.data)
        return (
            <div className="mx-auto max-w-[1080px] mt-20">
                <CategorySelection catIndex={catIndex} setCatIndex={setCatIndex}/>
                <div>
                    {blogData?.data.map((blog:BlogProps,index:number)=>(
                        <BlogCard key={index} blog={blog}/>
                    ))}
                </div>
                
            </div>
        );
    return(
        <div>Loadingg......</div>
    )
};

export default ViewAllBlogs;