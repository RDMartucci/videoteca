// src/components/SelectorBases.jsx
import React from "react";

export default function SelectorBases({ bases, base, index, setBase, setIndex }) {
    return (
        <div className="selector-bases d-grid gap-3 mb-3 pb-3 bg-dark" style={{ gridTemplateColumns: "1fr 5fr" }}>
            <label>
                Categoría
                <select
                    value={base}
                    onChange={(e) => {
                        setBase(e.target.value);
                        setIndex(0);
                    }}
                    className="form-select p-1 rounded-2"
                >
                    {Object.keys(bases).map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </label>

            {base && (
                <label className="me-2 ">
                    Ruta
                    <select
                        value={index}
                        onChange={(e) => setIndex(Number(e.target.value))}
                        className="form-select p-1 rounded-2"
                    >
                        {bases[base].map((ruta, i) => (
                            <option key={i} value={i}>
                                {ruta}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
}
