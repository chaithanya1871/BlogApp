export interface UpdateCredsFormData {
    email:string,
    password:string
}
export interface UpdateCredsFormError{
    emailErrorMsg:string,
    passwordErrorMsg:string
}
export type UserUpdateVariables = {
    data: FormData;
    user_id: string | null;
    token: string | null;
};