import '../../estilos/cuerpoAdmin/HeaderAdmin.css';
import React from 'react';
import LogoutButton from '../LogoutButton';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
    const navigate = useNavigate();

    const handlePaginaPromociones = () => {
        navigate('/promociones');
    };

    const handlePaginaProductoInventario = () => {
        navigate('/productosinventario');
    };

    const handleInicio = () => {
        navigate('/');
    };


    return <>
        <header className="header">
            <h2>Panel de administración</h2>
            <div>
                <button onClick={handleInicio}>Inicio</button>
                <button onClick={handlePaginaProductoInventario}>Control de Inventario</button>
                <button onClick={handlePaginaPromociones}>Control de Promociones</button>
                <LogoutButton />
            </div>
        </header>
    </>;
}

export default HeaderAdmin;