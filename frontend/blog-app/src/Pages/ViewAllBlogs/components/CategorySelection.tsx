import { categoryData } from "../../../utils/category";
import { CategoryProps } from "../types";

const CategorySelection = ({catIndex, setCatIndex}:CategoryProps) => {
    const categories = [{
        label: "All",
        name: "all",
        value: "all",
      },...categoryData]
    return (
        <button className=" flex items-center justify-center gap-12">
            {categories.map((category,index)=>(
                <div className={`${
                    catIndex.index === index ? "border-purple-300 shadow-md shadow-slate-300 bg-purple-200 scale-110 duration-300" : ""} 
                    border-2 rounded-full flex justify-center items-center font-bold text-[0.55rem] sm:text-[0.7rem] p-2 w-full 
                    hover:bg-purple-200`} onClick={()=>{
                        setCatIndex({
                            index:index,
                            cat:category.name
                        })
                    }}>
                    {category.label}
                </div>
            ))}
        </button>
    );
};

export default CategorySelection;