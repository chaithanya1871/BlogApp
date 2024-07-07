import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormDataLogin } from "../../utils/types";
import InputField from "../../Components/InputField";
import { useMutation } from "@tanstack/react-query";
import { userServiceAPI } from "../../Services/userService";
import { setUserInfoInLocalStorage } from "../../utils/jwtToken";

const login = () => {
    const [formData,setFormData] = useState<FormDataLogin>({
        username:"",
        password:""
    })
    const navigate = useNavigate();
    const loginUserSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(formData.username.length ===0  || formData.password.length ===0){
            console.log("please fill all the required fields")
        }
        const data = new FormData();
        data.append('username', formData.username);
        data.append('password',formData.password);
        loginUserMutation.mutate(data);


    }
    const loginUserMutation =  useMutation({
        mutationFn:(data:FormData)=>{
             return  userServiceAPI.login(data)
        },
        onSuccess:(data:any)=>{
            console.log(data);
            navigate('/')
            setUserInfoInLocalStorage(data?.access);

        },
        onError:(error:any)=>{
            console.log(error)

        }
    })
    const usernameOnChange = (e:React.ChangeEvent<HTMLInputElement>):void=> {
        setFormData({...formData,username:e.target.value});
    }
    const passwordOnChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setFormData({...formData, password:e.target.value});
    }
    return (
        <div className=" bg-extralightpurple w-screen h-screen flex justify-center items-center">
            <div className=" flex flex-col gap-5 bg-white items-center shadow-md shadow-lightpurple w-[40%] rounded-md p-8">
                <div className="">
                    <span>Blog</span>
                </div>
            <form className=" w-full flex flex-col items-center" onSubmit={loginUserSubmit}>
                <InputField label="Username" type="text" placeholder="Enter username" onChangeHanlder={usernameOnChange}  name="username"/>
                <InputField label="Password" type="password" placeholder="Enter Password" onChangeHanlder={passwordOnChange} name="password"/>
                <button className="mt-4  rounded-full bg-lightpurple h-10 hover:bg-darkpurple w-1/2 font-bold" type="submit">Login</button>
                <div className="flex gap-2 p-2 justify-center items-center text-[1rem]">
                    <p className=" text-[0.9rem]">Don't have an account?</p>
                    <Link to='/sign-up' className=" font-semibold">Sign up</Link>
                </div>
            </form>
            </div>
        </div>
    );
};

export default login;