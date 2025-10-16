import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

export default function GenresDropdown() {
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null);

  const initialUrl =
    "https://api.rawg.io/api/genres?key=1c7734cdf2454917a6676784758c8c78";

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Chiudi dropdown se clicchi fuori
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        detailsRef.current.removeAttribute("open");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Funzione per chiudere al click su un link
  const handleLinkClick = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  return (
    <details className="dropdown-end lg:dropdown-start" ref={detailsRef}>
      <summary className="list-none cursor-pointer">Categorie</summary>
      <ul className="p-2 shadow dropdown-content z-10 w-52 rounded-box bgp max-h-60 overflow-y-scroll">
        {error && <p>{error}</p>}
        {genres &&
          genres.results.map((genre) => (
            <li className="dropdown-item" key={genre.id}>
              <Link
                className="linkhover my-1"
                onClick={handleLinkClick}
                to={`/games/${genre.slug}`}
              >
                {genre.name} 
              </Link>
            </li>
          ))}
      </ul>
    </details>
  );
}
