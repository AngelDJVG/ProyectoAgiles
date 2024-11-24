import React, { useState, useRef} from 'react';
import HeaderAdmin from './HeaderAdmin'; 
import '../../estilos/cuerpoAdmin/CuerpoAdmin.css';

function CuerpoAdmin() {
  return (
    <div className='cuerpo-admin'>
      <HeaderAdmin />
    </div>
  );
}

export default CuerpoAdmin;
