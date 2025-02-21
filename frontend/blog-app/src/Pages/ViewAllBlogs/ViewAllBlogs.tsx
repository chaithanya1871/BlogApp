import { useEffect, useState } from "react";
import CategorySelection from "./components/CategorySelection";
import { BlogServiceAPI } from "../../Services/BlogService";
import BlogCard from "./components/BlogCard";
import { BlogProps } from "./types";
import { ErrorMessage } from "../../Components/ErrorMessage";
import { Link } from "react-router-dom";

const ViewAllBlogs = () => {
    const [catIndex, setCatIndex] = useState({
        index:0,
        cat:"all"
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [blogData, setBlogData] = useState<BlogProps[]|null>(null);
    useEffect(()=>{
        const category = catIndex.cat === "all" ? "" : catIndex.cat;
        BlogServiceAPI.getAllBlogs(token,category).then(response=>{
            setBlogData(response);
            setLoading(false)
        }).catch(()=>{
            setLoading(false)
            setError(true)
            console.log("error occured")
        })

    },[catIndex]);
    if(loading){
        return <div>Loading.........</div>
    }
    if(error){
        return <ErrorMessage/>
    }
    return (
        <div className="mx-auto max-w-[1080px] mt-20">
            <CategorySelection catIndex={catIndex} setCatIndex={setCatIndex}/>
            <div>
                {blogData && blogData.length>0 ? (blogData.map((blog:BlogProps,index:number)=>(
                    <BlogCard key={index} blog={blog}/>
                ))):(<div className="flex items-center justify-center h-[80vh] flex-col">
                        <h1 className=" font-bold text-xl">No blogs found</h1>
                        <Link className=" text-blue-500 cursor-pointer" to="/blog/create/">Create a Blog</Link>
                    </div>)}
            </div>
            
        </div>
    );
    
};

export default ViewAllBlogs;