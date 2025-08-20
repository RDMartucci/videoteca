// 
import React, { useState, useEffect } from "react";
import { getMovieDetails, searchMovie } from "../api/tmdb";
import CarpetasList from "./ListaCarpetas";
import MovieInfoModal from "./MovieInfoModal";
import { procesarNombrePelicula } from "./utils";
import ListaTitulos from "./ListaTitulos";

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

    async function openMovieInVLC(fileName) {
        try {
            const rel = currentPath ? `${currentPath}/${fileName}` : fileName;
            const url = `${API_PLAY}?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("No se pudo abrir VLC");
            console.log("VLC abierto:", rel);
            // opcional: feedback UI
            // alert(`Reproduciendo: ${fileName}`);
        } catch (e) {
            console.error("/api/play ->", e);
            alert("No se pudo reproducir en VLC");
        }
    }

    // const showMovieInfo = async (fileName) => {
    //     const { tituloLimpio, ano } = procesarNombrePelicula(fileName);
    //     const movieData = await searchMovie(tituloLimpio, ano);
    //     if (movieData) setSelectedMovie(movieData);
    // };

    // Permite recibir un objeto TMDB ya elegido o el nombre del archivo
    async function showMovieInfo(movieOrFileName) {
        try {
            let movie = null;
            if (typeof movieOrFileName === "object" && movieOrFileName.id) {
                movie = movieOrFileName;
            } else {
                const { tituloLimpio, ano } = cleanTitle(movieOrFileName);
                const list = await searchMovie(tituloLimpio, ano);
                if (!list.length) return;
                movie = list[0];
            }
            const full = await getMovieDetails(movie.id); // incluye videos
            setSelectedMovie(full || movie);
        } catch (e) {
            console.error("showMovieInfo ->", e);
        }
    }

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

                <ListaTitulos
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
