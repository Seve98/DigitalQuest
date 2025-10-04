import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
export default function CardGame({game}){
    const genres= game.genres.map((genre)=>genre.name).join(", ");
    const {background_image:image} = game;
    
    return(
     <article data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" key={game.id} className="card w-96 h-120 shadow-sm">
  <figure>
   <LazyLoadGameImage  image={image}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title text-xl"><strong>{game.name}</strong></h2> 
    {game.rating<1 && <p>Non valutato</p>}
      {game.rating>=1 &&
      <RatingStars value={game.rating} />}
      <p>{genres}</p>
       <p>Data di rilascio: {(game.released) && new Date(game.released).toLocaleDateString('it-IT')}</p>
     
    <div className="card-actions justify-center lg:mt-10  ">

        <Link className="btn btn-custom w-70 " to={`/games/${game.slug}/${game.id}`}>Dettagli</Link>
      
    </div>
  </div>
</article>
    )
}