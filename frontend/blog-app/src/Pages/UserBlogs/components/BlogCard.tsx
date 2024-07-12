import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { timeDiff } from "../../../utils/relativeTime";
import { useNavigate } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogServiceAPI } from "../../../Services/BlogService";
import { useState } from "react";
import DeleteModal from "../../../Components/DeleteModal";

const BlogCard = ({blogData}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const [isdelete,setIsDelete] = useState<boolean>(false);
    const  viewBlogOnClick = ()=>{
        navigate(`/blog/${blogData.id}`)
    }
    const editBlogOnClick = ()=>{
        navigate(`/blog/edit/${blogData.id}`)
    }
    const queryClient = useQueryClient();
    const deleteBlog = useMutation({
        mutationFn:()=>{
            return BlogServiceAPI.deleteBlog(token,blogData.id)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["user-blogs",user_id,token]})

        }
    })
    const deleteBlogOnClick = ()=>{
        deleteBlog.mutate();

    }
    return (
        <div className="flex flex-col items-center gap-y-2 p-1 rounded-md border-[1.5px] border-slate-200 shadow-md shadow-slate-300 w-full sm:w-1/2">
        <h2 onClick={viewBlogOnClick} className="p-2 font-bold text-sm sm:text-lg sm:whitespace-nowrap sm:overflow-hidden sm:overflow-ellipsis cursor-pointer w-full">
          {blogData.title}
        </h2>
  
        <div className="flex justify-between items-center p-2">
          <p className="p-2 text-[0.6rem] sm:text-[0.7rem]">{timeDiff(new Date(blogData.created_at).valueOf())}</p>
  
          <div className="flex justify-between items-center gap-x-2 p-2">
            <AiFillEdit onClick={editBlogOnClick} className="hover:scale-110 duration-300 cursor-pointer w-8 h-8 bg-yellow-300 rounded-full p-1" />
            <AiFillDelete onClick={()=>{setIsDelete(prev=>!prev)}} className="hover:scale-110 duration-300 cursor-pointer w-8 h-8 hover:bg-red-400 rounded-full p-1"/>
          </div>
        </div>
        {isdelete && <DeleteModal description="Are you sure about deleting this blog?" setIsDelete={setIsDelete} onDeleteHanlder={deleteBlogOnClick}/>}
      </div>
    );
};

export default BlogCard;