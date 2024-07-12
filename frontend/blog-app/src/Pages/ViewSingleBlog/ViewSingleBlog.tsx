import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BlogServiceAPI } from "../../Services/BlogService";
import { ErrorMessage } from "../../Components/ErrorMessage";
import { timeDiff } from "../../utils/relativeTime";
import { CgProfile } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import Comments from "./components/Comments";
import { applaudServieAPI } from "../../Services/applaudService";
import { ApplaudBlogProps } from "./type";



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
    const AppauldBlog = useMutation({
        mutationFn: (data:ApplaudBlogProps) => {return applaudServieAPI.applaudBlog(token,data)}
    })
    const [openComments, setOpenComments] = useState<boolean>(false);
    if(blogDetailData.isError){
        return <ErrorMessage/>
    }
    if(blogDetailData.isLoading){
        return <div>Loading.......</div>
    }
    const handleEditBlog = ()=>{
       navigate(`/blog/edit/${blogId}`,{replace:true})
    }
    const handleAppauldBlog = ()=>{
        console.log("callledc")
        const data:ApplaudBlogProps = {
            blog:blogId,
            user:user_id
        } 
        AppauldBlog.mutate(data);
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
                <div className=" flex justify-end gap-x-2">
                    <div>
                        <BiLike onClick={()=>{handleAppauldBlog()}} className=" cursor-pointer"/>
                    </div>
                    <div>
                        <FaComments onClick={()=>{setOpenComments(prev => !prev)}} className=" cursor-pointer"/>
                    </div>
                    <div>
                        <BsFillBookmarkCheckFill/>
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