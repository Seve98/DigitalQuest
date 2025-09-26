

import { createBrowserRouter } from "react-router"



import HomePage from "../pages/homepage/HomePage"
import Layout from "../layout/Layout"
import GenrePage from "../pages/genrepage/GenrePage"
import GameDetails from "../pages/details/GameDetails"






const routes=createBrowserRouter([
    {
        path:"/",
        Component:Layout, 
        children:[
                   {index:true, Component: HomePage },
                   {path:"games/:genre", Component:GenrePage},
                   {path:"games/:slug/:id", Component:GameDetails}
                  
                 ]
    },
   
    
])
export default routes