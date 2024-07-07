import { MdEditSquare } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { userServiceAPI } from "../../../Services/userService";
import { useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";



const UserProfile = () => {
    const authToken = localStorage.getItem("token");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userData = useQuery({
        queryKey:["userdata", authToken],
        queryFn:({queryKey})=>{
            const [,token] = queryKey
            return userServiceAPI.get_user_info(token)
        }
    })
    const handleOptionClick = ()=>{
        setIsOpen((prev) => !prev);
    }
    
    return (
        <div className=" flex justify-between gap-10 items-center">
            <div className=" flex items-center justify-center gap-1">
                <MdEditSquare />
                <p>Write</p>
            </div>
            <div className=" flex items-center justify-center gap-1">
                <BsBookmarkCheckFill />
                <p>Saved</p>
            </div>
            <div className=" flex items-center justify-center gap-1">
                <FaFolderOpen />
                <p>Blogs</p>
            </div>
            <div className=" flex justify-center items-center gap-2 cursor-pointer relative" onClick={handleOptionClick}>
                <img/>
                <p>{userData?.data?.username}</p>
                {isOpen?<RiArrowDropUpFill size={30} /> : <RiArrowDropDownFill size={30} />}
                {isOpen && 
                <div className=" w-full absolute left-6 top-10 p-1 bg-white shadow-md z-10 rounded-md text-[0.8rem]">
                    <ul className="space-y-1">
                        <li className="over:bg-blue-300 rounded-md p-2">Update credentials</li>
                        <li className="hover:bg-darkyellow rounded-md p-2">logout</li>
                        <li className="hover:bg-red-400 rounded-md p-2">delete</li>
                    </ul>
                </div>}
            </div>
        </div>
    );
};

export default UserProfile;