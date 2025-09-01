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

export function procesarNombrePeliculaV2(nombre) {
    if (typeof nombre !== "string") return { nombre: "", ano: null };

    // Quitar extensión
    const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
    let sinExtension = nombre.replace(regexExt, "");

    // Quitar basura inicial como [RARBG], (2020), {cualquierCosa}
    sinExtension = sinExtension.replace(/^(\[.*?\]|\(.*?\)|\{.*?\})+/, "");

    // Quitar números, guiones u otros caracteres delante del título
    sinExtension = sinExtension.replace(/^[\d\W_]+/, "");

    // Detectar año
    const regexAno = /\b(19|20)\d{2}\b/;
    const matchAno = sinExtension.match(regexAno);
    const ano = matchAno ? parseInt(matchAno[0], 10) : null;

    if (ano) {
        // Quitar el año del nombre si existe
        sinExtension = sinExtension.split(matchAno[0])[0];
    }

    // Quitar tags comunes
    const regexTags =
        /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
    sinExtension = sinExtension.replace(regexTags, "");

    // Reemplazar separadores por espacios
    let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");

    // Quitar espacios extra
    nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();

    return { nombre: nombreLimpio, ano };
}

/****************************************************** */
export function LimpiarNombreSerie(filename) {
    if (!filename) return { tituloLimpio: "", temporada: null, episodio: null };

    // Detectar temporada y episodio: SxxExx
    const regexSerie = /\bS(\d{2})E(\d{2})\b/i;
    const match = filename.match(regexSerie);

    const temporada = match ? parseInt(match[1], 10) : null;
    const episodio = match ? parseInt(match[2], 10) : null;

    // Quitar extensión
    let nombre = filename.replace(/\.[^.]+$/, "");

    // Quitar el patrón SxxExx
    nombre = nombre.replace(regexSerie, "");

    // Reemplazar separadores y limpiar espacios
    nombre = nombre.replace(/[._\-]/g, " ");
    nombre = nombre.replace(/\s+/g, " ").trim();

    return { tituloLimpio: nombre, temporada, episodio };
}

export function procesarNombreMedia(nombre) {
    if (typeof nombre !== "string") {
        return { nombre: "", ano: null, temporada: null, episodio: null };
    }

    // Quitar extensión
    const regexExt = /\.(mkv|mp4|avi|mov|wmv|flv|mpeg|mpg)$/i;
    let sinExtension = nombre.replace(regexExt, "");

    // Quitar basura inicial como [RARBG], (2020), {cualquierCosa}
    sinExtension = sinExtension.replace(/^(\[.*?\]|\(.*?\)|\{.*?\})+/, "");

    // Quitar números, guiones u otros caracteres delante del título
    sinExtension = sinExtension.replace(/^[\d\W_]+/, "");

    // Detectar temporada y episodio: SxxExx
    const regexSerie = /\bS(\d{2})E(\d{2})\b/i;
    const matchSerie = sinExtension.match(regexSerie);

    let temporada = matchSerie ? parseInt(matchSerie[1], 10) : null;
    let episodio = matchSerie ? parseInt(matchSerie[2], 10) : null;

    if (matchSerie) {
        // Quitar patrón SxxExx del nombre
        sinExtension = sinExtension.replace(regexSerie, "");
    }

    // Detectar año (en películas o series que lo incluyan)
    const regexAno = /\b(19|20)\d{2}\b/;
    const matchAno = sinExtension.match(regexAno);
    const ano = matchAno ? parseInt(matchAno[0], 10) : null;

    if (ano) {
        // Quitar año del nombre
        sinExtension = sinExtension.split(matchAno[0])[0];
    }

    // Quitar tags comunes
    const regexTags =
        /\b(1080p|720p|2160p|4k|bluray|brrip|hdrip|hdtv|webrip|dvdrip|x264|x265|h264|hevc|extended|remastered|uncut|proper)\b/gi;
    sinExtension = sinExtension.replace(regexTags, "");

    // Reemplazar separadores y limpiar espacios
    let nombreLimpio = sinExtension.replace(/[._-]+/g, " ");
    nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ").trim();

    return { nombre: nombreLimpio, ano, temporada, episodio };
}


