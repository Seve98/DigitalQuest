import { useContext } from "react";

import FavoritesContext from "../../context/FavoritesContext";
import SessionContext from "../../context/SessionContext";
import CardGame from "../../components/CardGame";

const favoriteGameUI ={
display:"flex",
justifyContent:"space-between",
alignItems:"center",    
};
export default function Profile() {
    const{session}=useContext(SessionContext);
    const{favorites,removeFavorite}=useContext(FavoritesContext);

    return (
        <>
        <div>
            <h1 className="text-3xl text-center">Il tuo Profilo</h1>
            
            <p className="text-center">Benvenuto {session?.user.user_metadata.first_name}</p>
            <p className="text-center">Email: {session?.user.email}</p>
        </div>
        <div>
            <h1 className="text-3xl text-center my-20">I tuoi giochi preferiti</h1>
            <div>
                {favorites.length==0&&<p className="text-center">Non hai giochi preferiti</p>}
             <ul>
                {favorites.map((game)=>(
                    <li key={game.id} style={favoriteGameUI}>
                        <div>
                            <img className="img-fluid" width={300} src={game.game_image} alt="" />
                            <p className=" text-center  ">{game.game_name}</p>
                        </div>
                            <button className="btn btn-custom" onClick={()=>removeFavorite(game.game_id)}>Rimuovi dai preferiti</button>
                     </li>
                ))}
                </ul>   
            </div>
        </div>
        </>
    );
}