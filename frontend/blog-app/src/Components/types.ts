export interface InputFieldProps{
    label:string,
    type:string,
    name: string,
    placeholder?:string,
    onChangeHanlder:React.ChangeEventHandler<HTMLInputElement>,
    errorMsg?:string
}