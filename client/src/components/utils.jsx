export function cleanTitle(filename) {
    if (!filename) return { tituloLimpio: "", ano: null };

    const regexAno = /\b(19\d{2}|20\d{2})\b/;
    const match = filename.match(regexAno);
    const ano = match ? parseInt(match[0], 10) : null;

    let nombre = filename.replace(/\.[^.]+$/, ""); // quitar extensión
    if (ano) nombre = nombre.split(ano)[0];        // cortar en el año
    nombre = nombre.replace(/[._\-]/g, " ");       // reemplazar separadores
    nombre = nombre.replace(/\s+/g, " ").trim();   // limpiar espacios

    return { tituloLimpio: nombre, ano };
}

export function procesarNombrePelicula(textoSucio) {
    if (typeof textoSucio !== "string") return { nombre: "", ano: null };
    const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
    let sinExtension = textoSucio.replace(regexExt, "");
    const regexAno = /\b(19|20)\d{2}\b/;
    const matchAno = sinExtension.match(regexAno);
    const ano = matchAno ? parseInt(matchAno[0], 10) : null;
    if (ano) sinExtension = sinExtension.split(ano)[0];
    let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");
    const regexTags =
        /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
    nombreLimpio = nombreLimpio.replace(regexTags, "");
    nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();
    return { nombre: nombreLimpio, ano };
}