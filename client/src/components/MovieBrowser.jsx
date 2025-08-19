import React, { useState, useEffect } from "react";
import { searchMovie } from "../api/tmdb";
import MovieCard from "./MovieCard";

const API_URL = "http://localhost:5000/api/movies";
const PLAY_URL = "http://localhost:5000/api/play";

export default function MovieBrowser() {
  const [currentPath, setCurrentPath] = useState("");
  const [items, setItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(currentPath);
  }, [currentPath]);

  const fetchMovies = async (path) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Error cargando carpeta:", error);
    }
    setLoading(false);
  };

  const openFolder = (folderName) => {
    setCurrentPath(currentPath ? `${currentPath}\\${folderName}` : folderName);
    console.log("Navegando a:", currentPath ? `${currentPath}\\${folderName}` : folderName);

  };

  const goBack = () => {
    const newPath = currentPath.split("\\").slice(0, -1).join("\\");
    setCurrentPath(newPath);
    console.log("Volviendo a:", newPath);
  };

  const selectMovie = async (movieName) => {
    const movieInfo = await searchMovie(movieName);
    setSelectedMovie({ name: movieName, info: movieInfo });
    console.log("Información de la película seleccionada:", movieInfo);
  };

  const playMovie = async (movieName) => {
    try {
      await fetch(`${PLAY_URL}?path=${encodeURIComponent(currentPath ? `${currentPath}\\${movieName}` : movieName)}`);
    } catch (error) {
      console.error("Error reproduciendo en VLC:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Explorador de Películas</h2>
      {currentPath && <button onClick={goBack}>⬅ Volver</button>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.type === "folder" && (
                <button onClick={() => openFolder(item.name)}>📁 {item.name}</button>
              )}
              {item.type === "movie" && (
                <div style={{ marginBottom: 10 }}>
                <MovieCard />
                  {/* Aquí podrías usar un componente MovieCard si lo tienes */}
                  {/* <div className="movie-card" style={{ padding: 10, border: "1px solid #ccc", marginBottom: 5 }}>
                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.name} style={{ width: 100, height: 150 }} />
                    <h4>{item.name}</h4>
                    <p>{item.overview}</p>
                  </div> */}
                  {/* 🎬 {item.name} */}

                  {/* Botones para más acciones */}
                  <button onClick={() => selectMovie(item.name)}>ℹ Info</button>
                  <button onClick={() => playMovie(item.name)} className="p-2">▶ Reproducir</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {selectedMovie && selectedMovie.info && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
          <h3>{selectedMovie.info.title}</h3>
          <p>{selectedMovie.info.overview}</p>
          {selectedMovie.info.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${selectedMovie.info.poster_path}`}
              alt={selectedMovie.info.title}
            />
          )}
        </div>
      )}
    </div>
  );
}
