import { CommentDataProps } from "../../utils/types";

export interface CommentPostProps{
    data:CommentDataProps, 
    token:string|null
}
export interface CommentProps{
    blogID:string,
    setOpenComments:React.Dispatch<React.SetStateAction<boolean>>
}

export interface CommentDeleteProps{
    commentID:number,
    token: string|null
}
export interface ApplaudBlogProps{
    blog:string,
    user:string|null
}
export interface SaveBlogProps{
    is_saved: 0 | 1
}