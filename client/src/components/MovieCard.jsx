// // // // // import React, { useEffect, useState } from "react";
// // // // // import { searchMovie } from "../api/tmdb";

// // // // // export default function MovieCard({ localTitle }) {
// // // // //   const [movie, setMovie] = useState(null);

// // // // //   useEffect(() => {
// // // // //     async function fetchData() {
// // // // //       const result = await searchMovie(localTitle);
// // // // //       setMovie(result);
// // // // //     }
// // // // //     fetchData();
// // // // //   }, [localTitle]);

// // // // //   if (!movie) return <p>Cargando {localTitle}...</p>;

// // // // //   return (
// // // // //     <div className="card mb-3" style={{ maxWidth: "540px" }}>
// // // // //       <div className="row g-0">
// // // // //         <div className="col-md-4">
// // // // //           {movie.poster_path && (
// // // // //             <img
// // // // //               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// // // // //               className="img-fluid rounded-start"
// // // // //               alt={movie.title}
// // // // //             />
// // // // //           )}
// // // // //         </div>
// // // // //         <div className="col-md-8">
// // // // //           <div className="card-body">
// // // // //             <h5 className="card-title">{movie.title}</h5>
// // // // //             <p className="card-text">{movie.overview}</p>
// // // // //             <p className="card-text">
// // // // //               <small className="text-muted">{movie.release_date}</small>
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useEffect, useState } from "react";
// // // // import { searchMovie } from "../api/tmdb";

// // // // export default function MovieCard({ titulo, ano }) {
// // // //   const [movie, setMovie] = useState(null);

// // // // // function limpiarNombreTitulo(localTitle) {
// // // // //   // 1. Expresión regular para encontrar el año.
// // // // //   // Buscamos 4 dígitos.
// // // // //   const regexAno = /\d{4}/;

// // // // //   // 2. Extraemos el año. El método .match() devuelve un array o null.
// // // // //   const anoEncontrado = localTitle.match(regexAno);
// // // // //   const ano = anoEncontrado ? anoEncontrado[0] : null;

// // // // //   // 3. Expresión regular para limpiar el texto y dejar solo el nombre.
// // // // //   // Buscamos los caracteres no deseados y el año.
// // // // //   // [.,;,\-]: busca uno de estos caracteres.
// // // // //   // \s*: busca cero o más espacios en blanco.
// // // // //   // \d{4}: busca 4 dígitos (el año).
// // // // //   // |: significa "o".
// // // // //   // g: es un "flag" que indica que debe encontrar todas las coincidencias.
// // // // //   const regexNombre = /[.,;,\-]\s*|\d{4}/g;

// // // // //   // 4. Reemplazamos las coincidencias con una cadena vacía para obtener el nombre.
// // // // //   let nombreLimpio = localTitle.replace(regexNombre, '');

// // // // //   // 5. Eliminamos los espacios en blanco al inicio y al final.
// // // // //   nombreLimpio = nombreLimpio.trim();

// // // // //   // 6. Retornamos un objeto con el nombre limpio y el año.
// // // // //   return {
// // // // //     nombre: nombreLimpio,
// // // // //     ano: ano
// // // // //   };
// // // // // }

// // // // // Ejemplo de uso
// // // // // const nombreSucio1 = "The Matrix,; - (1999)";
// // // // // const nombreLimpio1 = limpiarNombrePelicula(nombreSucio1);
// // // // // console.log(nombreLimpio1); // Salida: "The Matrix"

// // // // // const nombreSucio2 = "Interestellar. (2014)";
// // // // // const nombreLimpio2 = limpiarNombrePelicula(nombreSucio2);
// // // // // console.log(nombreLimpio2); // Salida: "Interestellar"



// // // // // function limpiarNombreTitulo(localTitle) {
// // // // //   // Si la entrada no es una cadena de texto, retornamos valores por defecto.
// // // // //   if (typeof localTitle !== 'string') {
// // // // //     return {
// // // // //       nombre: '',
// // // // //       ano: null
// // // // //     };
// // // // //   }

// // // // //   // El resto de tu lógica de limpieza
// // // // //   const regexAno = /\d{4}/;
// // // // //   const anoEncontrado = localTitle.match(regexAno);
// // // // //   const ano = anoEncontrado ? anoEncontrado[0] : null;

// // // // //   const regexNombre = /[.,;,\-]\s*|\d{4}/g;
// // // // //   let nombreLimpio = localTitle.replace(regexNombre, '');
// // // // //   nombreLimpio = nombreLimpio.trim();

// // // // //   return {
// // // // //     nombre: nombreLimpio,
// // // // //     ano: ano
// // // // //   };
// // // // // }

// // // // // const resultado = localTitle ? limpiarNombreTitulo(localTitle) : { nombre: '', ano: null };

// // // //   // useEffect(() => {
// // // //   //   async function fetchData() {
// // // //   //     const result = await searchMovie(resultado.nombre);
// // // //   //     setMovie(result);
// // // //   //   }
// // // //   //   fetchData();
// // // //   // }, [localTitle]);

// // // //   // if (!movie) return <p>Cargando {resultado.nombre}...</p>;

// // // //   return (
// // // //     <div className="card mb-3 bg-dark" style={{ maxWidth: "540px" }}>
// // // //       <div className="row g-0">
// // // //         <div className="col-md-4">
// // // //           {movie.poster_path && (
// // // //             <img
// // // //               src={`https://image.tmdb.org/t/p/w500${localTitle.poster_path}`}
// // // //               className="img-fluid rounded-start"
// // // //               alt={localTitle.title}
// // // //             />
// // // //           )}
// // // //         </div>
// // // //         <div className="col-md-8">
// // // //           <div className="card-body">
// // // //             <h5 className="card-title">{localTitle.title}</h5>
// // // //             <p className="card-text">{localTitle.overview}</p>
// // // //             <p className="card-text">
// // // //               <small className="text-muted">{localTitle.release_date}</small>
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // MovieCard.jsx

// // // import { useEffect, useState } from 'react';
// // // import { searchMovie } from '../api/tmdb'; // Asegúrate de que esta API está bien

// // // export default function MovieCard({ tituloLimpio, ano }) {
// // //     const [movie, setMovie] = useState(null);

// // //     useEffect(() => {
// // //         if (tituloLimpio) {
// // //             async function fetchData() {
// // //                 const result = await searchMovie(tituloLimpio);
// // //                 console.log("Resultado de búsqueda:", result);
// // //                 if (!result) {
// // //                     console.error("No se encontró la película:", tituloLimpio);
// // //                     return;
// // //                 }
// // //                 setMovie(result);
// // //             }
// // //             fetchData();
// // //         }
// // //     }, [tituloLimpio]);

// // //     if (!movie) {
// // //         return <p>Cargando {tituloLimpio}...</p>;
// // //     }

// // //     // Renderiza la información de la película aquí
// // //     return (
// // //         <div>
// // //             <h3>{movie.title}</h3>
// // //             <p>Año: {ano}</p>
// // //             <p>Puntaje: {movie.vote_average}</p>
// // //             <p>Votos: {movie.vote_count}</p>
// // //             {/* Otros datos de la película, como la imagen, etc. */}
// // //             <img
// // //                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// // //                 alt={movie.title}
// // //                 className="img-fluid rounded-start"
// // //             />
// // //             <p><small className="text-muted">Fecha de lanzamiento: {movie.release_date}</small></p>

// // //         </div>
// // //     );
// // // }



// // // import { useEffect, useState } from "react";
// // // import { searchMovie } from "../api/tmdb";

// // // export default function MovieCard({ tituloLimpio, ano, onPlay, onInfo }) {
// // //     const [movie, setMovie] = useState(null);

// // //     useEffect(() => {
// // //         if (tituloLimpio) {
// // //             async function fetchData() {
// // //                 const result = await searchMovie(tituloLimpio, ano);
// // //                 if (!result) {
// // //                     console.error("No se encontró la película:", tituloLimpio);
// // //                     return;
// // //                 }
// // //                 setMovie(result);
// // //             }
// // //             fetchData();
// // //         }
// // //     }, [tituloLimpio, ano]);

// // //     if (!movie) {
// // //         return <div className="p-4 border rounded-lg shadow bg-gray-50">Cargando {tituloLimpio}...</div>;
// // //     }

// // //     return (
// // //         <div className="p-4 border rounded-lg shadow bg-white flex flex-col">
// // //             <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
// // //             <img
// // //                 src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
// // //                 alt={movie.title}
// // //                 className="rounded mb-2"
// // //             />
// // //             <p className="text-sm text-gray-600">Año: {ano || movie.release_date?.split("-")[0]}</p>
// // //             <p className="text-sm">⭐ {movie.vote_average} ({movie.vote_count} votos)</p>
// // //             <p className="text-xs text-gray-500 mb-2">Lanzamiento: {movie.release_date}</p>

// // //             <div className="mt-auto flex gap-2">
// // //                 <button
// // //                     onClick={onPlay}
// // //                     className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
// // //                 >
// // //                     ▶ Reproducir
// // //                 </button>
// // //                 <button
// // //                     onClick={onInfo}
// // //                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// // //                 >
// // //                     ℹ Info
// // //                 </button>
// // //             </div>
// // //         </div>
// // //     );
// // // }


// // // import { useEffect, useState } from "react";
// // // import { searchMovie } from "../api/tmdb";

// // // export default function MovieCard({ tituloLimpio, ano, onPlay, onInfo }) {
// // //   const [results, setResults] = useState([]);
// // //   const [selectedMovie, setSelectedMovie] = useState(null);

// // //   useEffect(() => {
// // //     if (tituloLimpio) {
// // //       async function fetchData() {
// // //         const resultList = await searchMovie(tituloLimpio, ano);
// // //         if (!resultList || resultList.length === 0) {
// // //           console.error("No se encontró la película:", tituloLimpio);
// // //           return;
// // //         }
// // //         setResults(resultList);
// // //         setSelectedMovie(resultList[0]); // por defecto la primera
// // //       }
// // //       fetchData();
// // //     }
// // //   }, [tituloLimpio, ano]);

// // //   if (!selectedMovie) {
// // //     return (
// // //       <div className="p-4 border rounded-lg shadow bg-gray-50">
// // //         Cargando {tituloLimpio}...
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 border rounded-lg shadow bg-white flex flex-col">
// // //       <h3 className="font-bold text-lg mb-2">{selectedMovie.title}</h3>
// // //       {selectedMovie.poster_path && (
// // //         <img
// // //           src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
// // //           alt={selectedMovie.title}
// // //           className="rounded mb-2"
// // //         />
// // //       )}

// // //       <p className="text-sm text-gray-600">
// // //         Año: {ano || selectedMovie.release_date?.split("-")[0]}
// // //       </p>
// // //       <p className="text-sm">
// // //         ⭐ {selectedMovie.vote_average} ({selectedMovie.vote_count} votos)
// // //       </p>

// // //       {/* Si hay más de un resultado → permitir elegir */}
// // //       {results.length > 1 && (
// // //         <select
// // //           className="mt-2 p-1 border rounded"
// // //           value={selectedMovie.id}
// // //           onChange={(e) =>
// // //             setSelectedMovie(results.find((m) => m.id === Number(e.target.value)))
// // //           }
// // //         >
// // //           {results.map((m) => (
// // //             <option key={m.id} value={m.id}>
// // //               {m.title} ({m.release_date?.split("-")[0] || "N/A"})
// // //             </option>
// // //           ))}
// // //         </select>
// // //       )}

// // //       <div className="mt-auto flex gap-2 pt-2">
// // //         <button
// // //           onClick={onPlay}
// // //           className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
// // //         >
// // //           ▶ Reproducir
// // //         </button>
// // //         <button
// // //           onClick={() => onInfo(selectedMovie)}
// // //           className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// // //         >
// // //           ℹ Info
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { searchMovie } from "../api/tmdb";

// // export default function MovieCard({ tituloLimpio, ano, onPlay }) {
// //     const [results, setResults] = useState([]);
// //     const [selectedMovie, setSelectedMovie] = useState(null);

// //     useEffect(() => {
// //         if (tituloLimpio) {
// //             async function fetchData() {
// //                 console.log("Buscando película:", tituloLimpio, "Año:", ano);
// //                 const resultList = await searchMovie(tituloLimpio, ano);
// //                 console.log("Resultados de búsqueda:", resultList);

// //                 if (!resultList || resultList.length === 0) {
// //                     console.warn("No se encontró la película:", tituloLimpio);
// //                     return;
// //                 }
// //                 setResults(resultList);
// //                 setSelectedMovie(resultList[0]); // primera opción por defecto
// //             }
// //             fetchData();
// //         }
// //     }, [tituloLimpio, ano]);

// //     if (!selectedMovie) {
// //         console.log("Cargando película:", tituloLimpio);
// //         return (
// //             <div className="p-4 border rounded-lg shadow bg-gray-50">
// //                 Cargando {tituloLimpio}...
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="p-4 border rounded-lg shadow bg-white flex flex-col">
// //             <h3 className="font-bold text-lg mb-2">{selectedMovie.title}</h3>
// //             {selectedMovie.poster_path ? (
// //                 <img
// //                     src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
// //                     alt={selectedMovie.title}
// //                     className="rounded mb-2"
// //                 />
// //             ) : (
// //                 <div className="bg-gray-200 h-40 flex items-center justify-center mb-2">
// //                     <span className="text-gray-500">Sin poster</span>
// //                 </div>
// //             )}

// //             <p className="text-sm text-gray-600">
// //                 Año: {ano || selectedMovie.release_date?.split("-")[0] || "N/A"}
// //             </p>
// //             <p className="text-sm">
// //                 ⭐ {selectedMovie.vote_average} ({selectedMovie.vote_count} votos)
// //             </p>

// //             {/* Selector si hay más de una opción */}
// //             {results.length > 1 && (
// //                 <select
// //                     className="mt-2 p-1 border rounded"
// //                     value={selectedMovie.id}
// //                     onChange={(e) =>
// //                         setSelectedMovie(
// //                             results.find((m) => m.id === Number(e.target.value))
// //                         )
// //                     }
// //                 >
// //                     {results.map((m) => (
// //                         <option key={m.id} value={m.id}>
// //                             {m.title} ({m.release_date?.split("-")[0] || "N/A"})
// //                         </option>
// //                     ))}
// //                 </select>
// //             )}

// //             <div className="mt-auto flex gap-2 pt-2">
// //                 <button
// //                     onClick={onPlay}
// //                     className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
// //                 >
// //                     ▶ Reproducir
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }


// import React, { useEffect, useState } from "react";
// import { searchMovie } from "../api/tmdb";

// export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
//     const [movieData, setMovieData] = useState(null);

//     useEffect(() => {
//         const fetchMovie = async () => {
//             const data = await searchMovie(titulo, ano);
//             if (data) setMovieData(data);
//         };
//         fetchMovie();
//     }, [titulo, ano]);

//     return (
//         <div style={{  width: "200px" }} className="p-2 rounded-lg shadow flex flex-col custom-card custom-hover">
//             {movieData && movieData.poster_path ? (
//                 <img
//                     src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
//                     alt={movieData.title}
//                     style={{ width: "100%", borderRadius: "8px" }}
//                 />
//             ) : (
//                 <div style={{ width: "100%", height: "300px", background: "#ddd" }} />
//             )}
//             <h4>{movieData ? movieData.title : titulo}</h4>
//             {movieData && <p style={{ fontSize: "0.8rem" }}>{movieData.release_date}</p>}

//             <button onClick={onPlay} style={{ marginRight: "0.5rem" }}>▶ Reproducir</button>
//             <button onClick={onInfo}>ℹ Info</button>
//         </div>
//     );
// }


/******************************************************** */
/******************************************************** */
import React, { useEffect, useState } from "react";
import { searchMovie } from "../api/tmdb";


export default function MovieCard({ titulo, ano, fileName, onPlay, onInfo }) {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);


    useEffect(() => {
        let ignore = false;
        async function run() {
            const list = await searchMovie(titulo, ano);
            if (ignore) return;
            setResults(list);
            setSelected(list[0] || null);
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
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, background: "#fff", display: "flex", flexDirection: "column" }}>
            {poster ? (
                <img src={poster} alt={selected?.title || titulo} style={{ borderRadius: 8, width: "100%", aspectRatio: "2/3", objectFit: "cover" }} />
            ) : (
                <div style={{ background: "#eee", borderRadius: 8, width: "100%", aspectRatio: "2/3", display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>
                    Sin poster
                </div>
            )}


            <div style={{ marginTop: 8 }}>
                <strong style={{ display: "block" }}>{selected?.title || titulo}</strong>
                <small style={{ color: "#666" }}>{ano || selected?.release_date?.slice(0, 4) || "N/A"}</small>
            </div>


            {results.length > 1 && (
                <select
                    aria-label="Elegir película"
                    value={selected?.id || ""}
                    onChange={(e) => setSelected(results.find((x) => x.id === Number(e.target.value)) || null)}
                    style={{ marginTop: 8, padding: 6, borderRadius: 8, border: "1px solid #ccc" }}
                >
                    {results.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.title} ({r.release_date?.slice(0, 4) || "N/A"})
                        </option>
                    ))}
                </select>
            )}


            <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                <button type="button" onClick={onPlay} style={{ flex: 1, padding: 8, background: "#16a34a", color: "#fff", border: 0, borderRadius: 8, cursor: "pointer" }}>
                    ▶ Reproducir
                </button>
                <button
                    type="button"
                    onClick={() => onInfo(selected)}
                    style={{ flex: 1, padding: 8, background: "#2563eb", color: "#fff", border: 0, borderRadius: 8, cursor: "pointer" }}
                >
                    ℹ Info
                </button>
            </div>
        </div>
)
}