
// import React, { useState, useEffect } from "react";
// import { getMovieDetails, searchMovie } from "../api/tmdb";
// import SelectorBases from "./SelectorBases";
// import ListaCarpetas from "./ListaCarpetas";
// import ListaPeliculas from "./ListaPeliculas";
// import MovieInfoModal from "./MovieInfoModal";
// import { procesarNombrePeliculaV2 } from "./utils";

// export default function MarcoGeneral() {
//     const [bases, setBases] = useState({});
//     const [base, setBase] = useState("");
//     const [index, setIndex] = useState(0);
//     const [currentPath, setCurrentPath] = useState("");
//     const [folders, setFolders] = useState([]);
//     const [videos, setVideos] = useState([]);
//     const [selectedMovie, setSelectedMovie] = useState(null);

//     const API_URL = "http://localhost:5000/api/videos";
//     const API_PLAY = "http://localhost:5000/api/play";
//     const API_BASES = "http://localhost:5000/api/bases";

//     useEffect(() => {
//         fetch(API_BASES)
//             .then((res) => res.json())
//             .then((data) => {
//                 setBases(data);
//                 const keys = Object.keys(data);
//                 if (keys.length > 0) {
//                     setBase(keys[0]);
//                     setIndex(0);
//                 }
//             })
//             .catch((err) => console.error("Error cargando bases:", err));
//     }, []);

//     useEffect(() => {
//         if (base) fetchVideos(currentPath);
//     }, [currentPath, base, index]);

//     const fetchVideos = async (path) => {
//         try {
//             const res = await fetch(
//                 `${API_URL}?base=${base}&index=${index}&path=${encodeURIComponent(path)}`
//             );
//             const data = await res.json();
//             setFolders(data.folders || []);
//             setVideos(data.videos || []);
//         } catch (err) {
//             console.error("Error al cargar carpeta:", err);
//             setFolders([]);
//             setVideos([]);
//         }
//     };

//     const openFolder = (folderName) => {
//         setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
//     };

//     const goBack = () => {
//         if (!currentPath) return;
//         const parts = currentPath.split("/").filter(Boolean);
//         parts.pop();
//         setCurrentPath(parts.join("/"));
//     };

// async function openMovieInVLC(fileName) {
//     try {
//         // Construir la ruta relativa
//         const rel = currentPath ? `${currentPath}/${fileName}` : fileName;

//         // Endpoint para reproducir
//         const res = await fetch(
//             `http://localhost:5000/api/play?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`
//         );

//         if (!res.ok) throw new Error("No se pudo abrir VLC");
//         console.log("VLC abierto:", rel);
//     } catch (e) {
//         console.error("/api/play ->", e);
//         alert("No se pudo reproducir en VLC");
//     }
// }

//     async function showMovieInfo(movieOrFileName) {
//         try {
//             let movie = null;
//             if (typeof movieOrFileName === "object" && movieOrFileName.id) {
//                 movie = movieOrFileName;
//             } else {
//                 const { tituloLimpio, ano } = procesarNombrePeliculaV2(movieOrFileName);
//                 const list = await searchMovie(tituloLimpio, ano);
//                 if (!list.length) return;
//                 movie = list[0];
//             }
//             const full = await getMovieDetails(movie.id);
//             setSelectedMovie(full || movie);
//         } catch (e) {
//             console.error("showMovieInfo ->", e);
//         }
//     }

//     return (
//         <div className="d-flex flex-column p-3">
//             <SelectorBases
//                 bases={bases}
//                 base={base}
//                 index={index}
//                 setBase={(b) => {
//                     setBase(b);
//                     setCurrentPath("");
//                 }}
//                 setIndex={(i) => {
//                     setIndex(i);
//                     setCurrentPath("");
//                 }}
//             />

//             <div className="d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "1fr 5fr" }}>
//                 <ListaCarpetas
//                     folders={folders}
//                     currentPath={currentPath}
//                     openFolder={openFolder}
//                     goBack={goBack}
//                 />
//                 <ListaPeliculas
//                     base={base}
//                     videos={videos}
//                     openMovieInVLC={openMovieInVLC}
//                     showMovieInfo={showMovieInfo}
//                     currentPath={currentPath}
//                     setCurrentPath={setCurrentPath}  // Necesario para breadcrumb
//                 />
//             </div>

//             {selectedMovie && (
//                 <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
//             )}
//         </div>
//     );
// }

/***************************************************** */
// Refactor con hook personalizado (tipo context)
/***************************************************** */

import React from "react";
import SelectorBases from "./SelectorBases";
import ListaCarpetas from "./ListaCarpetas";
import ListaPeliculas from "./ListaPeliculas";
import MovieInfoModal from "./MovieInfoModal";
import { useMarcoGeneral } from "../hooks/useMarcoGeneral";

export default function MarcoGeneral() {
  const {
    bases, base, index, currentPath, folders, videos, selectedMovie,
    setBase, setIndex, setCurrentPath,
    openFolder, goBack, openMovieInVLC, showMovieInfo, setSelectedMovie
  } = useMarcoGeneral();

  return (
    <div className="d-flex flex-column p-3">
      {/* SelectorBases fijo */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}>
        <SelectorBases
          bases={bases}
          base={base}
          index={index}
          setBase={(b) => { setBase(b); setCurrentPath(""); }}
          setIndex={(i) => { setIndex(i); setCurrentPath(""); }}
        />
      </div>

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
          setCurrentPath={setCurrentPath}
        />
      </div>

      {selectedMovie && (
        <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
