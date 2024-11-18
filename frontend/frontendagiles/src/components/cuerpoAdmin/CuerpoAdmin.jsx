import React, { useState } from 'react';
import LogoutButton from '../LogoutButton';
import HeaderAdmin from './HeaderAdmin';
import TablaInventario from './TablaInventario';
import BotonAgregar from './BotonAgregar';
import ModalProducto from './ModalProducto';  // Asegúrate de importar ModalProducto
import '../../estilos/cuerpoAdmin/CuerpoAdmin.css';

function CuerpoAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='cuerpo-admin'>
      <HeaderAdmin />
      <TablaInventario />
      <br />
      <BotonAgregar onClick={handleOpenModal} />
      
      {/* ModalProducto */}
      <ModalProducto isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default CuerpoAdmin;
