import React, { useState, useRef} from 'react';
import HeaderAdmin from './HeaderAdmin';
import TablaInventario from '../cuerpoProductoInventario/TablaInventario';
import BotonAgregar from '../cuerpoProductoInventario/BotonAgregar';
import ModalProducto from '../cuerpoProductoInventario/ModalProducto';  
import '../../estilos/cuerpoAdmin/CuerpoProductos.css';

function CuerpoProductos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tablaInventarioRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductoAgregado = () => { 
    if (tablaInventarioRef.current) { 
      tablaInventarioRef.current.actualizarVista(); 
    } 
  };

  return (
    <div className='cuerpo-productos'>
      <HeaderAdmin />
      <TablaInventario ref={tablaInventarioRef}/>
      <br />
      <BotonAgregar onClick={handleOpenModal} />
      <ModalProducto isOpen={isModalOpen} onClose={handleCloseModal} onProductoAgregado={handleProductoAgregado}/>
    </div>
  );
}

export default CuerpoProductos;
