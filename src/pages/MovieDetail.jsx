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
    return <div className="text-center">Loading...</div>;
  }

  // Gestione degli errori
  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Immagine */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm w-100">
            <img
              src={`http://localhost:3000/images/${movie.image}`}
              alt={movie.title}
              className="card-img-top img-fluid"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            />
          </div>
        </div>

        {/* Informazioni film */}
        <div className="col-md-8">
          <div className="card mb-4 shadow-sm w-100">
            <div className="card-body">
              <h1 className="card-title">{movie.title}</h1>
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
            </div>
          </div>

          {/* Recensioni */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Reviews</h3>
              {reviews.length === 0 ? (
                <p>No reviews</p>
              ) : (
                <ul className="list-group">
                  {reviews.map((review) => (
                    <li className="list-group-item" key={review.id}>
                      <strong>{review.name}:</strong> {review.text} <br />
                      <strong>Rating:</strong> {review.vote}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
