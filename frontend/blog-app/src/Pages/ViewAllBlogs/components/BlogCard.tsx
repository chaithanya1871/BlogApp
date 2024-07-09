import { useNavigate } from "react-router-dom";
import { BlogProps } from "../types";

const BlogCard = ({blog}:{blog:BlogProps}) => {
    const navigate = useNavigate();
    const viewBlogOnClick = ()=>{
        navigate(`blog/${blog?.id}`)
    }
    return (
        <div className="w-[95%] sm:w-full mt-4 flex justify-between items-center p-4 bg-white hover:scale-105 duration-300 rounded-md border-[1.5px] border-slate-200 shadow-md shadow-slate-300">
            <img src={blog.preview_image} alt="preview-image"  className="w-[30%] h-[11.25rem] rounded-md object-cover"/>
            <div className=" w-[70%] h-[11.25rem]">
                <div>

                </div>
                <h2 className="p-2 font-bold text-sm sm:text-lg sm:whitespace-nowrap sm:overflow-hidden sm:overflow-ellipsis cursor-pointer w-full" onClick={()=>{viewBlogOnClick()}}>{blog.title}</h2>
                <p className="p-2 text-[0.55rem] sm:text-[0.75rem] hidden sm:block text-justify whitespace-nowrap overflow-hidden overflow-ellipsis">{blog.subtitle}</p>
                <p className="p-2 text-[0.55rem] sm:text-[0.75rem] hidden sm:block text-justify whitespace-nowrap overflow-hidden overflow-ellipsis">{blog.description}</p>

            </div>
        </div>
    );
};

export default BlogCard;