// import React from "react";
// import MovieCard from "./MovieCard";
// import { cleanTitle } from "./utils";


// export default function ListaPeliculas({ videos, openMovieInVLC, showMovieInfo }) {
//     if (!videos?.length) return <p>No hay películas en esta carpeta.</p>;


//     return (
//         <div style={{ flex: 2 }}>
//             <h3>🎬 Títulos</h3>
//             <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//                 gap: "1rem",
//             }}>
//                 {videos.map((m) => {
//                     const { tituloLimpio, ano } = cleanTitle(m.name);
//                     return (
//                         <MovieCard
//                             key={m.name}
//                             titulo={tituloLimpio}
//                             ano={ano}
//                             fileName={m.name}
//                             onPlay={() => openMovieInVLC(m.name)}
//                             onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

import React from "react";
import MovieCard from "./MovieCard";
// import { cleanTitle, LimpiarNombreSerie } from "./utils";
import { procesarNombreMedia } from "./utils";
import RutaActual from "./RutaActual";

export default function ListaPeliculas({ base, videos, openMovieInVLC, showMovieInfo, currentPath, setCurrentPath }) {
    if (!videos?.length) return <p>No hay películas en esta carpeta.</p>;

    return (
        <div style={{ flex: 2 }}>
            <RutaActual currentPath={currentPath} onNavigate={setCurrentPath} />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                }}
            >
                {/* {videos.map((m) => {
                    if(base === "peliculas") {
                        const { tituloLimpio, ano } = cleanTitle(m.name);
                    } else {
                        const { tituloLimpio, ano } = LimpiarNombreSerie(m.name);
                    }
                    
                    return (
                        <MovieCard
                            key={m.name}
                            titulo={tituloLimpio}
                            ano={ano}
                            fileName={m.name}
                            // onPlay={() => openMovieInVLC(m.name)}
                            onPlay={openMovieInVLC}
                            onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
                        />
                    );
                })} */}
                {/* {videos.map((m) => {
                    let tituloLimpio, ano, temporada, episodio;

                    if (base === "peliculas") {
                        ({ tituloLimpio, ano } = cleanTitle(m.name));
                    } else {
                        ({ tituloLimpio, temporada, episodio } = LimpiarNombreSerie(m.name));
                    }

                    return (
                        <MovieCard
                            key={m.name}
                            titulo={tituloLimpio}
                            ano={ano || `${temporada}x${episodio}`} // ejemplo de cómo mostrarlo
                            fileName={m.name}
                            onPlay={openMovieInVLC}
                            onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
                        />
                    );
                })} */}
                {/* {videos.map((m) => {
                    let tituloLimpio, ano, temporada, episodio;

                    if (base === "peliculas") {
                        ({ tituloLimpio, ano } = procesarNombreMedia(m.name));
                    } else {
                        ({ tituloLimpio, temporada, episodio } = procesarNombreMedia(m.name));
                    }
                    console.log("Processed:", m.name, { tituloLimpio, ano, temporada, episodio });

                    // Si es serie, formatear temporada y episodio como "S01E02"
                    const infoExtra =
                        base === "peliculas"
                            ? ano
                            : (temporada && episodio)
                                ? `S${String(temporada).padStart(2, "0")}E${String(episodio).padStart(2, "0")}`
                                : "";

                    return (
                        <MovieCard
                            key={m.name}
                            titulo={tituloLimpio}
                            ano={infoExtra} // puede ser año o temporada/episodio
                            fileName={m.name}
                            onPlay={openMovieInVLC}
                            onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
                        />
                    );
                })} */}
                {videos.map((m) => {
                    const { nombre, ano, temporada, episodio } = procesarNombreMedia(m.name);

                    // Formatear infoExtra
                    let infoExtra = ano;
                    if (temporada && episodio) {
                        infoExtra = `T${String(temporada).padStart(2, "0")}E${String(episodio).padStart(2, "0")}`
                            + (ano ? ` (${ano})` : ""); // agrega año si existe
                    }

                    return (
                        <MovieCard
                            key={m.name}
                            titulo={nombre}
                            ano={infoExtra} // Ahora puede ser año o TxxExx (año)
                            fileName={m.name}
                            onPlay={openMovieInVLC}
                            onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
                        />
                    );
                })}


            </div>
        </div>
    );
}
