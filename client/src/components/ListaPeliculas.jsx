import React, { useState } from "react";
import MovieCard from "./MovieCard";
// import { cleanTitle, LimpiarNombreSerie } from "./utils";
import { procesarNombreMedia } from "./utils";
import RutaActual from "./RutaActual";

export default function ListaPeliculas({ base, videos, openMovieInVLC, showMovieInfo, currentPath, setCurrentPath }) {
    if (!videos?.length) return <p>No hay películas en esta carpeta.</p>;

    //const [cargandoImagen, setCargandoImagen] = useState(true);


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
