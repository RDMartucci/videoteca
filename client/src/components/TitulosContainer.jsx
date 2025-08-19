// 
import React, { useState, useEffect } from "react";
import { searchMovie } from "../api/tmdb";
import CarpetasList from "./ListaCarpetas";
import PeliculasList from "./PeliculasList";
import MovieInfoModal from "./MovieInfoModal";
import { procesarNombrePelicula } from "./utils";

export default function TitulosContainer() {
    const [bases, setBases] = useState({});
    const [base, setBase] = useState("");
    const [index, setIndex] = useState(0);
    const [currentPath, setCurrentPath] = useState("");
    const [folders, setFolders] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const API_URL = "http://localhost:5000/api/videos";
    const API_PLAY = "http://localhost:5000/api/play";
    const API_BASES = "http://localhost:5000/api/bases";

    // Cargar bases disponibles
    useEffect(() => {
        fetch(API_BASES)
            .then((res) => res.json())
            .then((data) => {
                setBases(data);
                const keys = Object.keys(data);
                if (keys.length > 0) {
                    setBase(keys[0]);
                    setIndex(0);
                }
            })
            .catch((err) => console.error("Error cargando bases:", err));
    }, []);

    // Cargar películas cuando cambia la base o la ruta
    useEffect(() => {
        if (base) fetchVideos(currentPath);
    }, [currentPath, base, index]);

    const fetchVideos = async (path) => {
        try {
            const res = await fetch(
                `${API_URL}?base=${base}&index=${index}&path=${encodeURIComponent(path)}`
            );
            const data = await res.json();
            setFolders(data.folders || []);
            setVideos(data.videos || []);
        } catch (err) {
            console.error("Error al cargar carpeta:", err);
            setFolders([]);
            setVideos([]);
        }
    };

    const openFolder = (folderName) => {
        setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
    };

    const goBack = () => {
        if (!currentPath) return;
        const parts = currentPath.split("/").filter(Boolean);
        parts.pop();
        setCurrentPath(parts.join("/"));
    };

    const openMovieInVLC = async (fileName) => {
        try {
            await fetch(
                `${API_PLAY}?base=${base}&index=${index}&path=${encodeURIComponent(
                    currentPath ? currentPath + "/" + fileName : fileName
                )}`
            );
        } catch (err) {
            console.error("Error abriendo en VLC:", err);
        }
    };

    const showMovieInfo = async (fileName) => {
        const { tituloLimpio, ano } = procesarNombrePelicula(fileName);
        const movieData = await searchMovie(tituloLimpio, ano);
        if (movieData) setSelectedMovie(movieData);
    };


    return (
        <div style={{ padding: "1rem" }}>
            {/* Selector de categoría y ruta */}
            <div style={{ marginBottom: "1rem" }}>
                <label>
                    Categoría:
                    <select
                        value={base}
                        onChange={(e) => {
                            setBase(e.target.value);
                            setIndex(0);
                            setCurrentPath("");
                        }}
                        style={{ marginLeft: "0.5rem" }}
                    >
                        {Object.keys(bases).map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </label>

                {base && (
                    <label style={{ marginLeft: "1rem" }}>
                        Ruta:
                        <select
                            value={index}
                            onChange={(e) => {
                                setIndex(Number(e.target.value));
                                setCurrentPath("");
                            }}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            {bases[base].map((ruta, i) => (
                                <option key={i} value={i}>
                                    {ruta}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            <div style={{ display: "flex", gap: "2rem" }}>
                <CarpetasList
                    folders={folders}
                    currentPath={currentPath}
                    openFolder={openFolder}
                    goBack={goBack}
                />

                <PeliculasList
                    videos={videos}
                    openMovieInVLC={openMovieInVLC}
                    showMovieInfo={showMovieInfo}
                />
            </div>

            {selectedMovie && (
                <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
}
