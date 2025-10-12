// import React from "react";

// export default function MovieInfoModal({ video, onClose }) {
//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0,0,0,0.8)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 1000,
//             }}
//         >
//             <div
//                 style={{
//                     background: "#fff",
//                     padding: "2rem",
//                     borderRadius: "10px",
//                     width: "600px",
//                     maxHeight: "80vh",
//                     overflowY: "auto",
//                 }}
//             >
//                 <h2>{video.title}</h2>
//                 {video.poster_path && (
//                     <img
//                         src={`https://image.tmdb.org/t/p/w300${video.poster_path}`}
//                         alt={video.title}
//                         style={{ display: "block", margin: "1rem auto" }}
//                     />
//                 )}
//                 <p><strong>Año:</strong> {video.release_date?.split("-")[0]}</p>
//                 <p>{video.overview}</p>
//                 {video.videos?.results?.length > 0 && (
//                     <a
//                         href={`https://www.youtube.com/watch?v=${video.videos.results[0].key}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ display: "block", marginTop: "1rem", color: "blue" }}
//                     >
//                         🎬 Ver tráiler
//                     </a>
//                 )}
//                 <button onClick={onClose} style={{ marginTop: "1rem" }}>Cerrar</button>
//             </div>
//         </div>
//     );
// }


// import React from "react";


// export default function MovieInfoModal({ movie, onClose }) {
//     const year = movie?.release_date?.slice(0, 4) || "";
//     const yt = movie?.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");
//     const trailerUrl = yt ? `https://www.youtube.com/watch?v=${yt.key}` : null;


//     return (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
//             <div style={{ width: "min(800px, 92vw)", background: "#fff", borderRadius: 12, padding: 16, maxHeight: "90vh", overflow: "auto" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
//                     <h2 style={{ margin: 0 }}>{movie.title} {year && <span style={{ color: "#666", fontWeight: 400 }}>({year})</span>}</h2>
//                     <button type="button" onClick={onClose} style={{ border: 0, background: "#ef4444", color: "#fff", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>Cerrar</button>
//                 </div>


//                 {movie.poster_path && (
//                     <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: 200, borderRadius: 8, marginTop: 12 }} />
//                 )}


//                 <p style={{ marginTop: 12, lineHeight: 1.45 }}>{movie.overview || "Sin descripción."}</p>


//                 {trailerUrl && (
//                     <div style={{ marginTop: 12 }}>
//                         <a href={trailerUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#dc2626", textDecoration: "none", fontWeight: 600 }}>
//                             🎬 Ver tráiler en YouTube
//                         </a>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


import React from "react";
import "../styles/ModalInfo.css";

export default function MovieInfoModal({ movie, onClose }) {
  const year = movie?.release_date?.slice(0, 4) || "";
  const yt = movie?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const trailerUrl = yt ? `https://www.youtube.com/watch?v=${yt.key}` : null;

  //Imagen de fondo (backdrop) si existe.
  const backdropUrl = movie?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`
    : "none";

  return (
    <div className="modal-container">
      <button
        type="button"
        onClick={onClose}
        className="btn-Cerrar btn btn-outline-danger btn-xs rounded-pill"
      >
        Cerrar
      </button>
      <div className="d-grid titulo-info-container"
        style={{
          backgroundImage: backdropUrl,
          backgroundSize: "cover",
          backgroundPosition: "left upper",
          backgroundRepeat: "no-repeat",
          backdropFilter: "blur(8px) brightness(0.4)",
        }}>
        {movie.poster_path && (
          <div className="poster-titulo-info">
            <img
              className="img-poster-movie-info"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="titulo-trailer">
            {trailerUrl && (           
                <a
                  className="info-trailer-link"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🎬 ver trailer
                </a>             
            )}
          </div>
          </div>
        )}
        <div className="d-flex titulo-info-container">
          {/* <div className="titulo-trailer">
            {trailerUrl && (           
                <a
                  className="info-trailer-link"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🎬 ver trailer
                </a>             
            )}
          </div> */}
  
            <h2 className="titulo-nombre">
              {movie.title}{" "}
              {year && (
                <span className="titulo-year">({year})</span>
              )}

            </h2>
          <div className="titulo-duracion-rating">
            {movie.vote_average && (
              <div className="rating-movie-info">
                <span>⭐ {movie.vote_average} / 10</span>
              </div>
            )}
            {movie.runtime && (
              <div className="duration-movie-info">
                <span>⏱ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              </div>
            )}
          </div>



          <p style={{ marginTop: 12, lineHeight: 1.45 }}>
            {movie.overview || "Sin descripción."}
          </p>

          {movie.genres?.length > 0 && (
            <p style={{ marginTop: 2 }}>
              <strong>Géneros:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}

          {movie.credits?.cast?.length > 0 && (
            <p style={{ marginTop: 2 }}>
              <strong>Reparto:</strong>{" "}
              {movie.credits.cast
                .slice(0, 6)
                .map((c) => c.name)
                .join(", ")}
            </p>
          )}

          {movie.credits?.crew?.length > 0 && (
            <p style={{ marginTop: 2 }}>
              <strong>Director:</strong>{" "}
              {movie.credits.crew
                .filter((c) => c.job === "Director")
                .map((c) => c.name)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
