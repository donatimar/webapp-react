import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams(); // ID film
  const [movie, setMovie] = useState(null); // State per i dettagli del film
  const [reviews, setReviews] = useState([]); // State per le recensioni
  const [loading, setLoading] = useState(true); // State per il caricamento della pagina
  const [error, setError] = useState(null); // State per eventuali errori

  // Fetch per dettagli del film e recensioni
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data.movie);
        setReviews(data.reviews);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Gestione del caricamento
  if (loading) {
    return <div>Loading</div>;
  }

  // Gestione degli errori
  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="container py-5">
      <h1>{movie.title}</h1>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Release Year:</strong> {movie.release_year}
      </p>
      <p>
        <strong>Abstract:</strong> {movie.abstract}
      </p>

      <h3>Reeviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.name}:</strong> {review.text} <br />
              <strong>Voto:</strong> {review.vote}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
