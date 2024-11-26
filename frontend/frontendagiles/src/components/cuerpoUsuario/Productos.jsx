import '../../estilos/cuerpoUsuario/Productos.css';
import ProductoService from '../../services/ProductoService';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Productos = forwardRef((props, ref) => {
    const [productosInventario, setProductosInventario] = useState([]);

    const actualizarVista = () => {
        ProductoService.getProductos()
            .then((data) => setProductosInventario(data))
            .catch((error) => console.error("Error al obtener productos:", error));
    };

    const filtrarPorNombre = (nombre) => {
        if (nombre.trim() === "") {
            actualizarVista(); // Si el filtro está vacío, recargar la vista original
            return;
        }

        ProductoService.buscarPorNombre(nombre)
            .then((data) => setProductosInventario(data))
            .catch((error) => console.error("Error al filtrar productos:", error));
    };

    useEffect(() => {
        actualizarVista();
    }, []);

    useImperativeHandle(ref, () => ({
        actualizarVista,
        filtrarPorNombre, // Exponer este método para ser usado desde el componente padre
    }));
    
    return (
        <section>
            <section className="card-container">
                {!productosInventario || productosInventario.length === 0 ? (
                    <div className="no-products">
                        No hay productos en el inventario
                    </div>
                ) : (
                    productosInventario.map((producto) => (
                        <div className="card" key={producto.id}>
                            <img
                                src={producto.imageUrl} // Accediendo a propiedades planas
                                alt={producto.nombre}
                            />
                            <span>{producto.nombre}</span>
                            <span>$ {producto.precio}</span>
                        </div>
                    ))
                )}
            </section>
        </section>
    );
});

export default Productos;
