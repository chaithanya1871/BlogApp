import InputField from "../../Components/InputField";
import { categoryData } from "../../utils/category";
import { useEffect, useState } from "react";
import { CreateBlogData } from "./types";
import SelectImage from "../../Components/SelectImage";
import { BlogServiceAPI } from "../../Services/BlogService";
import { useNavigate, useParams } from "react-router-dom";
  

const EditBlog = () => {
    const [formData, setFormData] = useState<CreateBlogData>({
        title:'',
        subtitle:'',
        category:'',
        description:''
    });
    const {blogId} = useParams() as any;
    const token = localStorage.getItem('token') as string;
    const [loading, setIsLoading] = useState<boolean>(true);
    const {title, subtitle,category, description} = formData;
    useEffect(()=>{
        if(blogId){
            BlogServiceAPI.getBlogData(token, blogId).then(response=>{
                console.log(response);
                const data = {
                    title:response.title,
                    subtitle:response.subtitle,
                    category:response.category,
                    description:response.description
                }
                setFormData(data);
                setIsLoading(false);
            }).catch(()=>{
                setIsLoading(false);
                console.log("error occurred while editing the form")
            }) 
        }
    },[blogId]);


    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [cover_image, setCoverImage] = useState<string|null>(null);
    const [preview_image, setPreviewImage] = useState<File | null>(null);


    const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,title:e.target.value});
    }
    const subtitleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,subtitle:e.target.value});

    }
    const categoryOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,category:e.target.value});

    }
    const descriptionOnChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setFormData({...formData,description:e.target.value});

    }
    const selectImageOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{ 
        console.log("calledddddd")
        const files = e.target.files;
        if (files){
            setPreviewImage(files[0])
        }
        else{
            setPreviewImage(null);
        }

    }
    const validateFormData = ():boolean =>{
        console.log(formData);
        const {title, subtitle, description,category} = formData;
        if (!title || ! subtitle || !description || !category){
            console.log("All fields are required");
            return false
        }
        if(title.length<=10 || title.length>255){
            console.log("title should be less than 255 characters")
            return false
        }
        return true
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>, status:string): void =>{
        e.preventDefault();
        if(validateFormData()){
            console.log(preview_image)
            const data = new FormData();
            data.append("title",formData.title),
            data.append("subtitle",formData.subtitle),
            data.append("description", formData.description),
            data.append("status", status),
            data.append("category",formData.category)
            data.append('preview_image',preview_image as File);
            data.append('user',user_id as string);
            for (let [key, value] of data.entries()) {
                console.log(`${key}: ${value}`);
            }
            BlogServiceAPI.updateBlog(token,blogId,data).then(()=>{
                console.log("blog updated successfully");
                navigate(`/blog/${blogId}`);
            }).catch(()=>{
                console.log("error occuredddd");
            })
        }
    }
    if (loading){
        return <div>Loading.......</div>
    }

    return (
        <div className=" mx-auto max-w-[1080px] mt-20 w-full">
            <form className="w-full p-4 h-full">
                <InputField type="text" name="title" placeholder="Title of your blog.... (10-255 characters)" label="Title" onChangeHanlder={titleOnChangeHandler} value={title}/>
                <InputField type="text" name="subtitle" placeholder="Sub-title of your blog.... (10-300 characters)" label="Sub-title" onChangeHanlder={subtitleOnChangeHandler} value={subtitle}/>
                <div className=" flex justify-center items-center gap-9">
                    {categoryData.map((category, index)=>(
                        <div className="flex flex-col gap-4 font-semibold hover:bg-purple-100 rounded-sm p-1" key={index}>
                             <label>{category.label}</label>
                             <input type="radio" name={category.name} value={category.value} onChange={categoryOnChangeHandler} checked={formData.category === category.value} />
                        </div>
                    ))}
                </div>
                <SelectImage onChangeHandler={selectImageOnChangeHandler} image={cover_image}/>
                <div className="flex flex-col w-full p-2">
                    <label>Description</label>
                    <textarea name="description" placeholder="Enter the description of the blog" cols={50} rows={10} onChange={descriptionOnChangeHandler} className=" p-2 focus:outline-none border-[1.5px] border-slate-300 bg-transparent rounded-md focus:border-purple-300 text-md" value={description}/>
                </div>
                <div className=" flex justify-between gap-x-4 items-center w-1/2 p-2">
                    <button className="rounded-md w-1/2 border-[1.5px] border-darkpurple hover:scale-105 duration-300" onClick={(e)=>{
                        submit(e,"draft")
                        }}>Draft</button>

                    <button className="rounded-md w-1/2 bg-darkpurple border-[1.9px] border-darkpurple hover:bg-lightpurple hover:scale-105 duration-300" onClick={(e)=>{submit(e,"publish")}}>Publish</button>
                </div>

            </form>
            

        </div>
    );
};

export default EditBlog;