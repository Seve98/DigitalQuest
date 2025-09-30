import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";


export default function Layout() {
    return (
        <>
        <Navbar/>

      
      
        
        <div className="min-h-screen mb-10">
            <Outlet/>
        </div>
        

        <Footer/>
        </>
    );
}