import React from 'react';
import LogoutButton from '../LogoutButton';
import Profile from '../Profile';
import HeaderAdmin from './HeaderAdmin';
import TablaInventario from './TablaInventario';
import ContenedorAdmin from './ContenedorAdmin';
import '../../estilos/cuerpoAdmin/CuerpoAdmin.css';

function CuerpoAdmin() {
  return (
    <div className='cuerpo-admin'>
      <HeaderAdmin />
      <div className='contenedor-admin'>
        <ContenedorAdmin/>
        <TablaInventario />
      </div>
    </div>
    //<Profile/> <LogoutButton/>
  );
}

export default CuerpoAdmin;