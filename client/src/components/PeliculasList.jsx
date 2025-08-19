// import React from "react";
// import Card from "./Card";

// export default function PeliculasList({ movies, openMovieInVLC, showMovieInfo }) {
//   return (
//     <div style={{ flex: 2 }}>
//       <h3>🎬 Títulos</h3>
//       {movies.length > 0 ? (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
//           {movies.map((movie, idx) => (
//             <Card key={idx} title={movie.name}>
//               <div style={{ marginTop: "0.5rem" }}>
//                 <button onClick={() => openMovieInVLC(movie.name)} style={{ marginRight: "0.5rem" }}>
//                   ▶ Reproducir
//                 </button>
//                 <button onClick={() => showMovieInfo(movie.name)}>ℹ Info</button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p>No hay películas en esta carpeta.</p>
//       )}
//     </div>
//   );
// }


// import React from "react";
// import MovieCard from "./MovieCard";

//   function procesarNombrePelicula(textoSucio) {
//     console.log("procesarNombrePelicula()->Procesando nombre:", textoSucio);
//     // Si la entrada no es una cadena de texto, retornamos valores por defecto.
//     if (typeof textoSucio !== "string") return { nombre: "", ano: null };

//     const regexAno = /\d{4}/;
//     const anoEncontrado = textoSucio.match(regexAno);
//     const ano = anoEncontrado ? anoEncontrado[0] : null;
//     console.log("Año encontrado:", ano);
//     // Limpiamos el nombre de la película eliminando caracteres no deseados y el año.
//     const regexNombre = /[.,;,()\\-]\\s*|\\d{4}/g;
//     console.log("Nombre sucio antes de limpiar:", textoSucio);
//     console.log("Expresión regular para limpiar nombre:", regexNombre);

//     let nombreLimpio = textoSucio.replace(regexNombre, "").trim();
//     console.log("Nombre limpio después de limpiar:", nombreLimpio);
//     // Retornamos un objeto con el nombre limpio y el año.
//     return { nombre: nombreLimpio, ano };
//   }
// function procesarNombrePelicula(textoSucio) {
//   if (typeof textoSucio !== "string") return { nombre: "", ano: null };

//   // 1. Eliminar extensión de video
//   const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
//   let sinExtension = textoSucio.replace(regexExt, "");

//   // 2. Buscar año (primer match de 4 dígitos)
//   const regexAno = /\b(19|20)\d{2}\b/;
//   const matchAno = sinExtension.match(regexAno);
//   const ano = matchAno ? parseInt(matchAno[0], 10) : null;

//   // 3. Cortar todo lo que esté después del año
//   if (ano) {
//     sinExtension = sinExtension.split(ano)[0];
//   }

//   // 4. Reemplazar puntos, guiones y underscores por espacios
//   let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");

//   // 5. Eliminar tags comunes de releases
//   const regexTags = /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
//   nombreLimpio = nombreLimpio.replace(regexTags, "");

//   // 6. Limpiar espacios múltiples
//   nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();

//   return { nombre: nombreLimpio, ano };
// }


// export default function PeliculasList({ movies, openMovieInVLC, showMovieInfo }) {
//     return (
//         <div style={{ flex: 2 }}>
//             <h3>🎬 Títulos</h3>
//             {movies.length > 0 ? (
//                 <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
//                     {movies.map((movie, idx) => {
//                         const cleanName = procesarNombrePelicula(movie.name);
//                         console.log("PeliculasList->ProcesandoNombrePelícula:", movie.name, "->", cleanName.nombre, cleanName.ano);

//                         return (
//                             <MovieCard
//                                 key={idx}
//                                 tituloLimpio={cleanName.nombre}
//                                 ano={cleanName.ano}
//                                 onPlay={() => openMovieInVLC(movie.name)}
//                                 onInfo={() => showMovieInfo(movie.name)}
//                             />
//                         );
//                     })}
//                 </div>
//             ) : (
//                 <p>No hay películas en esta carpeta.</p>
//             )}
//         </div>
//     );
// }

/*************************************** */
/*************************************** */
/*************************************** */
// import React from 'react';
// import MovieCard from './MovieCard'; // Asegúrate de que este componente exista
// // import { procesarNombrePelicula } from './utils/movieUtils'; // Crea un archivo de utilidades



// export default function PeliculasList({ movies, openMovieInVLC, showMovieInfo }) {
//     return (
//         <div style={{ flex: 2 }}>
//             <h3>🎬 Títulos</h3>
//             {movies.length > 0 ? (
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
//                     {movies.map((movie, idx) => {
//                         const cleanName = procesarNombrePelicula(movie.name);
//                         console.log("ListaTitulos->ProcesandoNombrePelicula:", movie.name, "->", cleanName.nombre, cleanName.ano);  

//                         return (
//                             <MovieCard
//                                 key={idx}
//                                 tituloLimpio={cleanName.nombre}
//                                 ano={cleanName.ano}
//                                 onPlay={() => openMovieInVLC(movie.name)}
//                                 onInfo={() => showMovieInfo(movie.name)}
//                             />
//                         );
//                     })}
//                 </div>
//             ) : (
//                 <p>No hay películas en esta carpeta.</p>
//             )}
//         </div>
//     );
// }
import React from "react";
import MovieCard from "./MovieCard";
import { cleanTitle } from "../components/utils";

export default function PeliculasList({ videos, openMovieInVLC, showMovieInfo }) {
    if (!videos.length) return <p>No hay películas en esta carpeta</p>;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "1rem" }}>
            {videos.map((m) => {
                const { tituloLimpio, ano } = cleanTitle(m.name);
                console.log("Procesando título:", m.name, "->", tituloLimpio, ano);
                
                return (
                    <MovieCard
                        key={m.name}
                        titulo={tituloLimpio}
                        ano={ano}
                        fileName={m.name}
                        onPlay={() => openMovieInVLC(m.name)}
                        onInfo={() => showMovieInfo(m.name)}
                    />
                );
            })}
        </div>
    );
}
