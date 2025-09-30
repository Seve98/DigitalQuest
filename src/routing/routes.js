

import { createBrowserRouter } from "react-router"



import HomePage from "../pages/homepage/HomePage"
import Layout from "../layout/Layout"
import GenrePage from "../pages/genrepage/GenrePage"
import GameDetails from "../pages/details/GameDetails"
import SearchPage from "../pages/search/SearchPage"
import Register from "../pages/register/register"
import Login from "../pages/login/Login"
import Account from "../pages/account/Account"
import Profile from "../pages/profile/Profile"






const routes=createBrowserRouter([
    {
        path:"/",
        Component:Layout, 
        children:[
                   {index:true, Component: HomePage },
                   {path:"games/:genre", Component:GenrePage},
                   {path:"games/:slug/:id", Component:GameDetails},
                   {path:"/search",Component:SearchPage},
                   {path:"/register",Component:Register},
                   {path:"/login",Component:Login},
                   {path:"/account",Component:Account},
                   {path:"/profile",Component:Profile}
                  
                 ]
    },
   
    
])
export default routes