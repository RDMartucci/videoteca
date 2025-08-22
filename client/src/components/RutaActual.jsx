// src/components/RutaActual.jsx
import React from "react";

export default function RutaActual({ currentPath, onNavigate }) {
    const parts = currentPath ? currentPath.split("/").filter(Boolean) : [];

    return (
        <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
                <li
                    className="breadcrumb-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => onNavigate("")}
                >
                    Inicio
                </li>
                {parts.map((part, index) => {
                    const subPath = parts.slice(0, index + 1).join("/");
                    const isLast = index === parts.length - 1;
                    return (
                        <li
                            key={index}
                            className={`breadcrumb-item ${isLast ? "active" : ""}`}
                            {...(!isLast && { style: { cursor: "pointer" }, onClick: () => onNavigate(subPath) })}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {part}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
