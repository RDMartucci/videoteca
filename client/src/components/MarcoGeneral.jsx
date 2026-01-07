// /***************************************************** */
// // Refactor con hook personalizado (tipo context)
// /***************************************************** */

// import React from "react";
// import SelectorBases from "./SelectorBases";
// import ListaCarpetas from "./ListaCarpetas";
// import ListaPeliculas from "./ListaPeliculas";
// import MovieInfoModal from "./MovieInfoModal";
// import { useMarcoGeneral } from "../context/useMarcoGeneral";

// export default function MarcoGeneral() {
//   const {
//     bases, base, index, currentPath, folders, videos, selectedMovie,
//     setBase, setIndex, setCurrentPath,
//     openFolder, goBack, openMovieInVLC, showMovieInfo, setSelectedMovie
//   } = useMarcoGeneral();

//   return (
//     <div className="d-flex flex-column p-3">
//       {/* SelectorBases fijo */}
//       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff" }}>
//         <SelectorBases
//           bases={bases}
//           base={base}
//           index={index}
//           setBase={(b) => { setBase(b); setCurrentPath(""); }}
//           setIndex={(i) => { setIndex(i); setCurrentPath(""); }}
//         />
//       </div>

//       <div className="d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "2fr 6fr" }}>
//         <ListaCarpetas
//           folders={folders}
//           currentPath={currentPath}
//           openFolder={openFolder}
//           goBack={goBack}
//         />
//         <ListaPeliculas
//           base={base}
//           videos={videos}
//           openMovieInVLC={openMovieInVLC}
//           showMovieInfo={showMovieInfo}
//           currentPath={currentPath}
//           setCurrentPath={setCurrentPath}
//         />
//       </div>

//       {selectedMovie && (
//         <MovieInfoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
//       )}
//     </div>
//   );
// }

// /***************************************************** */
// // Refactor con hook personalizado (tipo context)
// /***************************************************** */

import React from "react";
import SelectorBases from "./SelectorBases";
import ListaCarpetas from "./ListaCarpetas";
import ListaPeliculas from "./ListaPeliculas";
import MovieInfoModal from "./MovieInfoModal";
import { useMarcoGeneral } from "../context/useMarcoGeneral";

export default function MarcoGeneral() {
  const {
    bases, base, index, currentPath, folders, videos, selectedMovie,
    setBase, setIndex, setCurrentPath,
    openFolder, goBack, openMovieInVLC, showMovieInfo, setSelectedMovie
  } = useMarcoGeneral();

  return (
    /* 1. Contenedor principal: Altura total de la pantalla y ocultamos el scroll global */
    <div className="d-flex flex-column" style={{ height: "90vh", overflow: "hidden", padding: "1rem" }}>
      
      {/* SelectorBases: Se mantiene arriba */}
      <div style={{ marginBottom: "1rem" }}>
        <SelectorBases
          bases={bases}
          base={base}
          index={index}
          setBase={(b) => { setBase(b); setCurrentPath(""); }}
          setIndex={(i) => { setIndex(i); setCurrentPath(""); }}
        />
      </div>

      {/* 2. El Grid: Debe ocupar el resto del espacio disponible (flex: 1) */}
      <div 
        className="d-grid gap-3" 
        style={{ 
          gridTemplateColumns: "2fr 6fr", 
          flex: 1,             // Ocupa todo el alto restante
          minHeight: 0,        // Truco de Flexbox para permitir que los hijos midan menos que el contenido
          overflow: "hidden"   // Evita que el grid mismo crezca
        }}
      >
        {/* 3. Columna Izquierda: Scroll independiente */}
        <div style={{ overflowY: "auto", paddingRight: "5px" }}>
          <ListaCarpetas
            folders={folders}
            currentPath={currentPath}
            openFolder={openFolder}
            goBack={goBack}
          />
        </div>

        {/* 4. Columna Derecha: Scroll independiente */}
        <div style={{ overflowY: "auto", paddingRight: "5px" }}>
          <ListaPeliculas
            base={base}
            videos={videos}
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