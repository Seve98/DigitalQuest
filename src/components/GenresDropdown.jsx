import { use } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
export default function GenresDropdown(){
    

const [genres, setGenres] = useState(null);
const [error, setError] = useState(null);
 
const initialUrl="https://api.rawg.io/api/genres?key=1c7734cdf2454917a6676784758c8c78";

const load = async () => {
    try{
        const response = await fetch(initialUrl);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const json = await response.json();
        setGenres(json);
    }catch(error){
        setError(error.message);
        setGenres(null);
    }
}
useEffect(() => {
    load();
}, []);
return(
    <>
       <details className="dropdown">
           <summary className="list-none">Genere</summary>
           <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
               {error && <p>{error}</p>}
               {
                   genres && genres.results.map((genre)=>
                   <li className="dropdown-item" key={genre.id}>
                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </li>)
               }
           </ul>
       </details>
    </>
)
}