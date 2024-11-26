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

    const añadirAlCarrito = (producto) => {
        // Obtener el carrito actual del localStorage o inicializar uno vacío
        const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
        
        // Añadir el producto al carrito
        carritoActual.push(producto);
        
        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
        
        alert(`${producto.nombre} añadido al carrito`);
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
                                src={producto.imageUrl} 
                                alt={producto.nombre}
                            />
                            <span>{producto.nombre}</span>
                            <span>$ {producto.precio}</span>
                            <button onClick={() => añadirAlCarrito(producto)}>Añadir al carrito</button>
                        </div>
                    ))
                )}
            </section>
        </section>
    );
});

export default Productos;
