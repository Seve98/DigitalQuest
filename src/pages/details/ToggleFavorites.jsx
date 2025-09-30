import { useContext } from "react";

import FavoritesContext from "../../context/FavoritesContext";

export default function ToggleFavorites({data}){
  const{favorites,addFavorites,removeFavorite}=useContext(FavoritesContext);

  const isFavorite=()=>favorites.find((el)=>+el.game_id===+data?.id);
    return (
    <div>
            {isFavorite()?(
                <button className="btn btn-custom" onClick={()=>removeFavorite(data.id)}>Rimuovi dai preferiti</button> ):(
                <button className="btn btn-custom" onClick={()=>addFavorites(data)}>Aggiungi ai preferiti</button>
            )}
    </div>
   )
}