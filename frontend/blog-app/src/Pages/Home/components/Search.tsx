import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
    return (
        <div className="w-[40%] flex items-center justify-center">
            <input type="search" placeholder="Search..." className=" border-[1.5px] border-r-0 outline-none p-2 focus:border-purple-300 focus:outline-none rounded-r-none rounded-md text-sm w-full"/>
            <AiOutlineSearch  className="w-10 h-[2.45rem] border-[1.5px] border-l-0 border-slate-300 rounded-l-none rounded-md hover:bg-purple-200"/>
        </div>
    );
};

export default Search;