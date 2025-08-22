// // // 
// // import React, { useState, useEffect } from "react";
// // import { getMovieDetails, searchMovie } from "../api/tmdb";
// // import CarpetasList from "./ListaCarpetas";
// // import MovieInfoModal from "./MovieInfoModal";
// // import { procesarNombrePeliculaV2 } from "./utils";
// // import ListaPeliculas from "./ListaPeliculas";

// // export default function MarcoGeneral() {
// //     const [bases, setBases] = useState({});
// //     const [base, setBase] = useState("");
// //     const [index, setIndex] = useState(0);
// //     const [currentPath, setCurrentPath] = useState("");
// //     const [folders, setFolders] = useState([]);
// //     const [videos, setVideos] = useState([]);
// //     const [selectedMovie, setSelectedMovie] = useState(null);

// //     const API_URL = "http://localhost:5000/api/videos";
// //     const API_PLAY = "http://localhost:5000/api/play";
// //     const API_BASES = "http://localhost:5000/api/bases";

// //     // Cargar bases disponibles
// //     useEffect(() => {
// //         fetch(API_BASES)
// //             .then((res) => res.json())
// //             .then((data) => {
// //                 setBases(data);
// //                 const keys = Object.keys(data);
// //                 if (keys.length > 0) {
// //                     setBase(keys[0]);
// //                     setIndex(0);
// //                 }
// //             })
// //             .catch((err) => console.error("Error cargando bases:", err));
// //     }, []);

// //     // Cargar películas cuando cambia la base o la ruta
// //     useEffect(() => {
// //         if (base) fetchVideos(currentPath);
// //     }, [currentPath, base, index]);

// //     const fetchVideos = async (path) => {
// //         try {
// //             const res = await fetch(
// //                 `${API_URL}?base=${base}&index=${index}&path=${encodeURIComponent(path)}`
// //             );
// //             const data = await res.json();
// //             setFolders(data.folders || []);
// //             setVideos(data.videos || []);
// //         } catch (err) {
// //             console.error("Error al cargar carpeta:", err);
// //             setFolders([]);
// //             setVideos([]);
// //         }
// //     };

// //     const openFolder = (folderName) => {
// //         setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
// //     };

// //     const goBack = () => {
// //         if (!currentPath) return;
// //         const parts = currentPath.split("/").filter(Boolean);
// //         parts.pop();
// //         setCurrentPath(parts.join("/"));
// //     };

// //     async function openMovieInVLC(fileName) {
// //         try {
// //             const rel = currentPath ? `${currentPath}/${fileName}` : fileName;
// //             const url = `${API_PLAY}?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`;
// //             const res = await fetch(url);
// //             if (!res.ok) throw new Error("No se pudo abrir VLC");
// //             console.log("VLC abierto:", rel);
// //             // opcional: feedback UI
// //             // alert(`Reproduciendo: ${fileName}`);
// //         } catch (e) {
// //             console.error("/api/play ->", e);
// //             alert("No se pudo reproducir en VLC");
// //         }
// //     }

// //     // const showMovieInfo = async (fileName) => {
// //     //     const { tituloLimpio, ano } = procesarNombrePelicula(fileName);
// //     //     const movieData = await searchMovie(tituloLimpio, ano);
// //     //     if (movieData) setSelectedMovie(movieData);
// //     // };

// //     // Permite recibir un objeto TMDB ya elegido o el nombre del archivo
// //     async function showMovieInfo(movieOrFileName) {
// //         try {
// //             let movie = null;
// //             if (typeof movieOrFileName === "object" && movieOrFileName.id) {
// //                 movie = movieOrFileName;
// //             } else {
// //                 const { tituloLimpio, ano } = procesarNombrePeliculaV2(movieOrFileName);
// //                 const list = await searchMovie(tituloLimpio, ano);
// //                 if (!list.length) return;
// //                 movie = list[0];
// //             }
// //             const full = await getMovieDetails(movie.id); // incluye videos
// //             setSelectedMovie(full || movie);
// //         } catch (e) {
// //             console.error("showMovieInfo ->", e);
// //         }
// //     }

// //     return (
// //         <div className="d-flex flex-column p-3">
// //             {/* Selector de categoría(peliculas o series) y ruta */}
// //             <div className="selector-bases d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "1fr 5fr" }}>
// //                 {/*Selector base (categoria), si son películas o series (en este caso. Podrian ser más) */}
// //                 <label >
// //                     Categoría:
// //                     <select
// //                         value={base}
// //                         onChange={(e) => {
// //                             setBase(e.target.value);
// //                             setIndex(0);
// //                             setCurrentPath("");
// //                         }}
// //                         className="form-select p-1 rounded-2"
// //                     >
// //                         {Object.keys(bases).map((b) => (
// //                             <option key={b} value={b}>
// //                                 {b}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </label>
// //                 {/*Selector de la ruta por cada categoría(base) encontrada*/}
// //                 {base && (
// //                     <label className="me-2 ">
// //                         Ruta:
// //                         <select
// //                             value={index}
// //                             onChange={(e) => {
// //                                 setIndex(Number(e.target.value));
// //                                 setCurrentPath("");
// //                             }}
// //                             className="form-select p-1 rounded-2"
// //                         >
// //                             {bases[base].map((ruta, i) => (
// //                                 <option key={i} value={i}>
// //                                     {ruta}
// //                                 </option>
// //                             ))}
// //                         </select>
// //                     </label>
// //                 )}
// //             </div>
// //             {/* Carpetas */}
// //             <div className="d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "1fr 5fr" }}>
// //                 <div>
// //                     <CarpetasList
// //                         folders={folders}
// //                         currentPath={currentPath}
// //                         openFolder={openFolder}
// //                         goBack={goBack}
// //                     />
// //                 </div>
// //                 {/* Lista de títulos */}
// //                 <div>
// //                     <ListaPeliculas
// //                         videos={videos}
// //                         openMovieInVLC={openMovieInVLC}
// //                         showMovieInfo={showMovieInfo}
// //                     />
// //                 </div>
// //             </div>
// //             {selectedMovie && (
// //                 <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
// //             )}
// //         </div>
// //     );
// // }



// import React, { useState, useEffect } from "react";
// import { getMovieDetails, searchMovie } from "../api/tmdb";
// import SelectorBases from "./SelectorBases";
// import CarpetasList from "./ListaCarpetas";
// import MovieInfoModal from "./MovieInfoModal";
// import { procesarNombrePeliculaV2 } from "./utils";
// import ListaPeliculas from "./ListaPeliculas";

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

//     async function openMovieInVLC(fileName) {
//         try {
//             const rel = currentPath ? `${currentPath}/${fileName}` : fileName;
//             const url = `${API_PLAY}?base=${base}&index=${index}&path=${encodeURIComponent(rel)}`;
//             const res = await fetch(url);
//             if (!res.ok) throw new Error("No se pudo abrir VLC");
//             console.log("VLC abierto:", rel);
//         } catch (e) {
//             console.error("/api/play ->", e);
//             alert("No se pudo reproducir en VLC");
//         }
//     }

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
//                 <CarpetasList
//                     folders={folders}
//                     currentPath={currentPath}
//                     openFolder={openFolder}
//                     goBack={goBack}
//                 />

//                 <ListaPeliculas
//                     videos={videos}
//                     openMovieInVLC={openMovieInVLC}
//                     showMovieInfo={showMovieInfo}
//                     currentPath={currentPath}
//                     setCurrentPath={setCurrentPath}
//                 />
//             </div>

//             {selectedMovie && (
//                 <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { getMovieDetails, searchMovie } from "../api/tmdb";
import SelectorBases from "./SelectorBases";
import ListaCarpetas from "./ListaCarpetas";
import ListaPeliculas from "./ListaPeliculas";
import MovieInfoModal from "./MovieInfoModal";
import { procesarNombrePeliculaV2 } from "./utils";

export default function MarcoGeneral() {
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
        // Construir la ruta relativa
        const rel = currentPath ? `${currentPath}/${fileName}` : fileName;

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
            const full = await getMovieDetails(movie.id);
            setSelectedMovie(full || movie);
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
