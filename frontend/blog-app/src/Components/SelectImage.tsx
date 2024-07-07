import { BiSolidImage } from "react-icons/bi";
import { SelectedImageProps } from "../utils/types";
import { useRef } from "react";


const SelectImage = ({image, onChangeHandler}:SelectedImageProps) => {
    const fileInputRef = useRef<any>();
    const selectImageOnClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        fileInputRef.current.click();
    }
    return (
        <div onClick={selectImageOnClick} className="flex flex-col items-center cursor-pointer w-full p-2 mt-2">
            {image?(
                <img src={image} alt="image-preview" className="rounded-md w-full h-[11.25rem] object-cover border-lightpurple border-2" />

            ):(
                <div className="rounded-md border-lightpurple border-2 border-dotted p-2 w-full flex justify-center items-center">
                    <BiSolidImage size={180} color="#8e65cf"/>

                </div>
            )}
            <input type="file" name="profile-image" accept="image/*" ref={fileInputRef} onChange={onChangeHandler} className="hidden"/>
        </div>
    );
};

export default SelectImage;