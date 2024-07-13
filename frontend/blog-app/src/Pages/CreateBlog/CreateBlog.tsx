import InputField from "../../Components/InputField";
import { categoryData } from "../../utils/category";
import { CSSProperties, useState } from "react";
import { CreateBlogData } from "./types";
import SelectImage from "../../Components/SelectImage";
import { useMutation } from "@tanstack/react-query";
import { BlogServiceAPI } from "../../Services/BlogService";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LoaderComponent from "../../Components/LoaderComponent";
interface CreateBlogParams {
    data: FormData;
    token: string | null;
  }
  

//   const override: CSSProperties = {
//     display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
//   };
const CreateBlog = () => {
    const [formData, setFormData] = useState<CreateBlogData>({
        title:'',
        subtitle:'',
        category:'',
        description:''
    });
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const createPost = useMutation({
        mutationFn:({data, token}:CreateBlogParams)=>{
            return BlogServiceAPI.createBlog(data,token)

        },
        onSuccess :()=>{
            setIsLoading(false);
            navigate('/')
            
        }
    })
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
            setIsLoading(true);
            console.log(formData);
            console.log(preview_image);
            const data = new FormData();
            data.append("title",formData.title),
            data.append("subtitle",formData.subtitle),
            data.append("description", formData.description),
            data.append("status", status),
            data.append("category",formData.category)
            data.append('preview_image',preview_image as File);
            data.append('user',user_id as string);
            createPost.mutate({data, token});  

        }


    }

    return (
        <div className=" mx-auto max-w-[1080px] mt-20 w-full">
            <form className="w-full p-4 h-full">
                <InputField type="text" name="title" placeholder="Title of your blog.... (10-255 characters)" label="Title" onChangeHanlder={titleOnChangeHandler}/>
                <InputField type="text" name="subtitle" placeholder="Sub-title of your blog.... (10-300 characters)" label="Sub-title" onChangeHanlder={subtitleOnChangeHandler}/>
                <div className=" flex justify-center items-center gap-9">
                    {categoryData.map((category, index)=>(
                        <div className="flex flex-col gap-4 font-semibold hover:bg-purple-100 rounded-sm p-1" key={index}>
                             <label>{category.label}</label>
                             <input type="radio" name={category.name} value={category.value} onChange={categoryOnChangeHandler} checked={formData.category === category.value}/>
                        </div>
                    ))}
                </div>
                <SelectImage onChangeHandler={selectImageOnChangeHandler} image={cover_image}/>
                <div className="flex flex-col w-full p-2">
                    <label>Description</label>
                    <textarea name="description" placeholder="Enter the description of the blog" cols={50} rows={10} onChange={descriptionOnChangeHandler} className=" p-2 focus:outline-none border-[1.5px] border-slate-300 bg-transparent rounded-md focus:border-purple-300 text-md"/>
                </div>
                <div className=" flex justify-between gap-x-4 items-center w-1/2 p-2">
                    <button className="rounded-md w-1/2 border-[1.5px] border-darkpurple hover:scale-105 duration-300" onClick={(e)=>{
                        submit(e,"draft")
                        }}>Draft</button>

                    <button className="rounded-md w-1/2 bg-darkpurple border-[1.9px] border-darkpurple hover:bg-lightpurple hover:scale-105 duration-300" onClick={(e)=>{submit(e,"publish")}}>Publish</button>
                </div>

            </form>
            
            {isloading && <LoaderComponent isloading={isloading}/>}
        </div>
    );
};

export default CreateBlog;