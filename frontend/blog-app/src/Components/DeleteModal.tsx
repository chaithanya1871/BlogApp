import { DeleteModalProps } from "./types";

const DeleteModal = ({description,onDeleteHanlder,setIsDelete}:DeleteModalProps) => {
    const handleCancel = ()=>{
        setIsDelete(prev=>!prev)
    }
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-gray-100 bg-opacity-80 flex justify-center items-center">
            <div className="text-black flex flex-col items-center border-[1.5px] rounded-xl shadow-md shadow-slate-200 bg-white h-[15%] sm:w-[40%]">
                <div className=" flex items-center justify-center flex-col gap-y-10">
                <h3 className="font-bold">{description}</h3>
                <div className=" flex justify-center items-center gap-10">
                    <button className=" border border-slate-300 px-2 py-1 rounded-md hover:border-slate-500" onClick={handleCancel}>Cancel</button>
                    <button onClick={onDeleteHanlder} className="border border-slate-300 px-2 py-1 rounded-md bg-red-500 hover:bg-red-700">Delete</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;