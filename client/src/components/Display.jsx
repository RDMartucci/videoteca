export default function Display() {
    return (
        <div className="display-container">
            <div className="display-background"></div>
            <div className="display-overlay"></div>
            <div className="display-content">
                <h3 className="display-title">Detalles</h3>
                <p className="display-description">Explora una amplia variedad de títulos y disfruta de tus películas y series favoritas.</p>
                <button className="display-button">Comenzar</button>
            </div>
            <div className="display-footer">
                <p>© 2023 Videoteca. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}