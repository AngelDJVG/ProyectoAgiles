import React, { useRef, useState } from 'react';
import '../../estilos/cuerpoUsuario/CuerpoUsuario.css';
import HeaderUsuario from './HeaderUsuario';
import Productos from './Productos';
import ProductoService from '../../services/ProductoService';

function CuerpoInicio() {
  const productosRef = useRef(null); // Referencia para el componente Productos
  const [nombreFiltro, setNombreFiltro] = useState(''); // Estado para almacenar el filtro

  const handleSearchChange = (nombre) => {
    setNombreFiltro(nombre);
    if (productosRef.current) {
      productosRef.current.filtrarPorNombre(nombre); // Llama al método de Productos
    }
  };

  return (
    <div className="cuerpo-usuario">
      <HeaderUsuario onSearchChange={handleSearchChange} /> {/* Pasar el handler */}
      <Productos ref={productosRef} />
    </div>
  );
}

export default CuerpoInicio;