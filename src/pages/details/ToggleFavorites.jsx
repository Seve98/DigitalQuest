import { useContext } from "react";

import FavoritesContext from "../../context/FavoritesContext";

export default function ToggleFavorites({data}){
  const{favorites,addFavorites,removeFavorite}=useContext(FavoritesContext);

  const isFavorite=()=>favorites.find((el)=>+el.game_id===+data?.id);
    return (
    <div>
            {isFavorite()?(
                <button className="btn btn-custom" onClick={()=>removeFavorite(data.id)}><i className="fa-solid fa-heart"></i> Rimuovi dai preferiti </button> ):(
                <button className="btn btn-custom" onClick={()=>addFavorites(data)}><i className="fa-regular fa-heart"></i> Aggiungi ai preferiti</button>
            )}
    </div>
   )
}