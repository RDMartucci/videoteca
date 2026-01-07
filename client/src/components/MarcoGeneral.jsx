/***************************************************** */
// Refactor con hook personalizado (tipo context)
/***************************************************** */

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

      <div className="d-grid gap-3 mb-3 pb-3" style={{ gridTemplateColumns: "2fr 6fr" }}>
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
