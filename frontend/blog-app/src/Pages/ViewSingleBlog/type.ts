import { CommentDataProps } from "../../utils/types";

export interface CommentPostProps{
    data:CommentDataProps, 
    token:string|null
}
export interface CommentProps{
    blogID:string,
    setOpenComments:React.Dispatch<React.SetStateAction<boolean>>
}