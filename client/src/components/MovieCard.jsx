// // import React, { useEffect, useState } from "react";
// // import { searchMovie } from "../api/tmdb";
// // import "../styles/MovieCard.css";

// // export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
// //     const [results, setResults] = useState([]);
// //     const [selected, setSelected] = useState(null);

// //     useEffect(() => {
// //         let ignore = false;
// //         async function run() {
// //             const nombreVideo = await searchMovie(titulo, ano);
// //             console.log("MovieCard->run()->searchMovie()->Resultados de búsqueda:", nombreVideo);
// //             console.log("MovieCard->run()->searchMovie()-Cantidad de resultados:", nombreVideo.length);

// //             if (ignore) return;
// //             if (nombreVideo) {
// //                 setResults(nombreVideo);
// //                 console.log("MovieCard->run()->searchMovie()->nombreVideo:", nombreVideo);
// //                 console.log("MovieCard->run()->searchMovie()->results length:", results.length);

// //                 if (nombreVideo.length > 1) {
// //                     // const match = nombreVideo.find((movie) => {
// //                     //     const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : null;
// //                     //     return releaseYear === ano;
// //                     // });
// //                     // setSelected(match || nombreVideo[0]);
// //                     setSelected(null); // Inicialmente no seleccionar ninguno si hay múltiples resultados
// //                     console.log("MovieCard->run()->searchMovie()->selected: (multiple results): null");
// //                 } else {
// //                     setSelected(nombreVideo[0]);
// //                     console.log("MovieCard->run()->searchMovie()->selected (single result):", nombreVideo[0]);
// //                 }
// //                 // setSelected(nombreVideo[0] || null);
// //                 console.log("MovieCard->run()->searchMovie()->selected:", selected);
// //             }
// //         }
// //         run();
// //         return () => {
// //             ignore = true;
// //         };
// //     }, [titulo, ano]);


// //     useEffect(() => {
// //   console.log("Nuevo valor de selected:", selected);
// // }, [selected]);

// //     const poster = selected?.poster_path
// //         ? `https://image.tmdb.org/t/p/w300${selected.poster_path}`
// //         : null;


// // console.log("MovieCard->Cantidad Results:" + results.length);
// // console.log("results:", results);
// // console.log("MovieCard->Selected:", selected);

// //     return (
// //         <div className="custom-card">
// //             <div className="poster-container">
// //                 {poster ? (
// //                     <img
// //                         src={poster}
// //                         alt={selected?.title || titulo}
// //                         className="poster-img"
// //                     />
// //                 ) : (
// //                     <div className="poster-placeholder">Sin poster</div>
// //                 )}

// //                 {/* Overlay con botones */}
// //                 <div className="overlay">
// //                     <button
// //                         type="button"
// //                         onClick={() => onPlay(fileName)}
// //                         className="btn-play"
// //                     >
// //                         ▶ Reproducir
// //                     </button>
// //                     <button
// //                         type="button"
// //                         onClick={() => onInfo(selected)}
// //                         className="btn btn-outline-info"
// //                     >
// //                         ℹ Info
// //                     </button>
// //                 </div>
// // {console.log("MovieCard->render()->results:", results)}
// // {console.log("MovieCard->render()->selected:", selected)}
// //                 {results.length > 1 && (
// //                     <select
// //                         aria-label="Elegir película"
// //                         value={selected?.id || ""}
// //                         onChange={(e) => setSelected(results.find((x) => x.id === Number(e.target.value)) || null)}
// //                         style={{ marginTop: 8, padding: 6, borderRadius: 8, border: "1px solid #ccc", width: "-webkit-fill-available" }}
// //                         className="form-select "
// //                     >
// //                         {results.map((r) => (
// //                             <option key={r.id} value={r.id}>
// //                                 {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
// //                             </option>
// //                         ))}
// //                     </select>
// //                 )}
// //             </div>

// //             <div className="card-details text-capitalize">
// //                 <strong className="card-title text-primary">
// //                     {selected?.title || titulo}
// //                 </strong>
// //                 <small className="card-year">
// //                     {ano || selected?.release_date?.slice(0, 4) || "N/A"}
// //                 </small>
// //             </div>
// //         </div>
// //     );
// // }


// import React, { useEffect, useState } from "react";
// import { searchMovie } from "../api/tmdb";
// import "../styles/MovieCard.css";

// export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
//     const [results, setResults] = useState([]);
//     const [selected, setSelected] = useState(null);

//     // Buscar película cuando cambian titulo o año
//     useEffect(() => {
//         let ignore = false;
//         async function run() {
//             const nombreVideo = await searchMovie(titulo, ano);
//             if (ignore) return;

//             // if (Array.isArray(nombreVideo) && nombreVideo.length > 0) {
//             //     setResults(nombreVideo);
//             //     setSelected(nombreVideo[0]); // Siempre iniciar con el primer resultado
//             // } else {
//             //     setResults([]);
//             //     setSelected(null);
//             // }
//             if (Array.isArray(nombreVideo) && nombreVideo.length > 0) {
//                 setResults(nombreVideo);
//                 setSelected((prev) => prev ?? nombreVideo[0]); // Solo si estaba en null
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

//     // Log para depuración cuando cambie selected
//     useEffect(() => {
//         console.log("Nuevo valor de selected:", selected);
//     }, [selected]);

//     const poster = selected?.poster_path
//         ? `https://image.tmdb.org/t/p/w300${selected.poster_path}`
//         : null;

//     // console.log("MovieCard->Cantidad Results:", results.length);
//     // console.log("MovieCard->Results:", results);
//     // console.log("MovieCard->Selected:", selected);

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
//                         className="btn-play"
//                     >
//                         ▶ Reproducir
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => onInfo(selected)}
//                         className="btn btn-outline-info"
//                     >
//                         ℹ Info
//                     </button>
//                 </div>

//                 {/* Selector cuando hay múltiples resultados */}
//                 {results.length > 1 && (
//                     <select
//                         aria-label="Elegir película"
//                         value={selected?.id || ""}
//                         onChange={(e) =>
//                             setSelected(
//                                 results.find((x) => x.id === Number(e.target.value)) || null
//                             )
//                         }
//                         style={{
//                             marginTop: 8,
//                             padding: 6,
//                             borderRadius: 8,
//                             border: "1px solid #ccc",
//                             width: "-webkit-fill-available",
//                         }}
//                         className="form-select"
//                     >
//                         {results.map((r) => (
//                             <option key={r.id} value={r.id}>
//                                 {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
//                             </option>
//                         ))}
//                     </select>
//                 )}
//             </div>

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
import "../styles/MovieCard.css";

export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function run() {
            const nombreVideo = await searchMovie(titulo, ano);
            if (ignore) return;

            if (Array.isArray(nombreVideo) && nombreVideo.length > 0) {
                setResults(nombreVideo);

                // Seleccionar automáticamente SOLO si hay un resultado.
                if (nombreVideo.length === 1) {
                    setSelected(nombreVideo[0]);
                } else {
                    // setSelected(null); // esperar a que el usuario elija.
                    setSelected(nombreVideo[0])// Seleccionar el primero por defecto.
                }
            } else {
                setResults([]);
                setSelected(null);
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

    console.log("MovieCard -> Results:", results);
    console.log("MovieCard -> Selected:", selected);

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
                        onClick={() => onPlay(fileName)}
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

                {/* Selector cuando hay múltiples resultados */}
                {/* {results.length > 1 && (
                    <select
                        aria-label="Elegir película"
                        value={selected?.id || ""}
                        onChange={(e) =>
                            setSelected(
                                results.find((x) => x.id === Number(e.target.value)) || null
                            )
                        }
                        style={{
                            marginTop: 8,
                            padding: 6,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "-webkit-fill-available",
                        }}
                        className="form-select"
                    >
                        <option value="">Selecciona una película</option>
                        {results.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
                            </option>
                        ))}
                    </select>
                )} */}
            </div>
            {results.length > 1 && (
                    <select
                        aria-label="Elegir película"
                        value={selected?.id || ""}
                        onChange={(e) =>
                            setSelected(
                                results.find((x) => x.id === Number(e.target.value)) || null
                            )
                        }
                        style={{
                            marginTop: 8,
                            padding: 6,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            width: "90%",
                            margin: "10px auto"
                        }}
                        className="form-select"
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
                    {selected?.title || titulo}
                </strong>
                <small className="card-year">
                    {ano || selected?.release_date?.slice(0, 4) || "N/A"}
                </small>
            </div>
        </div>
    );
}
