import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router-dom";
export default function CardGame({game}){
    const genres= game.genres.map((genre)=>genre.name).join(", ");
    const {background_image:image} = game;
    return(
     <article key={game.id} className="card w-96 shadow-sm">
  <figure>
   <LazyLoadGameImage image={image}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title"><strong>{game.name}</strong></h2> 
      <p className="text-">{genres}</p>
       <p>{game.released}</p>
    <div className="card-actions justify-start">

        <Link to={`/games/${game.slug}/${game.id}`}>Dettagli</Link>
      
    </div>
  </div>
</article>
    )
}