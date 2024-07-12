import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BlogServiceAPI } from "../../Services/BlogService";
import { ErrorMessage } from "../../Components/ErrorMessage";
import BlogCard from "./components/BlogCard";

const UserBlogs = () => {

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id')
    const [selectedOption, setSelectedOption] = useState<"publish"|"draft">("publish");
    const handleSelectedOption = (status:"publish"|"draft")=>{
        console.log("calledddd")
        setSelectedOption(status)
    }
    const userBlogs = useQuery({
        queryKey:["user-blogs",user_id,token],
        queryFn:()=>{
            return BlogServiceAPI.getUserBlog(token,user_id)
        }
    })
    if(userBlogs.isFetching){
        return <div>Loadinggggg..........</div>
    }
    if(userBlogs.isError){
        return <ErrorMessage/>
    }
    return (
        <div className="mx-auto max-w-[1080px] mt-20 w-full">
            <div className=" flex justify-center items-center gap-x-6">
                <button className={` ${selectedOption== "draft"? "bg-purple-400" : ""}hover:scale-105 durtion-300 transition-all rounded-md border-[1.5px] border-lightpurple w-[30%]`} onClick={()=>{
                    handleSelectedOption("draft")
                }}>Draft</button>
                <button className={`${selectedOption== "publish"? "bg-purple-400" : ""}hover:scale-105 durtion-300 transition-all rounded-md border-[1.5px] border-lightpurple w-[30%]`} onClick={()=>{
                    handleSelectedOption("publish")
                }}>Publish</button>
                <div>
                </div>
            </div>
            <div className="mt-4 flex flex-col items-center gap-y-4 p-2">
                {userBlogs.data.map((blog)=>(
                    <BlogCard blogData={blog}/>

                ))}
            </div>

        </div>
    );
};

export default UserBlogs;