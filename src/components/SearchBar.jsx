import { useNavigate } from "react-router";
import { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [ariaInvalid, setAriaInvalid] = useState(null);
    const [open,setOpen]=useState(false);
    const handleSearch=(e)=>{
        e.preventDefault();
        if(typeof search === 'string' && search.trim().length!==0){
            navigate(`/search?query=${search}`);
            setSearch('');
        }
        else{
            setAriaInvalid(true);
        }
    };
    return (
            

        <div className="flex">
           <button onClick={()=>setOpen(prev=>!prev)} className=" rounded-full transition">
             <FontAwesomeIcon icon={faMagnifyingGlass} className="my-auto lg:mx-2"/>
           </button>
           
       {open &&(
            <form onSubmit={handleSearch} className="flex items-center">
                <fieldset className="flex" role="group">
                <input
                    name="search"
                    type="text"
                    placeholder="Cerca un gioco..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-invalid={ariaInvalid}
                />
                <input type="submit" value="Cerca" />
                </fieldset>
            </form>
       )}    
        </div>
    )
}