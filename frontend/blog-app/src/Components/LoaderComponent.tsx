import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
const override: CSSProperties = {
    borderColor: 'red',
  };
  interface LoaderProps {
    isloading: boolean;
  }
const LoaderComponent:React.FC<LoaderProps>  = ({ isloading }) => {
    return (
        <div className=" flex items-center justify-center h-[100vh]">
            {isloading && (
                <ClipLoader
                color="#000000"
                loading={isloading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
      )}

            
        </div>
    );
};

export default LoaderComponent;