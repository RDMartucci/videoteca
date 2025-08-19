
// // // // // // // import Container from 'react-bootstrap/Container';
// // // // // // // import Row from 'react-bootstrap/Row';
// // // // // // // import Col from 'react-bootstrap/Col';
// // // // // // // // import CardTitulo from './CardTitulo';
// // // // // // // import MovieCard from './MovieCard';
// // // // // // // import { useEffect } from 'react';
// // // // // // // import { useState } from 'react';
// // // // // // // import { searchMovie } from '../api/tmdb';


// // // // // // // export default function TitulosContainer() {


// // // // // // //     const [localTitles, setLocalTitles] = useState([]);
// // // // // // //     const [movie, setMovie] = useState(null);

// // // // // // //     useEffect(() => {
// // // // // // //         fetch("http://localhost:5000/api/movies")
// // // // // // //             .then(res => res.json())
// // // // // // //             .then(data => { 
// // // // // // //                 setLocalTitles(data); 
// // // // // // //                 console.log("Títulos locales:", data); 
// // // // // // //             })
// // // // // // //             .catch(err => console.error("Error obteniendo títulos locales", err));
// // // // // // //     }, []);

// // // // // // //     function limpiarNombreTitulo(localTitle) {
// // // // // // //         // Si la entrada no es una cadena de texto, retornamos valores por defecto.
// // // // // // //         if (typeof localTitle !== 'string') {
// // // // // // //             return {
// // // // // // //                 nombre: '',
// // // // // // //                 ano: null
// // // // // // //             };
// // // // // // //         }
// // // // // // //         // El resto de tu lógica de limpieza
// // // // // // //         const regexAno = /\d{4}/;
// // // // // // //         const anoEncontrado = localTitle.match(regexAno);
// // // // // // //         const ano = anoEncontrado ? anoEncontrado[0] : null;

// // // // // // //         const regexNombre = /[.,;,\-]\s*|\d{4}/g;
// // // // // // //         let nombreLimpio = localTitle.replace(regexNombre, '');
// // // // // // //         nombreLimpio = nombreLimpio.trim();

// // // // // // //         return {
// // // // // // //             nombre: nombreLimpio,
// // // // // // //             ano: ano
// // // // // // //         };
// // // // // // //     }
// // // // // // //     const resultado = localTitle ? limpiarNombreTitulo(localTitle) : { nombre: '', ano: null };

// // // // // // //     useEffect(() => {
// // // // // // //         async function fetchData() {
// // // // // // //             const result = await searchMovie(resultado.nombre);
// // // // // // //             setMovie(result);
// // // // // // //         }
// // // // // // //         fetchData();
// // // // // // //     }, [localTitle]);

// // // // // // //     if (!movie) return <p>Cargando {resultado.nombre}...</p>;

// // // // // // //     return (
// // // // // // //         <Container fluid={true} className="mt-5">
// // // // // // //             <Row xs={1} md={1} lg={3} xl={5} className="g-1">

// // // // // // //                 {localTitles.map((title, index) => (
// // // // // // //                     console.log("Título local encontrado:", title),
// // // // // // //                     <Col key={index} className="d-flex justify-content-center bg-light">
// // // // // // //                         {/* <CardTitulo titulo={titulo} /> */}
// // // // // // //                         <MovieCard key={title} localTitle={title} />
// // // // // // //                     </Col>
// // // // // // //                 ))}
// // // // // // //             </Row>
// // // // // // //         </Container>
// // // // // // //     )
// // // // // // // }

// // // // // // // TitulosContainer.jsx

// // // // // // import Container from 'react-bootstrap/Container';
// // // // // // import Row from 'react-bootstrap/Row';
// // // // // // import Col from 'react-bootstrap/Col';
// // // // // // import MovieCard from './MovieCard';
// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { searchMovie } from '../api/tmdb';

// // // // // // // La función de limpieza de título y año debería estar fuera del componente
// // // // // // // para evitar que se re-defina en cada render.
// // // // // // function limpiarNombreTitulo(localTitle) {
// // // // // //     if (typeof localTitle !== 'string') {
// // // // // //         return {
// // // // // //             nombre: '',
// // // // // //             ano: null
// // // // // //         };
// // // // // //     }
// // // // // //     const regexAno = /\d{4}/;
// // // // // //     const anoEncontrado = localTitle.match(regexAno);
// // // // // //     const ano = anoEncontrado ? anoEncontrado[0] : null;
// // // // // //     const regexNombre = /[.,;,\-]\s*|\d{4}/g;
// // // // // //     let nombreLimpio = localTitle.replace(regexNombre, '');
// // // // // //     nombreLimpio = nombreLimpio.trim();
// // // // // //     return {
// // // // // //         nombre: nombreLimpio,
// // // // // //         ano: ano
// // // // // //     };
// // // // // // }

// // // // // // export default function TitulosContainer() {
// // // // // //     const [localTitles, setLocalTitles] = useState([]);

// // // // // //     // Eliminamos el estado 'movie' porque lo manejará el componente MovieCard

// // // // // //     useEffect(() => {
// // // // // //         fetch("http://localhost:5000/api/movies")
// // // // // //             .then(res => res.json())
// // // // // //             .then(data => { 
// // // // // //                 setLocalTitles(data); 
// // // // // //                 console.log("Títulos locales:", data); 
// // // // // //             })
// // // // // //             .catch(err => console.error("Error obteniendo títulos locales", err));
// // // // // //     }, []);

// // // // // //     if (localTitles.length === 0) {
// // // // // //         return <p>Cargando títulos...</p>;
// // // // // //     }

// // // // // //     return (
// // // // // //         <Container fluid={true} className="mt-5">
// // // // // //             <Row xs={1} md={1} lg={3} xl={5} className="g-1">
// // // // // //                 {localTitles.map((title, index) => (
// // // // // //                     // 1. Limpiamos cada título dentro del .map
// // // // // //                     // 2. Pasamos el título limpio y el año como props a MovieCard
// // // // // //                     <Col key={index} className="d-flex justify-content-center bg-light">
// // // // // //                         <MovieCard 
// // // // // //                             tituloLimpio={limpiarNombreTitulo(title).nombre} 
// // // // // //                             ano={limpiarNombreTitulo(title).ano} 
// // // // // //                         />
// // // // // //                     </Col>
// // // // // //                 ))}
// // // // // //             </Row>
// // // // // //         </Container>
// // // // // //     );
// // // // // // }


// // // // // import Container from 'react-bootstrap/Container';
// // // // // import Row from 'react-bootstrap/Row';
// // // // // import Col from 'react-bootstrap/Col';
// // // // // import MovieCard from './MovieCard';
// // // // // import { useEffect, useState } from 'react';
// // // // // // import { searchMovie } from '../api/tmdb';

// // // // // export default function TitulosContainer() {
// // // // //     const [localTitles, setLocalTitles] = useState([]);

// // // // //     useEffect(() => {
// // // // //         fetch("http://localhost:5000/api/movies")
// // // // //             .then(res => res.json())
// // // // //             .then(data => { 
// // // // //                 setLocalTitles(data); 
// // // // //                 console.log("Títulos locales:", data); 
// // // // //             })
// // // // //             .catch(err => console.error("Error obteniendo títulos locales", err));
// // // // //     }, []);

// // // // //     if (localTitles.length === 0) {
// // // // //         return <p>Cargando títulos...</p>;
// // // // //     }

// // // // //     return (
// // // // //         <Container fluid={true} className="mt-5">
// // // // //             <Row xs={1} md={1} lg={3} xl={5} className="g-1">
// // // // //                 {localTitles.map((title, index) => {
// // // // //                     console.log("Título local encontrado:", title);

// // // // //                     const resultado = procesarNombrePelicula(title);
// // // // //                     return (
// // // // //                         <Col key={index} className="d-flex justify-content-center bg-light">
// // // // //                             <MovieCard 
// // // // //                                 tituloLimpio={resultado.nombre} 
// // // // //                                 ano={resultado.ano} 
// // // // //                             />
// // // // //                         </Col>
// // // // //                     );
// // // // //                 })}
// // // // //             </Row>
// // // // //         </Container>
// // // // //     );
// // // // // }

// // // // // // Función de utilidad para procesar el título, fuera del componente.
// // // // // function procesarNombrePelicula(textoSucio) {
// // // // //     if (typeof textoSucio !== 'string') {
// // // // //         console.warn("Entrada no es una cadena de texto:", textoSucio);
// // // // //         return {
// // // // //             nombre: '',
// // // // //             ano: null
// // // // //         };
// // // // //     }
// // // // //     const regexAno = /\d{4}/;
// // // // //     const anoEncontrado = textoSucio.match(regexAno);
// // // // //     console.log("Año encontrado:", anoEncontrado);

// // // // //     const ano = anoEncontrado ? anoEncontrado[0] : null;
// // // // //     console.log("Año extraído:", ano);

// // // // //     const regexNombre = /[.,;,()\-]\s*|\d{4}/g;
// // // // //     let nombreLimpio = textoSucio.replace(regexNombre, '');
// // // // //     console.log("Nombre limpio antes de trim:", nombreLimpio);

// // // // //     nombreLimpio = nombreLimpio.trim();
// // // // //     console.log("Nombre limpio después de trim:", nombreLimpio);

// // // // //     return {
// // // // //         nombre: nombreLimpio,
// // // // //         ano: ano
// // // // //     };
// // // // // }

// // // // import React, { useState, useEffect } from "react";
// // // // import { searchMovie } from "../api/tmdb";

// // // // export default function TitulosContainer() {
// // // //   const [currentPath, setCurrentPath] = useState("");
// // // //   const [items, setItems] = useState([]); // aquí guardamos carpetas y pelis
// // // //   const [selectedMovie, setSelectedMovie] = useState(null);
// // // //   const API_URL = "http://localhost:5000/api/movies";
// // // //   const API_PLAY = "http://localhost:5000/api/play";

// // // //   useEffect(() => {
// // // //     fetchMovies(currentPath);
// // // //   }, [currentPath]);

// // // //   const fetchMovies = async (path) => {
// // // //     try {
// // // //       const res = await fetch(`${API_URL}?path=${encodeURIComponent(path)}`);
// // // //       const data = await res.json();
// // // //       setItems(data.items || []); // Aseguramos que siempre sea array
// // // //     } catch (err) {
// // // //       console.error("Error al cargar carpeta:", err);
// // // //       setItems([]);
// // // //     }
// // // //   };

// // // //   const openFolder = (folderName) => {
// // // //     setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
// // // //     console.log("Navegando a:", currentPath ? `${currentPath}/${folderName}` : folderName);

// // // //   };

// // // //   const goBack = () => {
// // // //     if (!currentPath) return;
// // // //     const parts = currentPath.split("/").filter(Boolean);
// // // //     parts.pop();
// // // //     setCurrentPath(parts.join("/"));
// // // //   };

// // // //   const openMovieInVLC = async (fileName) => {
// // // //     try {
// // // //       await fetch(`${API_PLAY}?path=${encodeURIComponent(currentPath)}&file=${encodeURIComponent(fileName)}`);
// // // //     } catch (err) {
// // // //       console.error("Error abriendo en VLC:", err);
// // // //     }
// // // //   };

// // // //   const showMovieInfo = async (fileName) => {
// // // //     console.log("Mostrando info de la película:", fileName);

// // // //     const cleanName = fileName.replace(/\.(mp4|mkv|avi)$/i, "");
// // // //     console.log("Nombre limpio para búsqueda:", cleanName);
// // // //     if (!cleanName) {
// // // //       console.error("Nombre de película vacío, no se puede buscar.");
// // // //       return;
// // // //     }
// // // //     const movieData = await searchMovie(cleanName);
// // // //     console.log("Datos de la película:", movieData);
// // // //     if (!movieData) {
// // // //       console.error("No se encontró la película:", cleanName);
// // // //       return;
// // // //     }

// // // //     setSelectedMovie(movieData);
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: "1rem" }}>
// // // //       <h2>Explorador de Películas</h2>

// // // //       <div style={{ marginBottom: "1rem" }}>
// // // //         <button onClick={goBack} disabled={!currentPath}>
// // // //           ⬅ Volver
// // // //         </button>
// // // //         <span style={{ marginLeft: "1rem" }}>Ruta actual: {currentPath || "/"}</span>
// // // //       </div>

// // // //       <ul>
// // // //         {items.length > 0 ? (
// // // //           items.map((item, idx) => (
// // // //             <li key={idx} style={{ marginBottom: "0.5rem" }}>
// // // //               {item.type === "folder" ? (
// // // //                 <button onClick={() => openFolder(item.name)}>📁 {item.name}</button>
// // // //               ) : (
// // // //                 <>
// // // //                   🎬 {item.name}
// // // //                   <button onClick={() => openMovieInVLC(item.name)} style={{ marginLeft: "1rem" }}>
// // // //                     ▶ Reproducir en VLC
// // // //                   </button>
// // // //                   <button onClick={() => showMovieInfo(item.name)} style={{ marginLeft: "0.5rem" }}>
// // // //                     ℹ Info
// // // //                   </button>
// // // //                 </>
// // // //               )}
// // // //             </li>
// // // //           ))
// // // //         ) : (
// // // //           <p>No hay archivos en esta carpeta.</p>
// // // //         )}
// // // //       </ul>

// // // //       {selectedMovie && (
// // // //         <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
// // // //           <h3>{selectedMovie.title}</h3>
// // // //           {selectedMovie.poster_path && (
// // // //             <img
// // // //               src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
// // // //               alt={selectedMovie.title}
// // // //             />
// // // //           )}
// // // //           <p>{selectedMovie.overview}</p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";
// // // import { searchMovie } from "../api/tmdb";

// // // export default function TitulosContainer() {
// // //   const [currentPath, setCurrentPath] = useState("");
// // //   const [folders, setFolders] = useState([]);
// // //   const [movies, setMovies] = useState([]);
// // //   const [selectedMovie, setSelectedMovie] = useState(null);

// // //   const API_URL = "http://localhost:5000/api/movies";
// // //   const API_PLAY = "http://localhost:5000/api/play";

// // //   useEffect(() => {
// // //     fetchMovies(currentPath);
// // //   }, [currentPath]);

// // //   const fetchMovies = async (path) => {
// // //     try {
// // //       const res = await fetch(`${API_URL}?path=${encodeURIComponent(path)}`);
// // //       const data = await res.json();
// // //       setFolders(data.folders || []);
// // //       setMovies(data.movies || []);
// // //     } catch (err) {
// // //       console.error("Error al cargar carpeta:", err);
// // //       setFolders([]);
// // //       setMovies([]);
// // //     }
// // //   };

// // //   const openFolder = (folderName) => {
// // //     setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
// // //   };

// // //   const goBack = () => {
// // //     if (!currentPath) return;
// // //     const parts = currentPath.split("/").filter(Boolean);
// // //     parts.pop();
// // //     setCurrentPath(parts.join("/"));
// // //   };

// // //   const openMovieInVLC = async (fileName) => {
// // //     try {
// // //       await fetch(
// // //         `${API_PLAY}?path=${encodeURIComponent(
// // //           currentPath + "/" + fileName
// // //         )}`
// // //       );
// // //     } catch (err) {
// // //       console.error("Error abriendo en VLC:", err);
// // //     }
// // //   };

// // //   const showMovieInfo = async (fileName) => {
// // //     // const cleanName = fileName.replace(/\.(mp4|mkv|avi)$/i, "");
// // //     // if (!cleanName) {
// // //     //   console.error("Nombre de película vacío, no se puede buscar.");
// // //     //   return;
// // //     // }
// // //     const cleanName = procesarNombrePelicula(fileName);
// // //     console.log("Nombre limpio para búsqueda:", cleanName.nombre);
// // //     if (!cleanName.nombre) {
// // //       console.error("Nombre de película vacío, no se puede buscar.");
// // //       return;
// // //     }
// // //     const movieData = await searchMovie(cleanName.nombre, cleanName.ano);
// // //     if (!movieData) {
// // //       console.error("No se encontró la película:", cleanName.nombre);
// // //       return;
// // //     }
// // //     setSelectedMovie(movieData);
// // //   };


// // //   // Función de utilidad para procesar el título, fuera del componente.
// // //   function procesarNombrePelicula(textoSucio) {
// // //     if (typeof textoSucio !== 'string') {
// // //       console.warn("Entrada no es una cadena de texto:", textoSucio);
// // //       return {
// // //         nombre: '',
// // //         ano: null
// // //       };
// // //     }
// // //     const regexAno = /\d{4}/;
// // //     const anoEncontrado = textoSucio.match(regexAno);
// // //     console.log("Año encontrado:", anoEncontrado);

// // //     const ano = anoEncontrado ? anoEncontrado[0] : null;
// // //     console.log("Año extraído:", ano);

// // //     const regexNombre = /[.,;,()\-]\s*|\d{4}/g;
// // //     let nombreLimpio = textoSucio.replace(regexNombre, '');
// // //     console.log("Nombre limpio antes de trim:", nombreLimpio);

// // //     nombreLimpio = nombreLimpio.trim();
// // //     console.log("Nombre limpio después de trim:", nombreLimpio);

// // //     return {
// // //       nombre: nombreLimpio,
// // //       ano: ano
// // //     };
// // //   }

// // //   return (
// // //     <div style={{ padding: "1rem" }}>
// // //       <h2>Explorador de Películas</h2>

// // //       <div style={{ marginBottom: "1rem" }}>
// // //         <button onClick={goBack} disabled={!currentPath}>
// // //           ⬅ Volver
// // //         </button>
// // //         <span style={{ marginLeft: "1rem" }}>
// // //           Ruta actual: {currentPath || "/"}
// // //         </span>
// // //       </div>

// // //       <div style={{ display: "flex", gap: "2rem" }}>
// // //         {/* 📁 Listado de Carpetas */}
// // //         <div style={{ flex: 1 }}>
// // //           <h3>📁 Carpetas</h3>
// // //           {folders.length > 0 ? (
// // //             <ul>
// // //               {folders.map((folder, idx) => (
// // //                 <li key={idx} style={{ marginBottom: "0.5rem" }}>
// // //                   <button onClick={() => openFolder(folder.name)}>
// // //                     📁 {folder.name}
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           ) : (
// // //             <p>No hay carpetas.</p>
// // //           )}
// // //         </div>

// // //         {/* 🎬 Listado de Películas */}
// // //         <div style={{ flex: 2 }}>
// // //           <h3>🎬 Titulos</h3>
// // //           {movies.length > 0 ? (
// // //             <ul>
// // //               {movies.map((movie, idx) => (
// // //                 <li key={idx} style={{ marginBottom: "0.5rem" }}>
// // //                   {movie.name}
// // //                   <button
// // //                     onClick={() => openMovieInVLC(movie.name)}
// // //                     style={{ marginLeft: "1rem" }}
// // //                   >
// // //                     ▶ Reproducir en VLC
// // //                   </button>
// // //                   <button
// // //                     onClick={() => showMovieInfo(movie.name)}
// // //                     style={{ marginLeft: "0.5rem" }}
// // //                   >
// // //                     ℹ Info
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           ) : (
// // //             <p>No hay películas en esta carpeta.</p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ℹ Info de película seleccionada */}
// // //       {selectedMovie && (
// // //         <div
// // //           style={{
// // //             marginTop: "2rem",
// // //             border: "1px solid #ccc",
// // //             padding: "1rem",
// // //           }}
// // //         >
// // //           <h3>{selectedMovie.title}</h3>
// // //           {selectedMovie.poster_path && (
// // //             <img
// // //               src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
// // //               alt={selectedMovie.title}
// // //               style={{ display: "block", marginBottom: "1rem" }}
// // //             />
// // //           )}
// // //           <p>{selectedMovie.overview}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // // import React, { useState, useEffect } from "react";
// // // import { searchMovie } from "../api/tmdb";
// // // import CarpetasList from "./ListaCarpetas";
// // // import PeliculasList from "./ListaTitulos";

// // // export default function TitulosContainer() {
// // //   const [currentPath, setCurrentPath] = useState("");
// // //   const [folders, setFolders] = useState([]);
// // //   const [movies, setMovies] = useState([]);
// // //   const [selectedMovie, setSelectedMovie] = useState(null);

// // //   const API_URL = "http://localhost:5000/api/movies"; //Para conectar con el backend.
// // //   const API_PLAY = "http://localhost:5000/api/play";  //Para conectar con el backend y reproducir.

// // //   useEffect(() => {

// // //     console.log("useEffect()->Cargando películas en la ruta:", currentPath);
// // //     // Llamamos a la función para cargar las películas al iniciar el componente o cambiar de ruta.
// // //     // Esto asegura que siempre que currentPath cambie, se actualicen las carpetas y películas.
// // //     if (!currentPath) {
// // //        console.warn("fetchMovies()->Ruta vacía, no se puede cargar películas.");
// // //       //  setFolders([]);
// // //       //  setMovies([]);

// // //     }
// // //     fetchMovies(currentPath);
// // //   }, [currentPath]);

// // //   const fetchMovies = async (path) => {
// // //       try {
// // //       const cleanName = procesarNombrePelicula(path);
// // //       console.log("fetchMovies()->Ruta actual:", path);
// // //       console.log("fetchMovies()->Llamando a la API para cargar películas en:", path);
// // //       // Hacemos la petición a la API del backend para obtener las carpetas y películas.
// // //       // const res = await fetch(`${API_URL}?path=${encodeURIComponent(path)}`);
// // //       const res = await fetch(`${API_URL}?path=${encodeURIComponent(cleanName.nombre)}`);
// // //       const data = await res.json();
// // //       console.log("fetchMovies()->Datos recibidos:", data);
// // //       // Actualizamos los estados de carpetas y películas con los datos recibidos.
// // //       setFolders(data.folders || []);
// // //       console.log("fetchMovies()->Carpetas cargadas:", data.folders);
// // //       // Si no hay películas, aseguramos que el estado se actualice correctamente.
// // //       if (!data.movies || data.movies.length === 0) {
// // //         console.warn("fetchMovies()->No se encontraron películas en la ruta:", path);
// // //       }
// // //       console.log("fetchMovies()->Películas cargadas:", data.movies);
// // //       setMovies(data.movies || []);
// // //     } catch (err) {
// // //       console.error("Error al cargar carpeta:", err);
// // //       setFolders([]);
// // //       setMovies([]);
// // //     }
// // //   };

// // //   const openFolder = (folderName) => {
// // //     setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
// // //   };

// // //   const goBack = () => {
// // //     if (!currentPath) return;
// // //     const parts = currentPath.split("/").filter(Boolean);
// // //     parts.pop();
// // //     setCurrentPath(parts.join("/"));
// // //   };

// // //   const openMovieInVLC = async (fileName) => {
// // //     try {
// // //       await fetch(`${API_PLAY}?path=${encodeURIComponent(currentPath + "/" + fileName)}`);
// // //     } catch (err) {
// // //       console.error("Error abriendo en VLC:", err);
// // //     }
// // //   };

// // //   const showMovieInfo = async (fileName) => {
// // //     const cleanName = procesarNombrePelicula(fileName);
// // //     console.log("showMovieInfo->Nombre limpio para búsqueda:", cleanName.nombre);
// // //     if (!cleanName.nombre) {
// // //       console.log("showMovieInfo->Nombre de película vacío, no se puede buscar.");  
// // //       return;
// // //     }

// // //     const movieData = await searchMovie(cleanName.nombre, cleanName.ano);
// // //     if (movieData) setSelectedMovie(movieData);
// // //   };

// // //   // function procesarNombrePelicula(textoSucio) {
// // //   //   console.log("procesarNombrePelicula()->Procesando nombre:", textoSucio);
// // //   //   // Si la entrada no es una cadena de texto, retornamos valores por defecto.
// // //   //   if (typeof textoSucio !== "string") return { nombre: "", ano: null };

// // //   //   const regexAno = /\d{4}/;
// // //   //   const anoEncontrado = textoSucio.match(regexAno);
// // //   //   const ano = anoEncontrado ? anoEncontrado[0] : null;
// // //   //   console.log("Año encontrado:", ano);
// // //   //   // Limpiamos el nombre de la película eliminando caracteres no deseados y el año.
// // //   //   const regexNombre = /[.,;,()\\-]\\s*|\\d{4}/g;
// // //   //   console.log("Nombre sucio antes de limpiar:", textoSucio);
// // //   //   console.log("Expresión regular para limpiar nombre:", regexNombre);

// // //   //   let nombreLimpio = textoSucio.replace(regexNombre, "").trim();
// // //   //   console.log("Nombre limpio después de limpiar:", nombreLimpio);
// // //   //   // Retornamos un objeto con el nombre limpio y el año.
// // //   //   return { nombre: nombreLimpio, ano };
// // //   // }
// // //   function procesarNombrePelicula(textoSucio) {
// // //   if (typeof textoSucio !== "string") return { nombre: "", ano: null };

// // //   // 1. Eliminar extensión de video
// // //   const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
// // //   let sinExtension = textoSucio.replace(regexExt, "");

// // //   // 2. Buscar año (primer match de 4 dígitos)
// // //   const regexAno = /\b(19|20)\d{2}\b/;
// // //   const matchAno = sinExtension.match(regexAno);
// // //   const ano = matchAno ? parseInt(matchAno[0], 10) : null;

// // //   // 3. Cortar todo lo que esté después del año
// // //   if (ano) {
// // //     sinExtension = sinExtension.split(ano)[0];
// // //   }

// // //   // 4. Reemplazar puntos, guiones y underscores por espacios
// // //   let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");

// // //   // 5. Eliminar tags comunes de releases
// // //   const regexTags = /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
// // //   nombreLimpio = nombreLimpio.replace(regexTags, "");

// // //   // 6. Limpiar espacios múltiples
// // //   nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();

// // //   return { nombre: nombreLimpio, ano };
// // // }


// // //   return (
// // //     <div style={{ padding: "1rem" }}>
// // //       {/* <h2>Explorador de Películas</h2> */}
// // //       <div style={{ display: "flex", gap: "2rem" }}>
// // //         <CarpetasList
// // //           folders={folders}
// // //           currentPath={currentPath}
// // //           openFolder={openFolder}
// // //           goBack={goBack}
// // //         />

// // //         <PeliculasList
// // //           movies={movies}
// // //           openMovieInVLC={openMovieInVLC}
// // //           showMovieInfo={showMovieInfo}
// // //         />
// // //       </div>

// // //       {selectedMovie && (
// // //         <div className="movie-info">
// // //           <h3>{selectedMovie.title}</h3>
// // //           {selectedMovie.poster_path && (
// // //             <img
// // //               src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
// // //               alt={selectedMovie.title}
// // //               style={{ display: "block", marginBottom: "1rem" }}
// // //             />
// // //           )}
// // //           <p>{selectedMovie.overview}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import { searchMovie } from "../api/tmdb";
// // import CarpetasList from "./ListaCarpetas";
// // import PeliculasList from "./ListaTitulos";

// // export default function TitulosContainer() {
// //   const [base, setBase] = useState("peliculas"); // 🔹 Base seleccionada
// //   const [currentPath, setCurrentPath] = useState("");
// //   const [folders, setFolders] = useState([]);
// //   const [movies, setMovies] = useState([]);
// //   const [selectedMovie, setSelectedMovie] = useState(null);

// //   const API_URL = "http://localhost:5000/api/movies"; 
// //   const API_PLAY = "http://localhost:5000/api/play";  

// //   useEffect(() => {
// //     fetchMovies(currentPath);
// //   }, [currentPath, base]); // 🔹 Si cambia base, también recargamos

// //   const fetchMovies = async (path) => {
// //     try {
// //       console.log("fetchMovies()->Ruta actual:", path, "Base:", base);
// //       const res = await fetch(
// //         `${API_URL}?base=${base}&path=${encodeURIComponent(path)}`
// //       );
// //       const data = await res.json();
// //       setFolders(data.folders || []);
// //       setMovies(data.movies || []);
// //     } catch (err) {
// //       console.error("Error al cargar carpeta:", err);
// //       setFolders([]);
// //       setMovies([]);
// //     }
// //   };

// //   const openFolder = (folderName) => {
// //     setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
// //   };

// //   const goBack = () => {
// //     if (!currentPath) return;
// //     const parts = currentPath.split("/").filter(Boolean);
// //     parts.pop();
// //     setCurrentPath(parts.join("/"));
// //   };

// //   const openMovieInVLC = async (fileName) => {
// //     try {
// //       await fetch(
// //         `${API_PLAY}?base=${base}&path=${encodeURIComponent(
// //           currentPath ? currentPath + "/" + fileName : fileName
// //         )}`
// //       );
// //     } catch (err) {
// //       console.error("Error abriendo en VLC:", err);
// //     }
// //   };

// //   const showMovieInfo = async (fileName) => {
// //     const cleanName = procesarNombrePelicula(fileName);
// //     const movieData = await searchMovie(cleanName.nombre, cleanName.ano);
// //     if (movieData) setSelectedMovie(movieData);
// //   };

// //   function procesarNombrePelicula(textoSucio) {
// //     if (typeof textoSucio !== "string") return { nombre: "", ano: null };
// //     const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
// //     let sinExtension = textoSucio.replace(regexExt, "");
// //     const regexAno = /\b(19|20)\d{2}\b/;
// //     const matchAno = sinExtension.match(regexAno);
// //     const ano = matchAno ? parseInt(matchAno[0], 10) : null;
// //     if (ano) sinExtension = sinExtension.split(ano)[0];
// //     let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");
// //     const regexTags =
// //       /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
// //     nombreLimpio = nombreLimpio.replace(regexTags, "");
// //     nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();
// //     return { nombre: nombreLimpio, ano };
// //   }

// //   return (
// //     <div style={{ padding: "1rem" }}>
// //       {/* 🔹 Selector de base/disco */}
// //       <div style={{ marginBottom: "1rem" }}>
// //         <label>
// //           Ubicación:
// //           <select
// //             value={base}
// //             onChange={(e) => {
// //               setBase(e.target.value);
// //               setCurrentPath(""); // reset al cambiar de disco
// //             }}
// //             style={{ marginLeft: "0.5rem" }}
// //           >
// //             <option value="peliculas">🎬 Películas</option>
// //             <option value="series">📺 Series</option>
// //             <option value="descargas">⬇️ Descargas</option>
// //           </select>
// //         </label>
// //       </div>

// //       <div style={{ display: "flex", gap: "2rem" }}>
// //         <CarpetasList
// //           folders={folders}
// //           currentPath={currentPath}
// //           openFolder={openFolder}
// //           goBack={goBack}
// //         />

// //         <PeliculasList
// //           movies={movies}
// //           openMovieInVLC={openMovieInVLC}
// //           showMovieInfo={showMovieInfo}
// //         />
// //       </div>

// //       {selectedMovie && (
// //         <div className="movie-info">
// //           <h3>{selectedMovie.title}</h3>
// //           {selectedMovie.poster_path && (
// //             <img
// //               src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
// //               alt={selectedMovie.title}
// //               style={{ display: "block", marginBottom: "1rem" }}
// //             />
// //           )}
// //           <p>{selectedMovie.overview}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// /******************************************************** */
// import React, { useState, useEffect } from "react";
// import { searchMovie } from "../api/tmdb";
// import CarpetasList from "./ListaCarpetas";
// import PeliculasList from "./ListaTitulos";
// // import { Console } from "console";

// export default function TitulosContainer() {
//   const [bases, setBases] = useState({});
//   const [base, setBase] = useState("");
//   const [index, setIndex] = useState(0);
//   const [currentPath, setCurrentPath] = useState("");
//   const [folders, setFolders] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const API_URL = "http://localhost:5000/api/movies";
//   const API_PLAY = "http://localhost:5000/api/play";
//   const API_BASES = "http://localhost:5000/api/bases";

//   // Cargar bases
//   useEffect(() => {
//     fetch(API_BASES)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Bases cargadas:", data);

//         setBases(data);
//         const keys = Object.keys(data);
//         if (keys.length > 0) {
//           console.log("Base inicial:", keys[0]);

//           setBase(keys[0]);
//           setIndex(0);
//         }
//       })
//       .catch(err => console.error("Error cargando bases:", err));
//   }, []);

//   // Cargar películas cuando cambie base/index/ruta
//   useEffect(() => {
//     if (base) {
//       console.log("Cargando películas en base:", base, "índice:", index, "ruta:", currentPath);

//       fetchMovies(currentPath);
//     }
//   }, [currentPath, base, index]);

//   const fetchMovies = async (path) => {
//     try {
//       const res = await fetch(
//         `${API_URL}?base=${base}&index=${index}&path=${encodeURIComponent(path)}`
//       );
//       const data = await res.json();
//       setFolders(data.folders || []);
//       setMovies(data.movies || []);
//     } catch (err) {
//       console.error("Error al cargar carpeta:", err);
//       setFolders([]);
//       setMovies([]);
//     }
//   };

//   const openFolder = (folderName) => {
//     setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
//   };

//   const goBack = () => {
//     if (!currentPath) return;
//     const parts = currentPath.split("/").filter(Boolean);
//     parts.pop();
//     setCurrentPath(parts.join("/"));
//   };

//   const openMovieInVLC = async (fileName) => {
//     try {
//       await fetch(
//         `${API_PLAY}?base=${base}&index=${index}&path=${encodeURIComponent(
//           currentPath ? currentPath + "/" + fileName : fileName
//         )}`
//       );
//     } catch (err) {
//       console.error("Error abriendo en VLC:", err);
//     }
//   };

//   const showMovieInfo = async (fileName) => {
//     const cleanName = procesarNombrePelicula(fileName);
//     const movieData = await searchMovie(cleanName.nombre, cleanName.ano);
//     if (movieData) setSelectedMovie(movieData);
//   };

//   function procesarNombrePelicula(textoSucio) {
//     if (typeof textoSucio !== "string") return { nombre: "", ano: null };
//     const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
//     let sinExtension = textoSucio.replace(regexExt, "");
//     const regexAno = /\b(19|20)\d{2}\b/;
//     const matchAno = sinExtension.match(regexAno);
//     const ano = matchAno ? parseInt(matchAno[0], 10) : null;
//     if (ano) sinExtension = sinExtension.split(ano)[0];
//     let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");
//     const regexTags =
//       /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
//     nombreLimpio = nombreLimpio.replace(regexTags, "");
//     nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();
//     return { nombre: nombreLimpio, ano };
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       {/* Selector de categoría y ruta */}
//       <div style={{ marginBottom: "1rem" }}>
//         <label>
//           Categoría:
//           <select
//             value={base}
//             onChange={(e) => {
//               setBase(e.target.value);
//               setIndex(0);
//               setCurrentPath("");
//             }}
//             style={{ marginLeft: "0.5rem" }}
//           >
//             {Object.keys(bases).map((b) => (
//               <option key={b} value={b}>
//                 {b}
//               </option>
//             ))}
//           </select>
//         </label>

//         {/* {base && (
//           <label style={{ marginLeft: "1rem" }}>
//             Ruta:
//             <select
//               value={index}
//               onChange={(e) => {
//                 setIndex(Number(e.target.value));
//                 setCurrentPath("");
//               }}
//               style={{ marginLeft: "0.5rem" }}
//             >
//               {bases[base].map((ruta, i) => (
//                 <option key={i} value={i}>
//                   {ruta}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}
//       </div> */}
//         {base && Array.isArray(bases[base]) && (
//           <label style={{ marginLeft: "1rem" }}>
//             Ruta:
//             <select
//               value={index}
//               onChange={(e) => {
//                 setIndex(Number(e.target.value));
//                 setCurrentPath("");
//               }}
//               style={{ marginLeft: "0.5rem" }}
//             >
//               {bases[base].map((ruta, i) => (
//                 <option key={i} value={i}>
//                   {ruta}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}


//         <div style={{ display: "flex", gap: "2rem" }}>
//           <CarpetasList
//             folders={folders}
//             currentPath={currentPath}
//             openFolder={openFolder}
//             goBack={goBack}
//           />

//           <PeliculasList
//             movies={movies}
//             openMovieInVLC={openMovieInVLC}
//             showMovieInfo={showMovieInfo}
//           />
//         </div>

//         {selectedMovie && (
//           <div className="movie-info" style={{ marginTop: "2rem" }}>
//             <h3>{selectedMovie.title}</h3>

//             {selectedMovie.poster_path && (
//               <img
//                 src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
//                 alt={selectedMovie.title}
//                 style={{ display: "block", marginBottom: "1rem" }}
//               />
//             )}

//             <p>{selectedMovie.overview}</p>

//             {selectedMovie.trailerUrl && (
//               <a
//                 href={selectedMovie.trailerUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   display: "inline-block",
//                   marginTop: "1rem",
//                   padding: "0.5rem 1rem",
//                   background: "#ff0000",
//                   color: "#fff",
//                   borderRadius: "8px",
//                   textDecoration: "none"
//                 }}
//               >
//                 🎬 Ver Tráiler
//               </a>
//             )}
//           </div>
//         )}
//       </div>
//       </div>
//       );
// }


