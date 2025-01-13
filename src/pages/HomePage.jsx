import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]); // State per salvataggio dei film
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
        setMovies(data); // Salva i film nello State
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Salva l'errore nello State
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Caricamento in corso</div>;
  }

  if (error) {
    return <div>Errore {error}</div>;
  }

  return (
    <div className="container py-5">
      <h1>Lista dei film</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_year}) - Genre:{" "}
            {movie.genre ? movie.genre : "Genere non disponibile"}
          </li>
        ))}
      </ul>
    </div>
  );
}
