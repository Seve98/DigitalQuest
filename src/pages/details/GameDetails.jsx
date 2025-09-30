import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  Fetch  from "../../hook/useFetch";
import supabase from "../../supabase/supabase-client";
import ToggleFavorites from "./ToggleFavorites";
import Chatbox from "../../components/Chatbox";
export default function GameDetails() {
    const{id}=useParams();
  
    const initialUrl=`https://api.rawg.io/api/games/${id}?key=1c7734cdf2454917a6676784758c8c78`;
 const{data,loading,error,updateUrl}=Fetch(initialUrl)

    
    return (
        <>
        <h1 className="text-3xl text-center mb-20">Dettagli di {data&&data.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-20 gap-10">
            <div className="box-description p-10 rounded-4xl">
                <h1>{data&&data.name}</h1>
                <p className="my-5">Rating: {data&&data.rating}</p>
                <p className="my-2">Descrizione:</p>
                <p>{data&&data.description_raw}</p>
            </div>
            <div>
                <img className="rounded-4xl" src={data&&data.background_image} alt="" />
            </div>
        </div>
    <ToggleFavorites data={data}/>

    <div>
        <Chatbox data={data&&data}/>
    </div>
        </>
        
    )
}