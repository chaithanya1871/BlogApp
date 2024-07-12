import { InputFieldProps } from "./types";

const InputField = ({label, type, name, placeholder, onChangeHanlder, errorMsg, value}:InputFieldProps):JSX.Element => {
    return (
        <div className="flex flex-col w-full p-2">
            <label>{label}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={onChangeHanlder} className=" p-2 focus:outline-none border-[1.5px] border-slate-300 bg-transparent rounded-md focus:border-purple-300 text-md" value={value}/>
            {errorMsg && <p className=" text-red-500 text-[0.8rem]">{errorMsg}</p>}
            
        </div>
    );
};

export default InputField;