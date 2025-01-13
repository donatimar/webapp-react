import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]); // State per il salvataggio dei film
  const [loading, setLoading] = useState(true); // State per il caricamento della pagina
  const [error, setError] = useState(null); // State per eventuali errori

  useEffect(() => {
    // Fetch all'API Express
    fetch("http://localhost:3000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h1>FILM LIST</h1>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <div className="card mb-4 shadow-sm">
              {/* Usa l'immagine dal campo `image` del film */}
              <img
                src={`http://localhost:3000/images/${movie.image}`} // Carica l'immagine usando il nome del file
                alt={movie.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  <strong>Release Year:</strong> {movie.release_year}
                  <br />
                  <strong>Genre:</strong>{" "}
                  {movie.genre || "Genere non disponibile"}
                </p>
                <Link
                  to={`/moviedetail/${movie.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
