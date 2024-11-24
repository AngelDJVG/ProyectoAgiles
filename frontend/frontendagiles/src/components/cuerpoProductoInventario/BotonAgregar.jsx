import React from 'react';
import '../../estilos/cuerpoProductoInventario/BotonAgregar.css';

function BotonAgregar({onClick}){
    return <button className="button" onClick={onClick}>Agregar</button>;
}

export default BotonAgregar;