import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FormDataSignUp, ErrorMsgsSignup } from "../../utils/types";
import InputField from "../../Components/InputField";
import validator from 'validator'
import { useMutation } from "@tanstack/react-query";
import { userServiceAPI } from "../../Services/userService";

const SignUp = () => {
    const [formData,setFormData] = useState<FormDataSignUp>({
        username:"",
        password:"",
        email:""
    })
    const [errorMsg, setErrorMsg] = useState<ErrorMsgsSignup>({
        usernameError:"",
        passwordError:"",
        emailError:""
    })
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const signupUser = useMutation({
        mutationFn:(data:FormData)=>{
            return userServiceAPI.signup(data);
        },
        onSuccess:(data:any)=>{
            setIsLoading(false);
            console.log(data)
            navigate('/login')
        },
        onError:(error:any)=>{
            setIsLoading(false);
            console.log("Error", error)
        }
    })
    const {usernameError, passwordError, emailError} = errorMsg;
    const signupUserOnSubmit = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        if (formData.email.length ===0 ||  formData.password.length===0  || formData.username.length === 0){
            console.log("All fields are mandatory");
        }
        else if(errorMsg.emailError.length ===0 && errorMsg.passwordError.length===0 && errorMsg.usernameError.length===0){
            setIsLoading(true);
            console.log(formData.username);
            const data = new FormData();
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            for (let [key, value] of data.entries()) {
                console.log(`${key}: ${value}`);
            }
            signupUser.mutate(data);

            
        }

    }
    const usernameOnChange = (e:React.ChangeEvent<HTMLInputElement>):void=> {
        if(e.target.value.length>15){
            setErrorMsg({...errorMsg, usernameError:"Username must be <= 15 characters"})
        }
        else{
            setFormData({...formData,username:e.target.value});
            setErrorMsg({...errorMsg, usernameError:""})
        }
    }
    const emailOnChnage = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        if(!validator.isEmail(e.target.value)){
            setErrorMsg({...errorMsg, emailError:"Invalid Email"})
        }
        else{
            setFormData({...formData,email:e.target.value});
            setErrorMsg({...errorMsg, emailError:""})
        }
    }
    const passwordOnChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        if (e.target.value.length < 6 || e.target.value.length > 12) {
            setErrorMsg({
              ...errorMsg,
              passwordError: "Password must be in between 6-12 characters",
            });
          } else {
            setFormData({ ...formData, password: e.target.value });
            setErrorMsg({ ...errorMsg, passwordError: "" });
          }
    }
    return (
        <div className=" bg-extralightpurple w-screen h-screen flex justify-center items-center">
        <div className=" flex flex-col gap-5 bg-white items-center shadow-md shadow-lightpurple w-[40%] rounded-md p-8">
            <div className="">
                <span>Blog</span>
            </div>
        <form className=" w-full flex flex-col items-center" onSubmit={signupUserOnSubmit} noValidate>
            <InputField label="Username" type="text" placeholder="Enter username" onChangeHanlder={usernameOnChange} errorMsg={usernameError} name="username"/>
            <InputField label="Email" type="email" placeholder="Enter email" onChangeHanlder={emailOnChnage} errorMsg={emailError} name="email"/>
            <InputField label="Password" type="password" placeholder="Enter Password" onChangeHanlder={passwordOnChange} errorMsg={passwordError} name="password"/>
            <button className="mt-4  rounded-full bg-lightpurple h-10 hover:bg-darkpurple w-1/2 font-bold" type="submit">Sign Up</button>
            <div className="flex gap-2 p-2 justify-center items-center text-[1rem]">
                <p className=" text-[0.9rem]">Already have an account?</p>
                <Link to='/login' className=" font-semibold">Login</Link>
            </div>
        </form>
        </div>
    </div>
    );
};

export default SignUp;