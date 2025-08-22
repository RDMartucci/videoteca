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
import { cleanTitle } from "./utils";
import RutaActual from "./RutaActual";

export default function ListaPeliculas({ videos, openMovieInVLC, showMovieInfo, currentPath, setCurrentPath }) {
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
                {videos.map((m) => {
                    const { tituloLimpio, ano } = cleanTitle(m.name);
                    return (
                        <MovieCard
                            key={m.name}
                            titulo={tituloLimpio}
                            ano={ano}
                            fileName={m.name}
                            onPlay={() => openMovieInVLC(m.name)}
                            onInfo={(movieObj) => showMovieInfo(movieObj || m.name)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
