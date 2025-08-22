// import React from "react";

// export default function CarpetasList({ folders, currentPath, openFolder, goBack }) {
//     return (
//         <div style={{ flex: 1 }}>
//             <h3>📁 Carpetas</h3>
//             <button onClick={goBack} disabled={!currentPath} className="btn btn-outline-secondary w-100 rounded-pill">
//                 ⬅ Volver
//             </button>
//             <span style={{ marginLeft: "1rem" }}>
//                 Ruta actual: {currentPath || "/"}
//             </span>
//             {folders.length > 0 ? (
//                 <ul>
//                     {folders.map((folder, idx) => (
//                         <li key={idx} style={{ marginBottom: "0.5rem" }}>
//                             <button onClick={() => openFolder(folder.name)} className="w-100 rounded-pill">
//                                 📁 {folder.name}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No hay carpetas.</p>
//             )}
//         </div>
//     );
// }

// export default function CarpetasList({ folders, currentPath, openFolder, goBack }) {
//     return (
//         <div style={{ flex: 1 }}>
//             <h3>📁 Carpetas</h3>
//             <button
//                 onClick={goBack}
//                 disabled={!currentPath}
//                 className="btn btn-outline-secondary w-100 rounded-pill"
//             >
//                 ⬅ Volver
//             </button>
//             <span style={{ marginLeft: "1rem" }}>
//                 Ruta actual: {currentPath || "/"}
//             </span>
//             {folders.length > 0 ? (
//                 <ul>
//                     {folders.map((folder, idx) => (
//                         <li key={idx} style={{ marginBottom: "0.5rem" }}>
//                             <button
//                                 onClick={() => openFolder(folder.name)}
//                                 className="w-100 rounded-pill"
//                             >
//                                 📁 {folder.name}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No hay carpetas.</p>
//             )}
//         </div>
//     );
// }

import React from 'react';

export default function ListaCarpetas({ folders, currentPath, openFolder, goBack }) {
    return (
        <div style={{ flex: 1 }}>
            <h3>📁 Carpetas</h3>
            <div style={{ marginBottom: "1rem" }}>
                <span style={{ marginLeft: "1rem" }}>Ruta actual: {currentPath || "/"}</span>
                <button onClick={goBack} disabled={!currentPath} className="btn btn-outline-secondary w-100 rounded-pill">
                    ⬅️ Volver
                </button>
                
            </div>
            {folders.length > 0 ? (
                <ul>
                    {folders.map((folder, idx) => (
                        <li key={idx} style={{ marginBottom: "0.5rem" }}>
                            <button onClick={() => openFolder(folder.name)} className='w-100 rounded-pill' >
                                📂 {folder.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay carpetas.</p>
            )}
        </div>
    );
}