import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Layout() {
    return (
        <>
        <Navbar/>
        <h1>Layout</h1>
        <Outlet/>
        <Footer/>
        </>
    );
}