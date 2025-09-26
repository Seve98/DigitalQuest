import { useNavigate } from "react-router";
import { useState } from "react";
export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [ariaInvalid, setAriaInvalid] = useState(null);

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
        <div className="flex flex-col items-center justify-center me-10 searchbar">
            <form onSubmit={handleSearch} className="flex items-center">
                <fieldset role="group">
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
        </div>
    )
}