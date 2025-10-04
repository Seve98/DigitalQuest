import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardGame from "../../components/CardGame";
import Fetch from "../../hook/useFetch";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game= searchParams.get("query");
    const initialUrl=`https://api.rawg.io/api/games?key=1c7734cdf2454917a6676784758c8c78&search=${game}`;
    const {data,loading,error,updateUrl}=Fetch(initialUrl)

    useEffect(()=>{
        updateUrl(initialUrl);
    },[initialUrl,updateUrl]);

    return (
        <div>
            <h1 className="text-7xl text-center my-20">Risultati per: {game.toUpperCase()}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-20 ">
                 {data && data.results.map((game)=><CardGame key={game.id} game={game}/>)}
            </div>
           
        </div>
    )
}