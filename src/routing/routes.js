

import { createBrowserRouter } from "react-router"



import HomePage from "../pages/homepage/HomePage"
import Layout from "../layout/Layout"



const routes=createBrowserRouter([
    {
        path:"/",
        Component:Layout, 
        children:[
                   {index:true, Component: HomePage },
                 ]
    },
   
    
])
export default routes