import React, { useRef, useState } from 'react';
import '../../estilos/cuerpoUsuario/CuerpoUsuario.css';
import HeaderUsuario from './HeaderUsuario';
import Productos from './Productos';
import Carrito from './Carrito';
import ProductoService from '../../services/ProductoService';

function CuerpoInicio() {
  const productosRef = useRef(null); // Referencia para el componente Productos
  const [nombreFiltro, setNombreFiltro] = useState(''); // Estado para almacenar el filtro
  const [carrito, setCarrito] = useState(false);
  const handleSearchChange = (nombre) => {
    setNombreFiltro(nombre);

    if (productosRef.current) {
      productosRef.current.filtrarPorNombre(nombre); // Llama al método de Productos
    }
  };

  return (
    <div className="cuerpo-usuario">
      <HeaderUsuario onSearchChange={handleSearchChange} setCarrito={setCarrito} /> {
        carrito ?  <Carrito ref={productosRef} />: <Productos ref={productosRef} />
       
      }
      {console.log(carrito)}
      
    </div>
  );
}

export default CuerpoInicio;