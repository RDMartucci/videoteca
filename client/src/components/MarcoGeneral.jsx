// // /***************************************************** */
// // // Refactor con hook personalizado (tipo context)
// // /***************************************************** */

// import React from "react";
// import SelectorBases from "./SelectorBases";
// import ListaCarpetas from "./ListaCarpetas";
// import ListaPeliculas from "./ListaPeliculas";
// import MovieInfoModal from "./MovieInfoModal";
// import { useMarcoGeneral } from "../context/useMarcoGeneral";
// import "../styles/MarcoGeneral.css";

// export default function MarcoGeneral() {
//   const {
//     bases, base, index, currentPath, folders, videos, selectedMovie,
//     setBase, setIndex, setCurrentPath,
//     openFolder, goBack, openMovieInVLC, showMovieInfo, setSelectedMovie
//   } = useMarcoGeneral();

//   return (
//     /* 1. Contenedor principal: Altura total de la pantalla y ocultamos el scroll global */
//     <div className="d-flex flex-column" style={{ height: "90vh", overflow: "hidden", padding: "1rem" }}>

//       {/* SelectorBases: Se mantiene arriba */}
//       <div style={{ marginBottom: "1rem" }}>
//         <SelectorBases
//           bases={bases}
//           base={base}
//           index={index}
//           setBase={(b) => { setBase(b); setCurrentPath(""); }}
//           setIndex={(i) => { setIndex(i); setCurrentPath(""); }}
//         />
//       </div>

//       {/* 2. El Grid: Debe ocupar el resto del espacio disponible (flex: 1) */}
//       <div 
//         className="d-grid gap-3" 
//         style={{ 
//           gridTemplateColumns: "2fr 6fr", 
//           flex: 1,             // Ocupa todo el alto restante
//           minHeight: 0,        // Truco de Flexbox para permitir que los hijos midan menos que el contenido
//           overflow: "hidden"   // Evita que el grid mismo crezca
//         }}
//       >
//         {/* 3. Columna Izquierda: Scroll independiente */}
//         <div style={{ overflowY: "auto", paddingRight: "5px" }}>
//           <ListaCarpetas
//             className="custom-scroll"
//             folders={folders}
//             currentPath={currentPath}
//             openFolder={openFolder}
//             goBack={goBack}
//           />
//         </div>

//         {/* 4. Columna Derecha: Scroll independiente */}
//         <div style={{ overflowY: "auto", paddingRight: "5px" }}>
//           <ListaPeliculas
//             className="custom-scroll"
//             base={base}
//             videos={videos}
//             openMovieInVLC={openMovieInVLC}
//             showMovieInfo={showMovieInfo}
//             currentPath={currentPath}
//             setCurrentPath={setCurrentPath}
//           />
//         </div>
//       </div>

//       {selectedMovie && (
//         <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
//       )}
//     </div>
//   );
// }

import React, { useState, useMemo } from "react"; // Añadimos useState y useMemo
import SelectorBases from "./SelectorBases";
import ListaCarpetas from "./ListaCarpetas";
import ListaPeliculas from "./ListaPeliculas";
import MovieInfoModal from "./MovieInfoModal";
import { useMarcoGeneral } from "../context/useMarcoGeneral";
import "../styles/MarcoGeneral.css";

export default function MarcoGeneral() {
  const {
    bases, base, index, currentPath, folders, videos, selectedMovie,
    setBase, setIndex, setCurrentPath,
    openFolder, goBack, openMovieInVLC, showMovieInfo, setSelectedMovie
  } = useMarcoGeneral();

  // 1. Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // 2. Lógica de filtrado (ECMA6)
  // Usamos useMemo para que solo se filtre si cambia 'videos' o 'busqueda'
  const videosFiltrados = useMemo(() => {
    if (!videos) return [];
    if (!busqueda.trim()) return videos;

    const term = busqueda.toLowerCase();
    return videos.filter(v => v.name.toLowerCase().includes(term));
  }, [videos, busqueda]);

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", overflow: "hidden", padding: "1rem" }}>

      {/* Sección Superior: Selectores y Buscador */}
      <div className="mb-3 d-flex flex-column gap-3 align-items-end w-100">
        <div style={{ flex: 1, width: "100%" }}>
          <SelectorBases
            bases={bases}
            base={base}
            index={index}
            setBase={(b) => { setBase(b); setCurrentPath(""); setBusqueda(""); }}
            setIndex={(i) => { setIndex(i); setCurrentPath(""); setBusqueda(""); }}
          />
        </div>

        {/* 3. Input de Búsqueda Integrado */}
        <div style={{ width: "100%" }}>
          <div className="input-group">
            <span className="input-group-text bg-primary text-white border-primary">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar película..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setBusqueda("")}
                type="button"
              >✕</button>
            )}
          </div>
        </div>
      </div>

      <div
        className="d-grid gap-3"
        style={{
          gridTemplateColumns: "2fr 6fr",
          flex: 1,
          minHeight: 0,
          overflow: "hidden"
        }}
      >
        <div className="custom-scroll" style={{ paddingRight: "10px" }}>
          <ListaCarpetas
            folders={folders}
            currentPath={currentPath}
            openFolder={openFolder}
            goBack={goBack}
          />
        </div>

        <div className="custom-scroll" style={{ paddingRight: "10px" }}>
          {/* 4. Pasamos los videos filtrados en lugar de los originales */}
          {/* <ListaPeliculas
            base={base}
            videos={videosFiltrados} 
            openMovieInVLC={openMovieInVLC}
            showMovieInfo={showMovieInfo}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
          /> */}
          <ListaPeliculas
            base={base}
            videos={videos} // Pasamos la lista completa
            busqueda={busqueda} // Pasamos el término de búsqueda
            openMovieInVLC={openMovieInVLC}
            showMovieInfo={showMovieInfo}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
          />
        </div>
      </div>

      {selectedMovie && (
        <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}