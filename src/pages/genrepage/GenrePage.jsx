import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import { useParams } from "react-router";
import Fetch from "../../hook/useFetch";

export default function GenrePage() {
    const {genre} = useParams();
    
    const initialUrl=`https://api.rawg.io/api/games?key=1c7734cdf2454917a6676784758c8c78&genres=${genre}&page=1`;
const{data,loading,error,updateUrl}=Fetch(initialUrl)
   
    return (
        <>
        <h2 className="text-3xl text-center mb-20"> <strong>{genre.toUpperCase()}</strong> </h2>
        <div className="grid grid-cols-3 gap-20 justify-items-center">
            {error && <p>{error}</p>}
            {
                data && data.results.map((game)=><CardGame key={game.id} game={game}/>)
            }
        </div>
        </>
    );
}