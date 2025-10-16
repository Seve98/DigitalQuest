

import { createBrowserRouter } from "react-router"



import Layout from "../layout/Layout.jsx"
import GenrePage from "../pages/genrepage/GenrePage.jsx"
import GameDetails from "../pages/details/GameDetails.jsx"
import SearchPage from "../pages/search/SearchPage.jsx"
import Register from "../pages/register/Register.jsx"
import Login from "../pages/login/Login.jsx"
import Account from "../pages/account/Account.jsx"
import Profile from "../pages/profile/Profile.jsx"
import HomePage from "../pages/homepage/HomePage.jsx"





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