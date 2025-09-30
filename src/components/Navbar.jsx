import { Link, useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import Register from "../pages/register/register";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { useContext } from "react";
import GenresDropdown from "./GenresDropdown";


export default function Navbar(){
  const {session}=useContext(SessionContext);
  const navigate=useNavigate();

  const signOut=async()=>{
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    alert("Arrivederci 👍🏻!");
    navigate("/");
  }
    return(
        <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       
        <li>
          <a>Parent</a>
          <ul className="p-2">
           
          </ul>
        </li>

      </ul>
    </div>
    <a className="btn btn-ghost text-xl">DigitalQuest</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl">
     <li><Link to="/">Home </Link></li> 
      <li>
        <details>
          <summary><GenresDropdown/></summary>
          
        </details>
      </li>

    </ul>
  </div>
  <div className="navbar-end hidden lg:flex">
    <SearchBar/>  
   {session ?(
    <>
    <ul>
      <li>
      <details className="dropdown">
          <summary className="m-1 btn">Ciao {session.user.user_metadata.first_name}  </summary>
          <ul className="absolute menu dropdown-content  rounded-box ">
            <li><Link to="/profile">Profilo</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><a className="btn" onClick={signOut}>Logout</a></li>
          </ul>
      </details>
      </li>
    </ul>
    </>
   ):(
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/register"> Registrati </Link></li>
      <li><Link to="/login"> Accedi </Link></li>
    </ul>
   )}
  </div>
</div>
    )
}