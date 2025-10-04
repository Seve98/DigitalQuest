import { useContext } from "react";

import FavoritesContext from "../../context/FavoritesContext";
import SessionContext from "../../context/SessionContext";
import { Link } from "react-router-dom";

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
        <div className="my-20">
            <h1 className="text-5xl text-center my-10">Il tuo Profilo</h1>
            
            <p className="text-center text-3xl ">Benvenuto {session?.user.user_metadata.first_name}</p>
            <p className="text-center">Email: {session?.user.email}</p>
        </div>
        <div>
            <h1 className="text-5xl text-center my-20">I tuoi giochi</h1>
            <div>
                {favorites.length==0&&<p className="text-center">Non hai giochi preferiti</p>}
             <ul>
                {favorites.map((game)=>(
                    <li key={game.id} style={favoriteGameUI} className="border my-10 bgp  opacity-80 py-5  lg:p-5">
                        <div className="lg:flex">
                            <img className="img-fluid mx-auto" width={300} src={game.game_image} alt="" />
                            <div className="lg:ms-10 text-center lg:text-start">
                            <h2 className=" text-center text-2xl">{game.game_name}</h2>
                            <p className="lg:mt-5 mt-2 dashdesc" dangerouslySetInnerHTML={{ __html: game.game_description }} />
                            <Link className="link" to="details">Mostra di più</Link>
                            </div>
                            <button className="btn btn-custom mx-20 mt-5 lg:mx-0 lg:ms-10 lg:my-auto" onClick={()=>removeFavorite(game.game_id)}>Rimuovi dai preferiti</button>
                        </div>
                            
                     </li>
                ))}
                </ul>   
            </div>
        </div>
        </>
    );
}