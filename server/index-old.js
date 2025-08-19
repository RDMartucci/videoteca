// // // // // // // // import express from "express";
// // // // // // // // import fs from "fs";
// // // // // // // // import path from "path";
// // // // // // // // import cors from "cors";
// // // // // // // // import { fileURLToPath } from "url";

// // // // // // // // // Necesario para __dirname en ESM
// // // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // const app = express();
// // // // // // // // app.use(cors());

// // // // // // // // const PORT = 5000;

// // // // // // // // // Cambia esta ruta por la carpeta donde tienes tus películas
// // // // // // // // const MOVIES_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\"; 

// // // // // // // // app.get("/api/movies", (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const files = fs.readdirSync(MOVIES_FOLDER);
// // // // // // // //     const movieTitles = files
// // // // // // // //       .filter(file => /\.(mp4|mkv|avi)$/i.test(file)) // Filtra por extensiones de video
// // // // // // // //       .map(file => path.parse(file).name); // Nombre sin extensión
// // // // // // // //     res.json(movieTitles);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error leyendo carpeta:", error);
// // // // // // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.listen(PORT, () => {
// // // // // // // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // // // // // // });

// // // // // // // import express from "express";
// // // // // // // import fs from "fs";
// // // // // // // import path from "path";
// // // // // // // import cors from "cors";
// // // // // // // import { fileURLToPath } from "url";
// // // // // // // import { exec } from "child_process"; // Para ejecutar VLC

// // // // // // // // Necesario para __dirname en ESM
// // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // const app = express();
// // // // // // // app.use(cors());

// // // // // // // const PORT = 5000;

// // // // // // // // Carpeta raíz desde donde se permite navegar
// // // // // // // const BASE_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\";

// // // // // // // // Endpoint para listar carpetas/archivos dinámicamente
// // // // // // // app.get("/api/movies", (req, res) => {
// // // // // // //   try {
// // // // // // //     const relativePath = req.query.path || "";
// // // // // // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // // // // // //     // Seguridad: evita que el usuario salga del directorio base
// // // // // // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // // //     }

// // // // // // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // // // // // //     const items = files.map(file => {
// // // // // // //       if (file.isDirectory()) {
// // // // // // //         return { name: file.name, type: "folder" };
// // // // // // //       } else if (/\.(mp4|mkv|avi)$/i.test(file.name)) {
// // // // // // //         return { name: file.name, type: "movie" };
// // // // // // //       } else {
// // // // // // //         return { name: file.name, type: "file" };
// // // // // // //       }
// // // // // // //     });

// // // // // // //     res.json({
// // // // // // //       currentPath: relativePath,
// // // // // // //       items
// // // // // // //     });

// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error leyendo carpeta:", error);
// // // // // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Endpoint para abrir una película en VLC
// // // // // // // app.get("/api/play", (req, res) => {
// // // // // // //   try {
// // // // // // //     const relativePath = req.query.path;
// // // // // // //     if (!relativePath) {
// // // // // // //       return res.status(400).json({ error: "Falta el parámetro path" });
// // // // // // //     }

// // // // // // //     const fullPath = path.join(BASE_FOLDER, relativePath);

// // // // // // //     // Seguridad
// // // // // // //     if (!fullPath.startsWith(BASE_FOLDER)) {
// // // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // // //     }

// // // // // // //     // Ruta a VLC (Windows). Asegúrate de que esté correcta en tu PC.
// // // // // // //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// // // // // // //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// // // // // // //       if (err) {
// // // // // // //         console.error("Error ejecutando VLC:", err);
// // // // // // //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// // // // // // //       }
// // // // // // //       console.log("✅ VLC abierto:", fullPath);
// // // // // // //       res.json({ success: true });
// // // // // // //     });

// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error:", error);
// // // // // // //     res.status(500).json({ error: "Error al intentar abrir la película" });
// // // // // // //   }
// // // // // // // });

// // // // // // // app.listen(PORT, () => {
// // // // // // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // // // // // });

// // // // // // import express from "express";
// // // // // // import fs from "fs";
// // // // // // import path from "path";
// // // // // // import cors from "cors";
// // // // // // import { fileURLToPath } from "url";
// // // // // // import { exec } from "child_process"; // Para ejecutar VLC

// // // // // // // Necesario para __dirname en ESM
// // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // const __dirname = path.dirname(__filename);

// // // // // // const app = express();
// // // // // // app.use(cors());

// // // // // // const PORT = 5000;

// // // // // // // Carpeta raíz desde donde se permite navegar
// // // // // // const BASE_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\";

// // // // // // // Endpoint para listar carpetas/archivos dinámicamente
// // // // // // app.get("/api/movies", (req, res) => {
// // // // // //   try {
// // // // // //     const relativePath = req.query.path || "";
// // // // // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // // // // //     // Seguridad: evita que el usuario salga del directorio base
// // // // // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // //     }

// // // // // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // // // // //     const items = files.map(file => {
// // // // // //       if (file.isDirectory()) {
// // // // // //         return { name: file.name, type: "folder" };
// // // // // //       } else if (/\.(mp4|mkv|avi)$/i.test(file.name)) {
// // // // // //         return { name: file.name, type: "movie" };
// // // // // //       } else {
// // // // // //         return { name: file.name, type: "file" };
// // // // // //       }
// // // // // //     });

// // // // // //     res.json({
// // // // // //       currentPath: relativePath,
// // // // // //       items
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("Error leyendo carpeta:", error);
// // // // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // // // //   }
// // // // // // });

// // // // // // // Endpoint para abrir una película en VLC
// // // // // // app.get("/api/play", (req, res) => {
// // // // // //   try {
// // // // // //     const relativePath = req.query.path;
// // // // // //     if (!relativePath) {
// // // // // //       return res.status(400).json({ error: "Falta el parámetro path" });
// // // // // //     }

// // // // // //     const fullPath = path.join(BASE_FOLDER, relativePath);

// // // // // //     // Seguridad
// // // // // //     if (!fullPath.startsWith(BASE_FOLDER)) {
// // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // //     }

// // // // // //     // Ruta a VLC (Windows). Asegúrate de que esté correcta en tu PC.
// // // // // //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// // // // // //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// // // // // //       if (err) {
// // // // // //         console.error("Error ejecutando VLC:", err);
// // // // // //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// // // // // //       }
// // // // // //       console.log("✅ VLC abierto:", fullPath);
// // // // // //       res.json({ success: true });
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("Error:", error);
// // // // // //     res.status(500).json({ error: "Error al intentar abrir la película" });
// // // // // //   }
// // // // // // });

// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // // // // });

// // // // // // import express from "express";
// // // // // // import fs from "fs";
// // // // // // import path from "path";
// // // // // // import cors from "cors";
// // // // // // import { fileURLToPath } from "url";
// // // // // // import { exec } from "child_process";

// // // // // // // Necesario para __dirname en ESM
// // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // const __dirname = path.dirname(__filename);

// // // // // // const app = express();
// // // // // // app.use(cors());

// // // // // // const PORT = 5000;

// // // // // // // Carpeta base donde buscar
// // // // // // const BASE_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\";

// // // // // // // 📂 Listar carpetas y películas
// // // // // // app.get("/api/movies", (req, res) => {
// // // // // //   try {
// // // // // //     const relativePath = req.query.path || "";
// // // // // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // // // // //     // Seguridad: evitar salir del BASE_FOLDER
// // // // // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // //     }

// // // // // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // // // // //     const items = files.map(file => {
// // // // // //       if (file.isDirectory()) {
// // // // // //         return { name: file.name, type: "folder" };
// // // // // //       } else if (/\.(mp4|mkv|avi)$/i.test(file.name)) {
// // // // // //         return { name: file.name, type: "movie" };
// // // // // //       } else {
// // // // // //         return { name: file.name, type: "file" };
// // // // // //       }
// // // // // //     });

// // // // // //     res.json({ currentPath: relativePath, items });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error leyendo carpeta:", error);
// // // // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // // // //   }
// // // // // // });

// // // // // // // ▶ Abrir película en VLC
// // // // // // app.get("/api/play", (req, res) => {
// // // // // //   try {
// // // // // //     const relativePath = req.query.path;
// // // // // //     if (!relativePath) {
// // // // // //       return res.status(400).json({ error: "Falta el parámetro path" });
// // // // // //     }

// // // // // //     const fullPath = path.join(BASE_FOLDER, relativePath);

// // // // // //     // Seguridad
// // // // // //     if (!fullPath.startsWith(BASE_FOLDER)) {
// // // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // // //     }

// // // // // //     // Ruta a VLC (ajustar si está en otro lugar)
// // // // // //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// // // // // //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// // // // // //       if (err) {
// // // // // //         console.error("Error ejecutando VLC:", err);
// // // // // //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// // // // // //       }
// // // // // //       console.log("✅ VLC abierto:", fullPath);
// // // // // //       res.json({ success: true });
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("Error:", error);
// // // // // //     res.status(500).json({ error: "Error al intentar abrir la película" });
// // // // // //   }
// // // // // // });

// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // // // // });

// // // // // // 📂 Listar carpetas y películas
// // // // // app.get("/api/movies", (req, res) => {
// // // // //   try {
// // // // //     const relativePath = req.query.path || "";
// // // // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // // // //     // Seguridad: evitar salir del BASE_FOLDER
// // // // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // // //     }

// // // // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // // // //     // 🔹 Filtrar archivos con extensión .srt
// // // // //     const filteredFiles = files.filter(file => !/\.srt$/i.test(file.name));

// // // // //     const items = filteredFiles.map(file => {
// // // // //       if (file.isDirectory()) {
// // // // //         return { name: file.name, type: "folder" };
// // // // //       } else if (/\.(mp4|mkv|avi)$/i.test(file.name)) {
// // // // //         return { name: file.name, type: "movie" };
// // // // //       } else {
// // // // //         return { name: file.name, type: "file" };
// // // // //       }
// // // // //     });

// // // // //     res.json({ currentPath: relativePath, items });
// // // // //   } catch (error) {
// // // // //     console.error("Error leyendo carpeta:", error);
// // // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // // //   }
// // // // // });

// // // // import express from "express";
// // // // import fs from "fs";
// // // // import path from "path";
// // // // import cors from "cors";
// // // // import { fileURLToPath } from "url";
// // // // import { exec } from "child_process";

// // // // // Necesario para __dirname en ESM
// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // const app = express();
// // // // app.use(cors());

// // // // const PORT = 5000;

// // // // // 📌 Carpeta base donde buscar
// // // // const BASE_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\";

// // // // // 📌 Función para cargar configuración en cada request
// // // // function loadConfig() {
// // // //   try {
// // // //     const configPath = path.join(__dirname, "config.json");
// // // //     const configData = fs.readFileSync(configPath, "utf-8");
// // // //     const config = JSON.parse(configData);

// // // //     if (Array.isArray(config.allowedVideoExtensions)) {
// // // //       return config.allowedVideoExtensions.map(ext => ext.toLowerCase());
// // // //     } else {
// // // //       console.warn("⚠ El campo 'allowedVideoExtensions' no es un array en config.json.");
// // // //       return [];
// // // //     }
// // // //   } catch (err) {
// // // //     console.error("❌ Error cargando config.json:", err);
// // // //     return [];
// // // //   }
// // // // }

// // // // // 📂 Listar carpetas y películas
// // // // app.get("/api/movies", (req, res) => {
// // // //   try {
// // // //     // 🔹 Cargar extensiones permitidas al momento de cada request
// // // //     const ALLOWED_VIDEO_EXTENSIONS = loadConfig();

// // // //     const relativePath = req.query.path || "";
// // // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // // //     // 🔒 Seguridad: evitar salir del BASE_FOLDER
// // // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // //     }

// // // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // // //     // 🔹 Filtrar: solo carpetas o archivos con extensión de video permitida
// // // //     const filteredFiles = files.filter(file => {
// // // //       if (file.isDirectory()) return true;
// // // //       const ext = path.extname(file.name).toLowerCase();
// // // //       return ALLOWED_VIDEO_EXTENSIONS.includes(ext);
// // // //     });

// // // //     // 🔹 Mapear tipo de ítem
// // // //     const items = filteredFiles.map(file => {
// // // //       if (file.isDirectory()) {
// // // //         return { name: file.name, type: "folder" };
// // // //       } else {
// // // //         return { name: file.name, type: "movie" };
// // // //       }
// // // //     });

// // // //     // 🔹 Ordenar: carpetas primero, luego películas (orden alfabético)
// // // //     items.sort((a, b) => {
// // // //       if (a.type === b.type) {
// // // //         return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
// // // //       }
// // // //       return a.type === "folder" ? -1 : 1;
// // // //     });

// // // //     res.json({ currentPath: relativePath, items });
// // // //   } catch (error) {
// // // //     console.error("Error leyendo carpeta:", error);
// // // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // // //   }
// // // // });

// // // // // ▶ Abrir película en VLC
// // // // app.get("/api/play", (req, res) => {
// // // //   try {
// // // //     const relativePath = req.query.path;
// // // //     if (!relativePath) {
// // // //       return res.status(400).json({ error: "Falta el parámetro path" });
// // // //     }

// // // //     const fullPath = path.join(BASE_FOLDER, relativePath);

// // // //     // 🔒 Seguridad
// // // //     if (!fullPath.startsWith(BASE_FOLDER)) {
// // // //       return res.status(403).json({ error: "Acceso no permitido" });
// // // //     }

// // // //     // 📌 Ruta a VLC (ajustar si está en otro lugar)
// // // //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// // // //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// // // //       if (err) {
// // // //         console.error("Error ejecutando VLC:", err);
// // // //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// // // //       }
// // // //       console.log("✅ VLC abierto:", fullPath);
// // // //       res.json({ success: true });
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("Error:", error);
// // // //     res.status(500).json({ error: "Error al intentar abrir la película" });
// // // //   }
// // // // });

// // // // app.listen(PORT, () => {
// // // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // // });

// // // import express from "express";
// // // import fs from "fs";
// // // import path from "path";
// // // import cors from "cors";
// // // import { fileURLToPath } from "url";
// // // import { exec } from "child_process";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // const app = express();
// // // app.use(cors());

// // // const PORT = 5000;
// // // // const BASE_FOLDER = "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\";
// // // // const BASE_FOLDER = "E:\\DESCARGAS 2\\DETorrent";
// // // // Ejemplo de múltiples ubicaciones
// // // const BASE_FOLDERS = {
// // //   peliculas: ["F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\","E:\\DESCARGAS 2\\--PELICULAS II","E:\\DESCARGAS 2\\DETorrent"],
// // //   series: ["D:\\Series\\","E:\\DESCARGAS 2\\--SERIES II"]
// // // };



// // // // 🔹 Endpoint para listar ubicaciones
// // // app.get("/api/bases", (req, res) => {
// // //   // res.json(Object.keys(BASE_FOLDERS));
// // // });


// // // // 📌 Cargar configuración
// // // function loadConfig() {
// // //   try {
// // //     const configPath = path.join(__dirname, "config.json");
// // //     const configData = fs.readFileSync(configPath, "utf-8");
// // //     const config = JSON.parse(configData);
// // //     if (Array.isArray(config.allowedVideoExtensions)) {
// // //       return config.allowedVideoExtensions.map(ext => ext.toLowerCase());
// // //     }
// // //   } catch (err) {
// // //     console.error("❌ Error cargando config.json:", err);
// // //   }
// // //   return [];
// // // }

// // // // 📂 Listar carpetas y películas
// // // app.get("/api/movies", (req, res) => {
// // //   try {
// // //     const ALLOWED_VIDEO_EXTENSIONS = loadConfig();
// // //     const relativePath = req.query.path || "";
// // //     const targetPath = path.join(BASE_FOLDER, relativePath);

// // //     if (!targetPath.startsWith(BASE_FOLDER)) {
// // //       return res.status(403).json({ error: "Acceso no permitido" });
// // //     }

// // //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// // //     const folders = [];
// // //     const movies = [];

// // //     files.forEach(file => {
// // //       if (file.isDirectory()) {
// // //         folders.push({ name: file.name, type: "folder" });
// // //       } else {
// // //         const ext = path.extname(file.name).toLowerCase();
// // //         if (ALLOWED_VIDEO_EXTENSIONS.includes(ext)) {
// // //           movies.push({ name: file.name, type: "movie" });
// // //         }
// // //       }
// // //     });

// // //     // Ordenar cada lista
// // //     folders.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
// // //     movies.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));

// // //     res.json({ currentPath: relativePath, folders, movies });
// // //   } catch (error) {
// // //     console.error("Error leyendo carpeta:", error);
// // //     res.status(500).json({ error: "Error leyendo carpeta" });
// // //   }
// // // });

// // // // ▶ Abrir película en VLC
// // // app.get("/api/play", (req, res) => {
// // //   try {
// // //     const relativePath = req.query.path;
// // //     if (!relativePath) {
// // //       return res.status(400).json({ error: "Falta el parámetro path" });
// // //     }

// // //     const fullPath = path.join(BASE_FOLDER, relativePath);

// // //     if (!fullPath.startsWith(BASE_FOLDER)) {
// // //       return res.status(403).json({ error: "Acceso no permitido" });
// // //     }

// // //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// // //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// // //       if (err) {
// // //         console.error("Error ejecutando VLC:", err);
// // //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// // //       }
// // //       console.log("✅ VLC abierto:", fullPath);
// // //       res.json({ success: true });
// // //     });

// // //   } catch (error) {
// // //     console.error("Error:", error);
// // //     res.status(500).json({ error: "Error al intentar abrir la película" });
// // //   }
// // // });

// // // app.listen(PORT, () => {
// // //   console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
// // // });



// // /*********************************************************************** */
// // const express = require("express");
// // const fs = require("fs");
// // const path = require("path");
// // const cors = require("cors");
// // const { exec } = require("child_process");

// // const app = express();
// // const PORT = 5000;

// // // 🔹 Carpetas base (categorías)
// // const BASE_FOLDERS = {
// //   peliculas: [
// //     "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\",
// //     "E:\\DESCARGAS 2\\--PELICULAS II",
// //     "E:\\DESCARGAS 2\\DETorrent"
// //   ],
// //   series: [
// //     "D:\\Series\\",
// //     "E:\\DESCARGAS 2\\--SERIES II"
// //   ]
// // };

// // // 🔹 Extensiones permitidas
// // function loadConfig() {
// //   return [".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".mpeg", ".mpg"];
// // }

// // app.use(cors());
// // app.use(express.json());

// // // 📌 Obtener lista de bases
// // app.get("/api/bases", (req, res) => {
// //   res.json(BASE_FOLDERS);
// // });

// // // 📌 Listar carpetas y películas
// // app.get("/api/movies", (req, res) => {
// //   try {
// //     const ALLOWED_VIDEO_EXTENSIONS = loadConfig();

// //     const baseKey = req.query.base || "peliculas";
// //     const index = parseInt(req.query.index || "0", 10);

// //     const baseList = BASE_FOLDERS[baseKey];
// //     if (!baseList || !baseList[index]) {
// //       return res.status(400).json({ error: "Base o índice inválido" });
// //     }
// //     const BASE_FOLDER = baseList[index];

// //     const relativePath = req.query.path || "";
// //     const targetPath = path.join(BASE_FOLDER, relativePath);

// //     if (!targetPath.startsWith(BASE_FOLDER)) {
// //       return res.status(403).json({ error: "Acceso no permitido" });
// //     }

// //     const files = fs.readdirSync(targetPath, { withFileTypes: true });

// //     const folders = [];
// //     const movies = [];

// //     files.forEach(file => {
// //       if (file.isDirectory()) {
// //         folders.push({ name: file.name, type: "folder" });
// //       } else {
// //         const ext = path.extname(file.name).toLowerCase();
// //         if (ALLOWED_VIDEO_EXTENSIONS.includes(ext)) {
// //           movies.push({ name: file.name, type: "movie" });
// //         }
// //       }
// //     });

// //     folders.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
// //     movies.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));

// //     res.json({
// //       currentPath: relativePath,
// //       folders,
// //       movies,
// //       base: baseKey,
// //       index
// //     });
// //   } catch (error) {
// //     console.error("Error leyendo carpeta:", error);
// //     res.status(500).json({ error: "Error leyendo carpeta" });
// //   }
// // });

// // // 📌 Reproducir película en VLC
// // app.get("/api/play", (req, res) => {
// //   try {
// //     const baseKey = req.query.base || "peliculas";
// //     const index = parseInt(req.query.index || "0", 10);

// //     const baseList = BASE_FOLDERS[baseKey];
// //     if (!baseList || !baseList[index]) {
// //       return res.status(400).json({ error: "Base o índice inválido" });
// //     }
// //     const BASE_FOLDER = baseList[index];

// //     const relativePath = req.query.path;
// //     if (!relativePath) {
// //       return res.status(400).json({ error: "Falta el parámetro path" });
// //     }

// //     const fullPath = path.join(BASE_FOLDER, relativePath);

// //     if (!fullPath.startsWith(BASE_FOLDER)) {
// //       return res.status(403).json({ error: "Acceso no permitido" });
// //     }

// //     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

// //     exec(`${vlcPath} "${fullPath}"`, (err) => {
// //       if (err) {
// //         console.error("Error ejecutando VLC:", err);
// //         return res.status(500).json({ error: "No se pudo abrir VLC" });
// //       }
// //       console.log("✅ VLC abierto:", fullPath);
// //       res.json({ success: true });
// //     });

// //   } catch (error) {
// //     console.error("Error:", error);
// //     res.status(500).json({ error: "Error al intentar abrir la película" });
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
// // });


// /********************************************************************* */
// /********************************************************************* */
// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");
// const { exec } = require("child_process");

// const app = express();
// const PORT = 5000;

// // 🔹 Carpetas base (categorías)
// const BASE_FOLDERS = {
//   peliculas: [
//     "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\",
//     "E:\\DESCARGAS 2\\--PELICULAS II",
//     "E:\\DESCARGAS 2\\DETorrent"
//   ],
//   series: [
//     "D:\\Series\\",
//     "E:\\DESCARGAS 2\\--SERIES II"
//   ]
// };

// // 🔹 Extensiones permitidas
// function loadConfig() {
//   return [".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".mpeg", ".mpg"];
// }

// app.use(cors());
// app.use(express.json());

// // 📌 Obtener lista de bases
// app.get("/api/bases", (req, res) => {
//   res.json(BASE_FOLDERS);
// });

// // 📌 Listar carpetas y películas
// app.get("/api/movies", (req, res) => {
//   try {
//     const ALLOWED_VIDEO_EXTENSIONS = loadConfig();

//     const baseKey = req.query.base || "peliculas";
//     const index = parseInt(req.query.index || "0", 10);

//     const baseList = BASE_FOLDERS[baseKey];
//     if (!baseList || !baseList[index]) {
//       return res.status(400).json({ error: "Base o índice inválido" });
//     }
//     const BASE_FOLDER = baseList[index];

//     const relativePath = req.query.path || "";
//     const targetPath = path.join(BASE_FOLDER, relativePath);

//     if (!targetPath.startsWith(BASE_FOLDER)) {
//       return res.status(403).json({ error: "Acceso no permitido" });
//     }

//     const files = fs.readdirSync(targetPath, { withFileTypes: true });

//     const folders = [];
//     const movies = [];

//     files.forEach(file => {
//       if (file.isDirectory()) {
//         folders.push({ name: file.name, type: "folder" });
//       } else {
//         const ext = path.extname(file.name).toLowerCase();
//         if (ALLOWED_VIDEO_EXTENSIONS.includes(ext)) {
//           movies.push({ name: file.name, type: "movie" });
//         }
//       }
//     });

//     folders.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
//     movies.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));

//     res.json({
//       currentPath: relativePath,
//       folders,
//       movies,
//       base: baseKey,
//       index
//     });
//   } catch (error) {
//     console.error("Error leyendo carpeta:", error);
//     res.status(500).json({ error: "Error leyendo carpeta" });
//   }
// });

// // 📌 Reproducir película en VLC
// app.get("/api/play", (req, res) => {
//   try {
//     const baseKey = req.query.base || "peliculas";
//     const index = parseInt(req.query.index || "0", 10);

//     const baseList = BASE_FOLDERS[baseKey];
//     if (!baseList || !baseList[index]) {
//       return res.status(400).json({ error: "Base o índice inválido" });
//     }
//     const BASE_FOLDER = baseList[index];

//     const relativePath = req.query.path;
//     if (!relativePath) {
//       return res.status(400).json({ error: "Falta el parámetro path" });
//     }

//     const fullPath = path.join(BASE_FOLDER, relativePath);

//     if (!fullPath.startsWith(BASE_FOLDER)) {
//       return res.status(403).json({ error: "Acceso no permitido" });
//     }

//     const vlcPath = `"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"`;

//     exec(`${vlcPath} "${fullPath}"`, (err) => {
//       if (err) {
//         console.error("Error ejecutando VLC:", err);
//         return res.status(500).json({ error: "No se pudo abrir VLC" });
//       }
//       console.log("✅ VLC abierto:", fullPath);
//       res.json({ success: true });
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Error al intentar abrir la película" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
// });



/************************************ */
/************************************ */
/************************************ */
// import express, { json } from 'express';
// import { join, extname } from 'path';
// import { promises as fs } from 'fs';
// import { spawn } from 'child_process';



// const app = express();
// const PORT = 5000;

// // Definición de las carpetas base
// // Puedes ajustar las rutas según tu sistema
// const BASE_FOLDERS = {
//     'peliculas1': join(__dirname, 'F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\'),
//     'peliculas2': join(__dirname, 'E:\\DESCARGAS 2\\--PELICULAS II'),
//     'series1': join(__dirname, 'F:\\DESCARGAS COMPLETAS\\_020__SERIES__\\'),
//     'series2': join(__dirname, 'E:\\DESCARGAS 2\\--SERIES II"'),
//     'torrent': join(__dirname, 'E:\\DESCARGAS 2\\DETorrent'),
// };

// app.use(json());

// // Endpoint para obtener la lista de BASE_FOLDERS
// app.get('/api/bases', (req, res) => {
//     res.json(BASE_FOLDERS);
// });

// // Endpoint para obtener las carpetas y películas de una ruta
// app.get('/api/movies', async (req, res) => {
//     const { base, path: currentPath } = req.query;
//     const basePath = BASE_FOLDERS[base];

//     if (!basePath) {
//         return res.status(400).json({ error: 'Base no válida' });
//     }

//     const fullPath = join(basePath, decodeURIComponent(currentPath || ''));

//     try {
//         const items = await fs.readdir(fullPath, { withFileTypes: true });

//         const folders = [];
//         const movies = [];

//         for (const item of items) {
//             if (item.isDirectory()) {
//                 folders.push({ name: item.name, type: 'folder' });
//             } else if (item.isFile() && ['.mp4', '.mkv', '.avi'].includes(extname(item.name).toLowerCase())) {
//                 movies.push({ name: item.name, type: 'movie' });
//             }
//         }

//         res.json({ folders, movies });
//     } catch (err) {
//         console.error('Error al leer el directorio:', err);
//         res.status(500).json({ error: 'Error al cargar la carpeta.' });
//     }
// });

// // Endpoint para reproducir un archivo en VLC
// app.get('/api/play', (req, res) => {
//     const { base, path: filePath } = req.query;
//     const basePath = BASE_FOLDERS[base];
//     const fullPath = join(basePath, decodeURIComponent(filePath));

//     spawn('vlc', [fullPath], { detached: true, stdio: 'ignore' }).unref();

//     res.send('Comando de reproducción enviado.');
// });

// app.listen(PORT, () => {
//     console.log(`Servidor de películas escuchando en http://localhost:${PORT}`);
// });


/*************************************************************************** */
/*************************************************************************** */
import express, { json } from 'express';
import { join, extname, dirname } from 'path';
import { promises as fs } from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

// Configuración específica de CORS para permitir solo tu cliente
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Obtén __filename y __dirname para el entorno de ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 5000;

// Definición de las carpetas base
// Ahora que __dirname está definido, esta parte funcionará correctamente
// const BASE_FOLDERS = {
//     'peliculas1': join(__dirname, 'F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\'),
//     'peliculas2': join(__dirname, 'E:\\DESCARGAS 2\\--PELICULAS II'),
//     'series1': join(__dirname, 'F:\\DESCARGAS COMPLETAS\\_020__SERIES__\\'),
//     'series2': join(__dirname, 'E:\\DESCARGAS 2\\--SERIES II"'),
//     'torrent': join(__dirname, 'E:\\DESCARGAS 2\\DETorrent'),
// };
const BASE_FOLDERS = {
  peliculas: [
    "F:\\DESCARGAS COMPLETAS\\_010__PELICULAS__\\",
    "E:\\DESCARGAS 2\\--PELICULAS II",
    "E:\\DESCARGAS 2\\DETorrent"
  ],
  series: [
    "F:\\DESCARGAS COMPLETAS\\_020__SERIES__\\",
    "E:\\DESCARGAS 2\\--SERIES II"
  ]
};

app.use(json());

// Endpoint para obtener la lista de BASE_FOLDERS
// app.get('/api/bases', (req, res) => {
//     res.json(BASE_FOLDERS);
// });
app.get('/api/bases', (req, res) => {
  res.json(BASE_FOLDERS);
});

// Endpoint para obtener las carpetas y películas de una ruta
// app.get('/api/movies', async (req, res) => {
//     const { base, path: currentPath } = req.query;
//     const basePath = BASE_FOLDERS[base];

//     if (!basePath) {
//         return res.status(400).json({ error: 'Base no válida' });
//     }

//     const fullPath = join(basePath, decodeURIComponent(currentPath || ''));

//     try {
//         const items = await fs.readdir(fullPath, { withFileTypes: true });

//         const folders = [];
//         const movies = [];

//         for (const item of items) {
//             if (item.isDirectory()) {
//                 folders.push({ name: item.name, type: 'folder' });
//             } else if (item.isFile() && ['.mp4', '.mkv', '.avi'].includes(extname(item.name).toLowerCase())) {
//                 movies.push({ name: item.name, type: 'movie' });
//             }
//         }

//         res.json({ folders, movies });
//     } catch (err) {
//         console.error('Error al leer el directorio:', err);
//         res.status(500).json({ error: 'Error al cargar la carpeta.' });
//     }
// });
app.get('/api/movies', async (req, res) => {
  const { base, index, path: currentPath } = req.query;

  if (!BASE_FOLDERS[base] || !BASE_FOLDERS[base][index]) {
    return res.status(400).json({ error: 'Base o índice no válido' });
  }

  const basePath = BASE_FOLDERS[base][index];
  const fullPath = join(basePath, decodeURIComponent(currentPath || ''));

  try {
    const items = await fs.readdir(fullPath, { withFileTypes: true });

    const folders = [];
    const movies = [];

    for (const item of items) {
      if (item.isDirectory()) {
        folders.push({ name: item.name, type: 'folder' });
      } else if (
        item.isFile() &&
        ['.mp4', '.mkv', '.avi'].includes(extname(item.name).toLowerCase())
      ) {
        movies.push({ name: item.name, type: 'movie' });
      }
    }

    res.json({ folders, movies });
  } catch (err) {
    console.error('Error al leer el directorio:', err);
    res.status(500).json({ error: 'Error al cargar la carpeta.' });
  }
});

// Endpoint para reproducir un archivo en VLC
// app.get('/api/play', (req, res) => {
//     const { base, path: filePath } = req.query;
//     const basePath = BASE_FOLDERS[base];
//     const fullPath = join(basePath, decodeURIComponent(filePath));

//     spawn('vlc', [fullPath], { detached: true, stdio: 'ignore' }).unref();

//     res.send('Comando de reproducción enviado.');
// });
app.get('/api/play', (req, res) => {
  const { base, index, path: filePath } = req.query;

  if (!BASE_FOLDERS[base] || !BASE_FOLDERS[base][index]) {
    return res.status(400).json({ error: 'Base o índice no válido' });
  }

  const basePath = BASE_FOLDERS[base][index];
  const fullPath = join(basePath, decodeURIComponent(filePath));

  spawn('vlc', [fullPath], { detached: true, stdio: 'ignore' }).unref();

  res.send('Comando de reproducción enviado.');
});

app.listen(PORT, () => {
    console.log(`Servidor de películas escuchando en http://localhost:${PORT}`);
});