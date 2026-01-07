// import React, { useEffect, useState } from "react";
// import { searchMovie } from "../api/tmdb";
// import "../styles/MovieCard.css";

// export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
//     const [results, setResults] = useState([]);
//     const [selected, setSelected] = useState(null);

//     useEffect(() => {
//         let ignore = false;
//         async function run() {
//             const nombreVideo = await searchMovie(titulo, ano);
//             if (ignore) return;

//             if (Array.isArray(nombreVideo) && nombreVideo.length > 0) {
//                 setResults(nombreVideo);

//                 // Seleccionar automáticamente SOLO si hay un resultado.
//                 if (nombreVideo.length === 1) {
//                     setSelected(nombreVideo[0]);
//                 } else {
//                     // setSelected(null); // esperar a que el usuario elija.
//                     setSelected(nombreVideo[0])// Seleccionar el primero por defecto.
//                 }
//             } else {
//                 setResults([]);
//                 setSelected(null);
//             }
//         }
//         run();
//         return () => {
//             ignore = true;
//         };
//     }, [titulo, ano]);

//     const poster = selected?.poster_path
//         ? `https://image.tmdb.org/t/p/original/${selected.poster_path}`
//         : null;

//     console.log("MovieCard -> Results:", results);
//     console.log("MovieCard -> Selected:", selected);

//     return (
//         <div className="custom-card">
//             <div className="poster-container">
//                 {poster ? (
//                     <img
//                         src={poster}
//                         alt={selected?.title || titulo}
//                         className="poster-img"
//                     />
//                 ) : (
//                     <div className="poster-placeholder">Sin poster</div>
//                 )}

//                 {/* Overlay con botones */}
//                 <div className="overlay">
//                     <button
//                         type="button"
//                         onClick={() => onPlay(fileName)}
//                         className="btn-play rounded-pill"
//                     >
//                         ▶ Reproducir
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => onInfo(selected)}
//                         className="btn rounded-pill btn-outline-info"
//                     >
//                         ℹ Info
//                     </button>
//                 </div>

//             </div>
//                 {/* Selector cuando hay múltiples resultados */}
//             {results.length > 1 && (
//                     <select
//                         aria-label="Elegir película"
//                         value={selected?.id || ""}
//                         onChange={(e) =>
//                             setSelected(
//                                 results.find((x) => x.id === Number(e.target.value)) || null
//                             )
//                         }
//                         style={{
//                             marginTop: 2,
//                             padding: 4,
//                             borderRadius: 8,
//                             width: "90%",
//                             margin: "1px auto"
//                         }}
//                         className="form-select"
//                     >
//                         <option value="">Selecciona una película</option>
//                         {results.map((r) => (
//                             <option key={r.id} value={r.id}>
//                                 {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
//                             </option>
//                         ))}
//                     </select>
//                 )}

//             <div className="card-details text-capitalize">
//                 <strong className="card-title text-primary">
//                     {selected?.title || titulo}
//                 </strong>
//                 <small className="card-year">
//                     {ano || selected?.release_date?.slice(0, 4) || "N/A"}
//                 </small>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { searchMovie } from "../api/tmdb";
import Spinner from 'react-bootstrap/Spinner'; // Importante
import "../styles/MovieCard.css";

export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    
    // NUEVOS ESTADOS
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
                    // Si no hay póster y ya no estamos cargando datos, mostrar placeholder
                    !cargandoDatos && <div className="poster-placeholder">Sin poster</div>
                )}

                {/* Overlay con botones (Solo se muestra si no está cargando datos) */}
                {!cargandoDatos && (
                    <div className="overlay">
                        <button onClick={() => onPlay(fileName)} className="btn-play rounded-pill">
                            ▶ Reproducir
                        </button>
                        <button onClick={() => onInfo(selected)} className="btn rounded-pill btn-outline-info">
                            ℹ Info
                        </button>
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