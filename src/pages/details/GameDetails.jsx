import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function GameDetails() {
    const{id}=useParams();
    const[data,setData]=useState(null);
    const[error,setError]=useState(null);

    const initialUrl=`https://api.rawg.io/api/games/${id}?key=1c7734cdf2454917a6676784758c8c78`;

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
    },[id])

    return (
        <>
        <h1 className="text-3xl text-center mb-20">Dettagli di {data.name}</h1>
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
        
        </>
        
    )
}