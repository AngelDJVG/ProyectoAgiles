import '../../estilos/cuerpoProductoInventario/TablaInventario.css';
import ProductoService from '../../services/ProductoService';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import BorrarModal from './BorrarModal';
import ActualizarModal from './ActualizarModal';

const TablaInventario = forwardRef((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para borrar
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const [isActualizarOpen, setIsActualizarOpen] = useState(false); // Modal para actualizar
    const [productoAActualizar, setProductoActualizar] = useState(null);

    const [productosInventario, setProductosInventario] = useState([]);
    
    const actualizarVista = () => {
        ProductoService.getProductosInventario()
            .then((data) => setProductosInventario(data));
    };

    useEffect(() => {
        actualizarVista();
    }, []);

    useImperativeHandle(ref, () => ({ actualizarVista }));

    const manejarEditar = (confirmed) => {
        setIsActualizarOpen(false);
        setProductoActualizar(null);
        actualizarVista();
    };

    const manejarEliminar = (confirmed) => {
        setIsModalOpen(false);
        if (confirmed && productoAEliminar) {
            ProductoService.deleteInventario(productoAEliminar).then(() => {
                setProductosInventario((productosInventario) => productosInventario.filter((prodInv) => prodInv.id !== productoAEliminar));
                setProductoAEliminar(null);
            });
        }
    };

    return <div className="tabla-wrapper">
        <table className="tabla">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Marca</th>
                    <th>Categoria</th>
                    <th>Unidad</th>
                    <th>Precio</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {!productosInventario || productosInventario.length === 0 ? <tr><td colSpan="8">No hay productos en el inventario</td></tr> : productosInventario.map((prodInv) => (
                    <tr key={prodInv.id}>
                        <td><img src={prodInv.producto.imageUrl} alt={prodInv.producto.nombre} /></td>
                        <td>{prodInv.producto.nombre}</td>
                        <td>{prodInv.cantidadDisponible}</td>
                        <td>{prodInv.producto.marca}</td>
                        <td>{prodInv.producto.categoria}</td>
                        <td>{prodInv.producto.unidadMedida}</td>
                        <td>{prodInv.producto.precio}</td>
                        <td><button onClick={() => {setProductoActualizar(prodInv); setIsActualizarOpen(true);}}>Editar</button></td>
                        <td><button onClick={() => {setProductoAEliminar(prodInv.id); setIsModalOpen(true) }}>Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <BorrarModal isOpen={isModalOpen} onConfirm={manejarEliminar} />
        {isActualizarOpen && (
        <ActualizarModal
          isOpenActualizar={isActualizarOpen}
          prodInv={productoAActualizar}
          onConfirm={manejarEditar}
        />
      )}
    </div>;
});

export default TablaInventario;