import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx"
import { commentServiceAPI } from "../../../Services/commentService";
import { CommentPostProps, CommentProps } from "../type";
import { CommentDataProps } from "../../../utils/types";
import { ErrorMessage } from "../../../Components/ErrorMessage";
import { AiFillDelete } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Comments = ({blogID,setOpenComments}:CommentProps) => {
    const userId = localStorage.getItem("user_id") as string;
    const token = localStorage.getItem('token');
    const [commentContent, setCommentContent] = useState<string>("");


    const handleCommentChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCommentContent(e.target.value)
    }
    const queryClient = useQueryClient();
    const PostComment = useMutation({
        mutationFn:({data,token}:CommentPostProps)=>{
            return commentServiceAPI.postComment(data,token)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['comments',token]});
        }
    })
    const handlePostComment = ()=>{
        if(commentContent === ''){
            console.log("please enter something to post");
            return;
        }
        let data: CommentDataProps = {
            content: commentContent,
            user_id: userId,
            blog: blogID
        };
        console.log(data);
        PostComment.mutate({ data, token });
    }
    const commentData = useQuery({
        queryKey:['comments',token],
        queryFn:()=>{
            return commentServiceAPI.getComments(token);
        }
    })
    const handleDeleteCommentOnClick = (commentID:string)=>{
        console.log(commentID);

    }
    if (commentData.isFetching) {
        return <div>Loading...</div>;
    }

    if (commentData.isError) {
        return <ErrorMessage />;
    }
    console.log(commentData.data);
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-gray-100 bg-opacity-80 flex justify-center items-center mt-8">
            <div className="text-black flex flex-col items-center border-[1.5px] rounded-xl shadow-md shadow-slate-200 bg-white w-[80%] h-[80%] sm:w-[50%]">
                <div className="flex justify-center items-center w-full p-2 relative">
                    <h2 className="font-bold">Comments</h2>
                    <RxCrossCircled  color="red" className="absolute right-2 cursor-pointer" onClick={()=>{setOpenComments(false)}}/>
                </div>
                <div className="p-4 w-full flex justify-between items-center gap-x-2">
                    <input type="text" placeholder="Write your comment here ...." className="border-[1.5px] border-slate-300 rounded-md text-sm w-full p-2 bg-transparent focus:border-purple-300 focus:outline-none" onChange={handleCommentChange}/>
                    <button className=" text-sm border-[1.2px] bg-slate-200 rounded-md p-1 hover:scale-110 duration-300 transition-all" onClick={()=>{handlePostComment()}}>Post</button>
                </div>
                {commentData.data?.map((comment, index) => (
                        <div key={index} className="w-full flex flex-col items-start border-b-[1px] border-b-slate-200">
                            <div className="flex justify-start items-center pl-4 pr-4">
                                {comment?.user?.profile_image?(<></>):(
                                        <CgProfile/>
                                )}
                                <p className="text-[0.6rem] p-2">{comment?.user.username}</p>
                                <p className="text-center text-[0.5rem] sm:text-[0.6rem]">{new Date(comment?.created_at).toDateString()}</p>
                                {userId == comment.user.id && (
                                    <AiFillDelete onClick={() => handleDeleteCommentOnClick(comment?.id)} className="ml-4 hover:scale-110 duration-300 cursor-pointer w-6 h-6 hover:bg-red-400 rounded-full p-1" />
                                )}
                            </div>
                            <p className="pl-4 pr-4 pb-2">{comment.content}</p>
                        </div>
                    ))}
                
            </div>
        </div>
    );
};

export default Comments;