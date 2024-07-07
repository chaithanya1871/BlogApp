import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/sign-up";
import Home from "./Pages/Home/Home";
import UpdateCreds from "./Pages/UpdateCreds/UpdateCreds";
import CreateBlog from "./Pages/CreateBlog/CreateBlog";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Home/>,
        children:[
            {
                path:'update-credentials',
                element:<UpdateCreds/>
            },
            {
                path:'blog/create/',
                element:<CreateBlog/>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/sign-up',
        element:<SignUp/>
    }
])
