import { useState, useEffect } from "react";
import { getMovieCredits, getMovieDetails, searchMovie } from "../api/tmdb";
import { procesarNombrePeliculaV2 } from "../components/utils";

export function useMarcoGeneral() {
    const [bases, setBases] = useState({});
    const [base, setBase] = useState("");
    const [index, setIndex] = useState(0);
    const [currentPath, setCurrentPath] = useState("");
    const [folders, setFolders] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const API_URL = "http://localhost:5000/api/videos";
    const API_BASES = "http://localhost:5000/api/bases";

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
            const res = await fetch(
                `http://localhost:5000/api/play?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`
            );
            if (!res.ok) throw new Error("No se pudo abrir VLC");
        } catch (e) {
            console.error("/api/play ->", e);
            alert("No se pudo reproducir en VLC");
        }
    }

    async function showMovieInfo(movieOrFileName) {
        try {
            let movie = null;
            if (typeof movieOrFileName === "object" && movieOrFileName.id) {
                movie = movieOrFileName;
            } else {
                const { tituloLimpio, ano } = procesarNombrePeliculaV2(movieOrFileName);
                const list = await searchMovie(tituloLimpio, ano);
                if (!list.length) return;
                movie = list[0];
            }
            const detallesTitulo = await getMovieDetails(movie.id);
            console.log("Detalles título:", detallesTitulo);
            const creditosTitulo = await getMovieCredits(movie.id);
            console.log("Créditos título:", creditosTitulo);
            
            detallesTitulo.credits = creditosTitulo;
            
            setSelectedMovie(detallesTitulo || movie);
        } catch (e) {
            console.error("showMovieInfo ->", e);
        }
    }

    return {
        bases, base, index, currentPath,
        folders, videos, selectedMovie,
        setBase, setIndex, setCurrentPath,
        openFolder, goBack, openMovieInVLC, showMovieInfo,
        setSelectedMovie
    };
}
