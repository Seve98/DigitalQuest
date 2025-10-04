import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import bgVideo from '../videobg.mp4'

export default function Layout() {
    return (
        <>
            
        <Navbar/>

      <div>
         <video className=" background-video " autoPlay loop muted src={bgVideo}></video>
      
      
   
        <div className="min-h-screen mb-10">
            <Outlet/>
        </div>
        
</div>
        <Footer/>
        </>
    );
}