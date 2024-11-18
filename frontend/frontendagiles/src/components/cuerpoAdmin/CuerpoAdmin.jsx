import React from 'react';
import LogoutButton from '../LogoutButton';
import HeaderAdmin from './HeaderAdmin';
import TablaInventario from './TablaInventario';
import BotonAgregar from './BotonAgregar';
import '../../estilos/cuerpoAdmin/CuerpoAdmin.css';

function CuerpoAdmin() {
  return (
    <div className='cuerpo-admin'>
      <HeaderAdmin />
      <TablaInventario />
      <br/>
      <BotonAgregar onClick={()=>alert('Agregando')}/>
    </div>
  );
}

export default CuerpoAdmin;