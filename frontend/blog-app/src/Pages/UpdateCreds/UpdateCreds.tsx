import { useState } from "react";
import InputField from "../../Components/InputField";
import { UpdateCredsFormData, UpdateCredsFormError, UserUpdateVariables } from "./types";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { userServiceAPI } from "../../Services/userService";

const UpdateCreds = () => {
    const user_id = localStorage.getItem('user_id');
    const auth_token = localStorage.getItem('token');
    const [formData, setFormData] = useState<UpdateCredsFormData>({
        email:'',
        password:''
    })
    const [errorMsg, setErrorMsg] = useState<UpdateCredsFormError>({
        emailErrorMsg:"",
        passwordErrorMsg:""
    })
    const {emailErrorMsg, passwordErrorMsg} = errorMsg;
    const NewEmailChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        if(!validator.isEmail(e.target.value)){
            setErrorMsg({...errorMsg, emailErrorMsg:"Invalid Email"})
        }
        else{
            setFormData({...formData, email:e.target.value})
            setErrorMsg({...errorMsg,emailErrorMsg:""})
        }
    };
    const NewPassordChangeHandler =(e:React.ChangeEvent<HTMLInputElement>):void=>{
        if (e.target.value.length < 6 || e.target.value.length > 12) {
            setErrorMsg({
              ...errorMsg,
              passwordErrorMsg: "Password must be in between 6-12 characters",
            });
          } else {
            setFormData({ ...formData, password: e.target.value });
            setErrorMsg({ ...errorMsg, passwordErrorMsg: "" });
      }
    }

    const userUpdate = useMutation({
        mutationFn: ({ data, user_id, token }:UserUpdateVariables) => {
            return userServiceAPI.update_user(data, user_id, token);
        }
    });
    
    const handleUserUpdate = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();

        const data = new FormData();
        data.append("email",formData.email);
        data.append("passwrord", formData.password);
        userUpdate.mutate({
            data,
            user_id,
            token: auth_token
        });


    }
    return (
        <div className="mx-auto max-w-[1080px] mt-24 flex justify-center items-center w-full">
            <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={handleUserUpdate}>
                <InputField label="New email" placeholder="Enter new email" type="text" name="email" onChangeHanlder={NewEmailChangeHandler} errorMsg={emailErrorMsg}/>
                <InputField label="New Password" placeholder="Enter new password" type="password" name="password" onChangeHanlder={NewPassordChangeHandler} errorMsg={passwordErrorMsg}/>
                <button type="submit" className="w-1/2 h-10 mt-4 rounded-full bg-lightpurple hover:bg-darkpurple font-extrabold">Update</button>
            </form>
            
        </div>
    );
};

export default UpdateCreds;