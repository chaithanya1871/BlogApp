export interface InputFieldProps{
    label:string,
    type:string,
    name: string,
    placeholder?:string,
    onChangeHanlder:React.ChangeEventHandler<HTMLInputElement>,
    errorMsg?:string,
    value?:string
}

export interface DeleteModalProps{
    description:string,
    onDeleteHanlder:React.MouseEventHandler<HTMLButtonElement>,
    setIsDelete:React.Dispatch<React.SetStateAction<boolean>>

}