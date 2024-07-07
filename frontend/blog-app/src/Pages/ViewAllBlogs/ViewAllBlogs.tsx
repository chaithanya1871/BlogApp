import { useState } from "react";
import CategorySelection from "./components/CategorySelection";

const ViewAllBlogs = () => {
    const [catIndex, setCatIndex] = useState({
        index:0,
        cat:"all"
    });
    return (
        <div className="mx-auto max-w-[1080px] mt-20">
            <CategorySelection/>
        </div>
    );
};

export default ViewAllBlogs;