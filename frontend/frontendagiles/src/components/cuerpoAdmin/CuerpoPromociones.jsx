import HeaderAdmin from './HeaderAdmin';
import BotonAgregar from '../cuerpoProductoInventario/BotonAgregar';
import '../../estilos/cuerpoPromociones/CuerpoPromociones.css';

function CuerpoPromociones() {
  return (
    <div className='cuerpo-promociones'>
      <HeaderAdmin />
      <BotonAgregar onClick={()=>alert('')} />
    </div>
  );
}

export default CuerpoPromociones;
