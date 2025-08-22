import React, { useEffect, useState } from "react";
import { searchMovie } from "../api/tmdb";
import "../styles/MovieCard.css";

export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function run() {
            const nombreVideo = await searchMovie(titulo, ano);
            if (ignore) return;
            if (nombreVideo) {
                setResults([nombreVideo]);
                setSelected(nombreVideo[0] || null);
            }
        }
        run();
        return () => {
            ignore = true;
        };
    }, [titulo, ano]);

    const poster = selected?.poster_path
        ? `https://image.tmdb.org/t/p/w300${selected.poster_path}`
        : null;

    return (
        <div className="custom-card">
            <div className="poster-container">
                {poster ? (
                    <img
                        src={poster}
                        alt={selected?.title || titulo}
                        className="poster-img"
                    />
                ) : (
                    <div className="poster-placeholder">Sin poster</div>
                )}

                {/* Overlay con botones */}
                <div className="overlay">
                    <button
                        type="button"
                        onClick={onPlay}
                        className="btn-play"
                    >
                        ▶ Reproducir
                    </button>
                    <button
                        type="button"
                        onClick={() => onInfo(selected)}
                        className="btn btn-outline-info"
                    >
                        ℹ Info
                    </button>
                </div>

                {results.length > 1 && (
                    <select
                        aria-label="Elegir película"
                        value={selected?.id || ""}
                        onChange={(e) => setSelected(results.find((x) => x.id === Number(e.target.value)) || null)}
                        style={{ marginTop: 8, padding: 6, borderRadius: 8, border: "1px solid #ccc", width: "-webkit-fill-available" }}
                        className="form-select "
                    >
                        {results.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="card-details text-capitalize">
                <strong className="card-title text-primary">
                    {selected?.title || titulo}
                </strong>
                <small className="card-year text-info">
                    {ano || selected?.release_date?.slice(0, 4) || "N/A"}
                </small>
            </div>
        </div>
    );
}
