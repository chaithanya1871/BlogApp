import React from "react";

export interface FormDataLogin{
    username:string,
    password:string
}
export interface FormDataSignUp{
    username:string,
    password:string,
    email:string
}
export interface ErrorMsgsSignup {
    usernameError: string;
    emailError: string;
    passwordError: string;
  }

export interface SelectedImageProps{
    image:string | null,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

export interface CommentDataProps{
    content:string,
    blog:string,
    user_id:string
}