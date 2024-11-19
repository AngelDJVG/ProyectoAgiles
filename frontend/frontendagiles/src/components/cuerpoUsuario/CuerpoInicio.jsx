import React from 'react';
import '../../estilos/cuerpoUsuario/CuerpoUsuario.css';
import HeaderUsuario from './HeaderUsuario';
import Productos from './Productos';
import ProductoService from '../../services/ProductoService';

function CuerpoInicio() {
  ProductoService.getProductosInventario();
  return (
    <div className='cuerpo-usuario'>
      <HeaderUsuario/>
      <Productos/>
    </div>
  );
}

export default CuerpoInicio;