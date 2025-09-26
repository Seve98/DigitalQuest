import { use } from "react";
import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
export default function HomePage(){
    const[data,setData]=useState(null);
    const[error,setError]=useState(null);

    const initialUrl='https://api.rawg.io/api/games?key=1c7734cdf2454917a6676784758c8c78&dates=2024-01-01,2024-12-31&page=1';
    const load=async()=>{
        try{
            const response=await fetch(initialUrl);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const json=await response.json();
            setData(json);
        }catch(error){
            setError(error.message);
            setData(null);
        }
    }
    useEffect(()=>{
        load();
    },[])


    return(
        <>
            <h1 className="text-3xl text-center mb-20 ">Tutti i giochi</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-10">
                {error && <p>{error}</p>}
                {
                    data && data.results.map((game)=><CardGame key={game.id} game={game}/>)
                }
            </div>
        </>
    )
}