// import TitulosContainer from "../components/TitulosContainer";
// import Titulos from "../components/TitulosContainer";
import MovieCard from "../components/MovieCard";
import React, { useEffect, useState } from "react";
import TitulosContainer from "../components/TitulosContainer";
import MovieBrowser from "../components/MovieBrowser";

export default function Home() {
    // const titulosArray = [
    // {
    //     id: 1,
    //         title: "Título 1",
    //             description: "Descripción del Título 1",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Acción - Comedia",
    //                         year: 2021
    // },
    // {
    //     id: 2,
    //         title: "Título 2",
    //             description: "Descripción del Título 2",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Aventura - Comedia",
    //                         year: 2019
    // },
    // {
    //     id: 3,
    //         title: "Título 3",
    //             description: "Descripción del Título 3",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Terror - Thriller",
    //                         year: 2020
    // },
    // {
    //     id: 4,
    //         title: "Título 4",
    //             description: "Descripción del Título 4",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Aventura - Acción",
    //                         year: 2021
    // },
    // {
    //     id: 5,
    //         title: "Título 5",
    //             description: "Descripción del Título 5",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Thriller - Drama",
    //                         year: 2010
    // },
    // {
    //     id: 6,
    //         title: "Título 6",
    //             description: "Descripción del Título 6",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Thriller - Acción",
    //                         year: 2013
    // },
    // {
    //     id: 7,
    //         title: "Título 7",
    //             description: "Descripción del Título 7",
    //                 image: "https://placehold.co/150x200",
    //                     genre: "Aventura - Acción",
    //                         year: 2015
    // }
    // ];

    //     return (
    //         <main>
    //             <section className="sec-home min-vh-100">
    //                 <TitulosContainer titulos={titulosArray}/>
    //             </section>
    //         </main>
    //     )
    // }


    // import React from "react";


    // export default function App() {
    // return (
    //     <div>
    //         <MovieCard localTitle="Inception" />
    //         <MovieCard localTitle="The Matrix" />
    //     </div>
    // );


    // const [localTitles, setLocalTitles] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/movies")
    //         .then(res => res.json())
    //         .then(data => setLocalTitles(data))
    //         setLocalTitles(data)
    //         .catch(err => console.error("Error obteniendo títulos", err));
    //         console.log("Títulos locales:", data);
    // }, []);

    return (
        <div className="container mt-4 d-flex flex-row justify-content-center align-items-center flex-wrap">
            <h2>Catálogo de Películas</h2>
            {/* {localTitles.map(title => (
                <MovieCard key={title} localTitle={title} />
            ))} */}
            {/* <MovieBrowser/> */}
            <TitulosContainer/>
        </div>
    );
}