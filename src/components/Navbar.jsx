import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import SearchBar from "./SearchBar";
import GenresDropdown from "./GenresDropdown";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";

export default function Navbar() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    alert("Arrivederci 👍🏻!");
    navigate("/");
  };

  return (
    <nav className="navbar bgp shadow-md  py-2 flex justify-between items-center">
      {/* Navbar start */}
      <div className="navbar-start flex items-center">
        {/* Mobile dropdown */}
        <div className="dropdown   lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content bgp mt-3    w-90 "
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <GenresDropdown />
            </li>
            <li>
              <SearchBar />
            </li>
            
          </ul>
          
        </div>

        <Link to="/" className=" normal-case text-center text-xl ml-2">
          DigitalQuest
        </Link>
      </div>

      {/* Navbar center */}
      <div className="navbar-center hidden lg:flex  justify-center">
        <ul className="menu menu-horizontal items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <GenresDropdown />
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end lg:flex items-center space-x-2">
        {session ? (
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 w-90 lg:w-46 shadow bgp rounded-box  mt-2"
            >
              <li>
                <span>Benvenuto {session.user.user_metadata.first_name}</span>
              </li>
              <hr />
              <li>
                <Link to="/profile">Profilo</Link>
              </li>
              <li>
                <Link to="/account">Impostazioni</Link>
              </li>
              <li>
                <button onClick={signOut} className="w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </label>
            <ul className="dropdown-content menu justify-center w-30 lg:w-46 shadow bgp rounded-box  ">
             <li className=" linkhover my-2"><Link className="justify-center " to="/register" >Registrati</Link></li>  
            
               <li className="  linkhover"><Link  className="justify-center "  to="/login" >Accedi</Link></li> 
            </ul>
        
             
          </div>
         
              
            
          </>
        )}
       
      </div>
    </nav>
  );
}
