import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Home;