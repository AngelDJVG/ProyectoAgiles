import React, { useState, useRef} from 'react';
import LogoutButton from '../LogoutButton';
import HeaderAdmin from './HeaderAdmin';
import TablaInventario from './TablaInventario';
import BotonAgregar from './BotonAgregar';
import ModalProducto from './ModalProducto';  
import '../../estilos/cuerpoAdmin/CuerpoAdmin.css';

function CuerpoAdmin() {
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
    <div className='cuerpo-admin'>
      <HeaderAdmin />
      <TablaInventario ref={tablaInventarioRef}/>
      <br />
      <BotonAgregar onClick={handleOpenModal} />
      
      {/* ModalProducto */}
      <ModalProducto isOpen={isModalOpen} onClose={handleCloseModal} onProductoAgregado={handleProductoAgregado}/>
    </div>
  );
}

export default CuerpoAdmin;
