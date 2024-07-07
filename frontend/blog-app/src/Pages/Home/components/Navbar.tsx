import { Link } from "react-router-dom";
import Search from "./Search";
import UserProfile from "./UserProfile";

const Navbar = () => {
    const authtoken = localStorage.getItem('token')
    return (
        <div className="border-[1.5px] shadow-md shadow-slate-300 h-16 w-full z-10 fixed top-0 left-0 right-0 p-8 bg-white">
            <div className=" flex items-center justify-between h-full mx-auto max-w-[1080px]">
                <h3>Blog App</h3>
                <Search/>
                <ul className="flex space-x-6 text-md items-center">
                    {
                        authtoken?(<UserProfile/>):
                    (<>
                        <li className=" list-none border-[1.5px] p-2 rounded-full w-20 h-10 flex justify-center items-center bg-lightpurple hover:bg-darkpurple hover:scale-110 transition-all">
                            <Link to='login'>Login</Link>
                            </li>
                        <li className=" list-none border-[1.5px] border-lightpurple w-20 h-10 rounded-full flex justify-center items-center over:scale-110 transition-all">
                            <Link to='sign-up'>Sign up</Link>
                        </li>
                    </>)}

                </ul>
    
            </div>
        </div>
    );
};

export default Navbar;