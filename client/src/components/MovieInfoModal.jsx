import React from "react";

export default function MovieInfoModal({ movie, onClose }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "10px",
                    width: "600px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <h2>{movie.title}</h2>
                {movie.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        style={{ display: "block", margin: "1rem auto" }}
                    />
                )}
                <p><strong>Año:</strong> {movie.release_date?.split("-")[0]}</p>
                <p>{movie.overview}</p>
                {movie.videos?.results?.length > 0 && (
                    <a
                        href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "block", marginTop: "1rem", color: "blue" }}
                    >
                        🎬 Ver tráiler
                    </a>
                )}
                <button onClick={onClose} style={{ marginTop: "1rem" }}>Cerrar</button>
            </div>
        </div>
    );
}
