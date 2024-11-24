import '../../estilos/cuerpoUsuario/Productos.css';
import ProductoService from '../../services/ProductoService';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Productos = forwardRef((props, ref) => {
    const [productosInventario, setProductosInventario] = useState([]);

    const actualizarVista = () => {
        ProductoService.getProductosInventario()
            .then((data) => setProductosInventario(data))
            .catch((error) => console.error("Error al obtener productos:", error));
    };

    useEffect(() => {
        actualizarVista();
    }, []);

    useImperativeHandle(ref, () => ({ actualizarVista }));

    return (
        <section>
            <section className="card-container">
                {!productosInventario || productosInventario.length === 0 ? (
                    <div className="no-products">
                        No hay productos en el inventario
                    </div>
                ) : (
                    productosInventario.map((prodInv) => (
                        <div className="card" key={prodInv.producto.id}>
                            <img
                                src={prodInv.producto.imageUrl}
                                alt={prodInv.producto.nombre}
                            />
                            <span>{prodInv.producto.nombre}</span>
                            <span>$ {prodInv.producto.precio}.00</span>
                        </div>
                    ))
                )}
            </section>
        </section>
    );
});

export default Productos;
