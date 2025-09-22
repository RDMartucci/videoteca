import React, { useState, useEffect } from "react";
import { getMovieDetails, searchMovie } from "../api/tmdb";
import SelectorBases from "./SelectorBases";
import ListaCarpetas from "./ListaCarpetas";
import ListaPeliculas from "./ListaPeliculas";
import MovieInfoModal from "./MovieInfoModal";
import { procesarNombrePeliculaV2 } from "./utils";

export default function MarcoGeneral() {
    const [bases, setBases] = useState({}); //Para guardar las bases encontradas (objeto con arrays de películas y series).
    const [base, setBase] = useState("");   //Para guardar la base seleccionada (película o serie).
    const [index, setIndex] = useState(0);  //Apunta a la ruta seleccionada dentro de la base.
    const [currentPath, setCurrentPath] = useState(""); //Ruta actual dentro de la base seleccionada.
    const [folders, setFolders] = useState([]); //Carpetas encontradas en la ruta actual.
    const [videos, setVideos] = useState([]);   //Películas o series encontradas en la ruta actual.
    const [selectedMovie, setSelectedMovie] = useState(null); //Para guardar la película seleccionada y mostrar su info.

    // URLs de los endpoints del servidor.
    const API_URL = "http://localhost:5000/api/videos"; // Endpoint para listar archivos de videos.
    const API_PLAY = "http://localhost:5000/api/play";  // Endpoint para reproducir un video en VLC.
    const API_BASES = "http://localhost:5000/api/bases";    // Endpoint para obtener las bases (ruta a películas y series).

    // Cargar las bases disponibles al montar el componente.
    useEffect(() => {
        fetch(API_BASES)
            .then((res) => res.json())
            .then((data) => {
                setBases(data);
                console.log("Bases cargadas:", data);

                const keys = Object.keys(data);
                console.log("Keys de bases:", keys);

                if (keys.length > 0) {
                    setBase(keys[0]);
                    setIndex(0);
                    console.log("Base inicial establecida:", keys[0]);
                    console.log("Índice inicial establecido:",index);

                }
            })
            .catch((err) => console.error("Error cargando bases:", err));
    }, []);

    // Cargar carpetas y videos cuando cambian la base, índice o ruta actual.
    useEffect(() => {
        if (base) fetchVideos(currentPath);
        console.log("Efecto useEffect->Base:", base, "Index:", index, "CurrentPath:", currentPath);

    }, [currentPath, base, index]);

    const fetchVideos = async (path) => {
        console.log("fetchVideos llamado con path:", path);

        try {
            const res = await fetch(
                `${API_URL}?base=${base}&index=${index}&path=${encodeURIComponent(path)}`
            );
            console.log("Respuesta de fetchVideos:", res);
            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const data = await res.json();
            setFolders(data.folders || []);
            setVideos(data.videos || []);
            console.log("Carpetas cargadas:", data.folders);
            console.log("Videos cargados:", data.videos);

        } catch (err) {
            console.error("Error al cargar carpeta:", err);
            setFolders([]);
            setVideos([]);
        }
    };

    const openFolder = (folderName) => {
        setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
        console.log("openFolder llamado. Nueva ruta:", currentPath);

    };

    const goBack = () => {
        if (!currentPath) return;
        const parts = currentPath.split("/").filter(Boolean);
        parts.pop();
        setCurrentPath(parts.join("/"));
        console.log("goBack llamado. Nueva ruta:", currentPath);

    };

async function openMovieInVLC(fileName) {
    console.log("openMovieInVLC llamado con fileName:", fileName);

    try {
        // Construir la ruta relativa
        const rel = currentPath ? `${currentPath}/${fileName}` : fileName;
        console.log("Ruta relativa para VLC:", rel);

        // Endpoint para reproducir
        const res = await fetch(
            `http://localhost:5000/api/play?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`
        );

        if (!res.ok) throw new Error("No se pudo abrir VLC");
        console.log("VLC abierto:", rel);
    } catch (e) {
        console.error("/api/play ->", e);
        alert("No se pudo reproducir en VLC");
    }
}

    async function showMovieInfo(movieOrFileName) {
        console.log("showMovieInfo llamado con:", movieOrFileName);

        try {
            let archivo = null;
            if (typeof movieOrFileName === "object" && movieOrFileName.id) {
                archivo = movieOrFileName;
                console.log("Objeto película recibido:", archivo);

            } else {
                const { tituloLimpio, ano } = procesarNombrePeliculaV2(movieOrFileName);
                console.log("Nombre procesado:", { tituloLimpio, ano });

                const list = await searchMovie(tituloLimpio, ano);
                console.log("Resultados de búsqueda:", list);

                if (!list.length) return;
                archivo = list[0];
                console.log("Película encontrada en TMDB:", archivo);
                
            }
            const full = await getMovieDetails(movie.id);
            setSelectedMovie(full || archivo);
            console.log("Detalles completos de la película:", full || archivo);

        } catch (e) {
            console.error("showMovieInfo ->", e);
        }
    }

    return (
        <div className="d-flex flex-column p-3">
            <SelectorBases
                bases={bases}
                base={base}
                index={index}
                setBase={(b) => {
                    setBase(b);
                    setCurrentPath("");
                }}
                setIndex={(i) => {
                    setIndex(i);
                    setCurrentPath("");
                }}
            />

            <div className="d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "1fr 5fr" }}>
                <ListaCarpetas
                    folders={folders}
                    currentPath={currentPath}
                    openFolder={openFolder}
                    goBack={goBack}
                />
                <ListaPeliculas
                    base={base}
                    videos={videos}
                    openMovieInVLC={openMovieInVLC}
                    showMovieInfo={showMovieInfo}
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}  // Necesario para breadcrumb
                />
            </div>

            {selectedMovie && (
                <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
}
