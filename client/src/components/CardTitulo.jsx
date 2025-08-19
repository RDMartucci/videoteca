import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Card.css';


export default function CardTitulo({ titulo }) {
    const [cargandoImagen, setCargandoImagen] = useState(true);
    // const navigate = useNavigate(); //Para ir a la pagina con detalles del titulo seleccionado.

    const navegar = () => {
        console.log('navegar->navegando a :', "/titulo/" + titulo.id);
        // navigate("/titulo/" + titulo.id);
    };
    function handleClick() {
        console.log("Reproducir clicked");
    }

    return (
        <Card  className='shadow h-100 flex-column custom-hover custom-card'
            style={{ maxHeight: '500px'}}
            onClick={navegar}
        >
            <div
                className="position-relative card-img-container"
                onClick={navegar}
                style={{ cursor: 'pointer', height: '200px', boxSizing:'border-box' , overflow: 'hidden' }}
            >
                {cargandoImagen && (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                        <Spinner animation="border" variant="primary" role="status" />
                        <p className="mensaje-de-carga mt-3">Cargando titulos...</p>
                    </div>
                )}

                <Card.Img
                    variant="top"
                    src={titulo.image}
                    alt={titulo.title}
                    className={`card-img ${cargandoImagen ? 'd-none' : ''}`}
                    onLoad={() => setCargandoImagen(false)}
                />
            </div>
            <Card.Body className="d-flex flex-column" style={{minWidth: "218px", maxHeight: "500px"}}>
                <div className="m-0 d-flex flex-column" >
                <Card.Title className="card-titulo-titulo">{titulo.title}</Card.Title>

                    <span className="card-titulo-year">({titulo.year})</span>
                    <span className="card-titulo-genero">{titulo.genre}</span>
                </div>

                <div className='text-center'>
                    <Button
                        variant="outline-success"
                        className="card-titulo-btn rounded-pill custom-hover btn-card w-75"
                        onClick={navegar}
                    >
                        Detalles
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}