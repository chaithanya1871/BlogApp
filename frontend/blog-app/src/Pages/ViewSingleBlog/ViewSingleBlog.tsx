import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BlogServiceAPI } from "../../Services/BlogService";
import { ErrorMessage } from "../../Components/ErrorMessage";
import { timeDiff } from "../../utils/relativeTime";
import { CgProfile } from "react-icons/cg";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import Comments from "./components/Comments";
import { applaudServieAPI } from "../../Services/applaudService";
import { ApplaudBlogProps, SaveBlogProps } from "./type";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";





const ViewSingleBlog = ():React.JSX.Element => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const {blogId} = useParams() as any;
    const navigate = useNavigate();
    const blogDetailData = useQuery({
        queryKey:['blog',token,blogId],
        queryFn:()=>{
            return BlogServiceAPI.getBlogData(token,blogId)
        }
    });
    const queryClient = useQueryClient();
    const AppauldBlog = useMutation({
        mutationFn: (data:ApplaudBlogProps) => {return applaudServieAPI.applaudBlog(token,data)},
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['blog',token,blogId]}),
            queryClient.invalidateQueries({queryKey:['applaud',token,blogId,user_id]})
        }
    })
    const SaveBlog = useMutation({
        mutationFn:(data:FormData)=>{return BlogServiceAPI.updateBlog(token, blogId, data)},
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['blog',token,blogId]})
        }
    });
    const userApplauded = useQuery({
        queryKey:['applaud',token,blogId,user_id],
        queryFn:()=>{
            return applaudServieAPI.whetherUserApplauded(token,user_id,blogId)
        }
    })
    const [openComments, setOpenComments] = useState<boolean>(false);
    if(blogDetailData.isError){
        return <ErrorMessage/>
    }
    if(blogDetailData.isLoading || userApplauded.isLoading){
        return <div>Loading.......</div>
    }
    const handleEditBlog = ()=>{
       navigate(`/blog/edit/${blogId}`,{replace:true})
    }
    const handleBlogSave =()=>{
        const data = new FormData();
        data.append('category',blogDetailData.data.category);
        data.append('title',blogDetailData.data.title);
        data.append('subtitle',blogDetailData.data.subtitle);
        data.append('status',blogDetailData.data.status);
        data.append('description',blogDetailData.data.description);
        data.append('is_saved',(!blogDetailData.data.is_saved).toString());
        console.log(!blogDetailData.data.is_saved);
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        SaveBlog.mutate(data)

    }
    const handleAppauldBlog = ()=>{
        if(token){
            const data:ApplaudBlogProps = {
                blog:blogId,
                user:user_id
            } 
            AppauldBlog.mutate(data);
        }
        else{
            toast.error("please login to like the post")
        }
    }
    return (
        <div className="mx-auto max-w-[1080px] mt-20 w-full">
            <div className="w-full  sm:h-[18rem] p-2 overflow-hidden">
                <img src={blogDetailData.data.preview_image} alt="coverimage" className=" w-full h-full sm:h-full rounded-md object-cover"/>
            </div>

           <div className=" flex justify-center items-center">
                <div className="flex justify-center items-center pl-2">
                    {blogDetailData?.data?.user?.profile_image?(<></>):(
                        <CgProfile/>
                    )}
                    <p className="text-sm p-2">{blogDetailData.data.user.username}</p>
                    <p className="text-center text-[0.5rem] sm:text-[0.8rem]">{timeDiff(new Date(blogDetailData.data.created_at).valueOf())}</p>
                </div>
                <div className=" flex justify-end  items-center gap-x-3 ml-3">
                    <div className=" flex justify-center items-center gap-x-1">
                        {userApplauded.data.length? <BiSolidLike /> :  <BiLike className=" cursor-pointer" onClick={()=>{handleAppauldBlog()}}/>}

                        
                        <p>{blogDetailData.data.applauds.length}</p>
                    </div>
                    <div className=" flex justify-center items-center gap-x-1">
                        <FaComments onClick={()=>{setOpenComments(prev => !prev)}} className=" cursor-pointer"/>
                        <p>{blogDetailData.data.comments.length}</p>
                    </div>
                    <div onClick={()=>handleBlogSave()} className=" cursor-pointer">
                        {blogDetailData?.data.is_saved ? <FaBookmark /> : <CiBookmark />}
                    </div>

                </div>
           </div>
           {blogDetailData?.data?.user?.id == user_id?(
            <div className=" flex justify-center items-center mt-5">
                <AiFillEdit size={30} className="hover:scale-110 duration-300 cursor-pointer w-8 h-8 bg-yellow-300 rounded-full p-1" onClick={()=>handleEditBlog()}/>
            </div>
           ):null}
            <h2 className="mt-4 p-2 font-bold text-sm text-center sm:text-lg break-words">{blogDetailData?.data?.title}</h2>
            <p className="p-2 text-[0.55rem] sm:text-[0.75rem] text-center break-words">{blogDetailData?.data?.subtitle}</p>
            <div className=" flex justify-start w-full p-2">
                {blogDetailData?.data?.description}
            </div>
        {openComments?(
            <Comments blogID={blogId} setOpenComments={setOpenComments}/>
        ):null}
        </div>
    );
};

export default ViewSingleBlog;