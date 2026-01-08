
import React, { useEffect, useState } from "react";
import { searchMovie } from "../api/tmdb";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/MovieCard.css";

export default function MovieCard({ titulo, ano, fileName, busqueda, onPlay, onInfo }) {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [cargandoImagen, setCargandoImagen] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function run() {
            setCargandoDatos(true); // Empezar a cargar
            const nombreVideo = await searchMovie(titulo, ano);

            if (ignore) return;

            if (Array.isArray(nombreVideo) && nombreVideo.length > 0) {
                setResults(nombreVideo);
                setSelected(nombreVideo[0]);
            } else {
                setResults([]);
                setSelected(null);
            }
            setCargandoDatos(false); // Terminar carga de datos
        }
        run();
        return () => { ignore = true; };
    }, [titulo, ano]);


    // FUNCIÓN ECMA6 PARA NORMALIZAR TEXTO (Quita tildes y mayúsculas)
    const normalizar = (texto) =>
        texto ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

    const terminoLimpio = normalizar(busqueda);
    const tituloArchivo = normalizar(titulo);
    const tituloTMDB = normalizar(selected?.title || "");

    // DETERMINAR SI SE MUESTRA
    // Si no hay búsqueda, mostramos siempre. Si hay, comparamos.
    const debeMostrarse = !busqueda ||
        tituloArchivo.includes(terminoLimpio) ||
        tituloTMDB.includes(terminoLimpio);

    // Si no debe mostrarse, retornamos null para que no ocupe espacio
    if (!debeMostrarse) return null;

    const poster = selected?.poster_path
        ? `https://image.tmdb.org/t/p/original/${selected.poster_path}`
        : null;

    return (
        <div className="custom-card">
            <div className="poster-container" style={{ minHeight: '250px', position: 'relative' }}>

                {/* 1. SPINNER DE DATOS O IMAGEN */}
                {(cargandoDatos || (poster && cargandoImagen)) && (
                    <div className="spinner-overlay">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}

                {/* 2. LOGICA DE POSTER */}
                {poster ? (
                    <img
                        src={poster}
                        alt={selected?.title || titulo}
                        className={`poster-img ${cargandoImagen ? 'd-none' : 'd-block'}`}
                        onLoad={() => setCargandoImagen(false)}
                    />
                ) : (
                    // Si no hay póster y ya no se está cargando datos, mostrar placeholder
                    !cargandoDatos && <div className="poster-placeholder">Sin poster</div>
                )}

                {/* Overlay con botones (Solo se muestra si no está cargando datos) */}
                {!cargandoDatos && (
                    <div className="overlay"
                        onClick={() => onInfo(selected)}>
                        <button onClick={() => onPlay(fileName)} className="btn-play rounded-pill">
                            ▶ Reproducir
                        </button>
                        {/* <button onClick={() => onInfo(selected)} className="btn rounded-pill btn-outline-info">
                            ℹ Info
                        </button> */}
                    </div>
                )}
            </div>

            {/* Selector de resultados */}
            {results.length > 1 && (
                <select
                    className="form-select mt-1"
                    value={selected?.id || ""}
                    onChange={(e) => {
                        const movie = results.find((x) => x.id === Number(e.target.value));
                        setSelected(movie);
                        setCargandoImagen(true); // Resetear carga de imagen al cambiar selección
                    }}
                >
                    <option value="">Selecciona una película</option>
                    {results.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
                        </option>
                    ))}
                </select>
            )}

            <div className="card-details text-capitalize">
                <strong className="card-title text-primary">
                    {cargandoDatos ? "Buscando..." : (selected?.title || titulo)}
                </strong>
                <small className="card-year">
                    {ano || selected?.release_date?.slice(0, 4) || "N/A"}
                </small>
            </div>
        </div>
    );
}