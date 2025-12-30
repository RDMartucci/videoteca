import express, { json } from "express";
import { join, extname } from "path";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import cors from "cors";

const app = express();
app.use(json());

// 🔓 Configuración de CORS: permitir solo el cliente.
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = 5000;

// 📂 Carpetas base donde se encuentran los directorios locales.
const BASE_FOLDERS = {
  peliculas: [
    "E:\\DESCARGAS 2\\--PELICULAS II",
    "F:\\dTorrents\\PELICULAS y SERIES\\PELICULAS"
  ],
  series: [
    "F:\\dTorrents\\PELICULAS y SERIES\\SERIES",
    "E:\\DESCARGAS 2\\--SERIES II",
    
  ],
  otros: [
    "E:\\",
    "F:\\",
    "H:\\",
    "J:\\",
    "C:\\Users\\bubito\\Downloads",
    "C:\\Users\\bubito\\Videos"
  ],
};

// 📌 Endpoint: obtener rutas bases -> base 
// (index[0]=películas, index[1]=series) y path (ruta relativa).
app.get("/api/bases", (req, res) => {
  res.json(BASE_FOLDERS);
});

// 📌 Endpoint: listar carpetas y películas según la ruta.
// La nombré videos pero son archivos leídos de las carpetas base.
app.get("/api/videos", async (req, res) => {
  const { base, index, path: currentPath } = req.query;

  if (!BASE_FOLDERS[base] || !BASE_FOLDERS[base][index]) {
    return res.status(400).json({ error: "Base o índice no válido" });
  }

  const basePath = BASE_FOLDERS[base][index];
  console.log("SERVER->apiVideos->Base Path:", basePath, "Current Path:", currentPath);

  const fullPath = join(basePath, decodeURIComponent(currentPath || ""));
  console.log("SERVER->apiVideos->Full Path:", fullPath);

  try {
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    console.log(`Items encontrados en ${fullPath}:`, items.map(i => i.name));

    const folders = [];
    const videos = [];

    for (const item of items) {
      console.log("Item:", item.name, "Type:", item.isDirectory() ? "Folder" : "File");

      if (item.isDirectory()) {
        folders.push({ name: item.name, type: "folder" });
        //console.log("Folder found:", item.name);
      } else if (
        //console.log("File found:", item.name),
        item.isFile() &&
        [".mp4", ".mkv", ".avi"].includes(extname(item.name).toLowerCase())
      ) {
        // videos.push({ name: item.name, type: "movie" });
        videos.push({ name: item.name, type: "video" });
        //console.log("Video found:", item.name);
      }
    }

    res.json({ folders, videos });
  } catch (err) {
    console.error("❌ Error al leer el directorio:", err);
    res.status(500).json({ error: "Error al cargar la carpeta." });
  }
});

// 📌 Endpoint: reproducir en VLC
app.get("/api/play", (req, res) => {
  const { base, index, path: filePath } = req.query;

  if (!BASE_FOLDERS[base] || !BASE_FOLDERS[base][index]) {
    return res.status(400).json({ error: "Base o índice no válido" });
  }

  const basePath = BASE_FOLDERS[base][index];
  const fullPath = join(basePath, decodeURIComponent(filePath));

  // ⚡ Abrir VLC (asegurate de que esté en el PATH del sistema)
  // spawn("vlc", [fullPath], { detached: true, stdio: "ignore" }).unref();
  try {
  spawn("C:\\Program Files\\VideoLAN\\VLC\\vlc.exe", [fullPath], {
    detached: true,
    stdio: "ignore",
  }).unref();
  res.json({ success: true, file: fullPath });
} catch (err) {
  console.error("Error al intentar reproducir:", err);
  res.status(500).json({ error: "No se pudo abrir VLC" });
}

  res.json({ success: true, file: fullPath });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Excepción no controlada:", err);
});

process.on("unhandledRejection", (motivo) => {
  console.error("Promesa rechazada sin manejar:", motivo);
});