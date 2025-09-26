import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
export default function Layout() {
    return (
        <>
        <Navbar/>
      
        <SideBar/>
        <div className="min-h-screen my-10">
            <Outlet/>
        </div>
        
        <Footer/>
        </>
    );
}