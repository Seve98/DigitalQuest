import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  Fetch  from "../../hook/useFetch";
import supabase from "../../supabase/supabase-client";
import ToggleFavorites from "./ToggleFavorites";
import Chatbox from "../../components/Chatbox";
import BasicRating from "../../components/RatingStars";
import RatingStars from "../../components/RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
export default function GameDetails() {
    const{id}=useParams();
  
    const initialUrl=`https://api.rawg.io/api/games/${id}?key=1c7734cdf2454917a6676784758c8c78`;
 const{data,loading,error,updateUrl}=Fetch(initialUrl)
 const [showChat, setShowChat] = useState(false);

    
    return (
        <>
        <h1 className="lg:text-7xl text-2xl text-center my-20">Dettagli di: {data&&data.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:mx-20 mx-5 gap-10">
            <div>
                <img className="rounded-4xl" src={data&&data.background_image} alt="" />
            </div>
            <div className="box-description p-5 rounded">
                <h1 className="text-4xl mb-10" >{data&&data.name}</h1>
             
                <div className="my-5">
                <p>Valutazione:</p> 
                <RatingStars value={data && data.rating} />
                </div>
                <p>Categoria: {data&&data.genres[0].name}</p>
                <p className="my-2">Descrizione:</p>
                <p>{data&&data.description_raw}</p>
                <div className="mt-5 flex">
                  <ToggleFavorites data={data}/>  
                      <div className="text-start">
        <button className="btn btn-custom ms-5"
          onClick={() => setShowChat((prev) => !prev)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon={faComment}
            size="xl"
           flip="horizontal"
            style={{ color: showChat ? "#fff" : "#fff" }}
            
          />
        
        </button>
      </div>

                </div>
            </div>
        </div>


      {/* 🔹 Mostra chat solo se showChat è true */}
      {showChat && (
        <div className="fixed top-0 right-0 h-full w-96 bgp shadow-2xl p-4">
          <Chatbox data={data} setShowChat={setShowChat} />
        </div>
      )}
        </>
        
    )
}