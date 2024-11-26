import '../../estilos/cuerpoUsuario/Productos.css';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import BorrarModal from './BorrarModal';

const Carrito = forwardRef((props, ref) => {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para borrar
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    // Cargar productos del localStorage al iniciar
    const cargarCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        setProductosCarrito(carrito);
    };

    useEffect(() => {
        cargarCarrito();
    }, []);

    useImperativeHandle(ref, () => ({
        actualizarVista: cargarCarrito,
    }));

    // Actualizar la cantidad de un producto
    const actualizarCantidad = (id, nuevaCantidad) => {
        const nuevoCarrito = productosCarrito.map((producto) => {
            if (producto.id === id) {
                return { ...producto, cantidad: nuevaCantidad };
            }
            return producto;
        });

        setProductosCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    };

    // Manejar la eliminación de productos
    const manejarEliminar = (confirmed) => {
        setIsModalOpen(false);
        if (confirmed && productoAEliminar !== null) {
            const nuevoCarrito = productosCarrito.filter(
                (producto) => producto.id !== productoAEliminar
            );
            setProductosCarrito(nuevoCarrito);
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            setProductoAEliminar(null);
        }
    };

    // Calcular el subtotal y el total
    const calcularSubtotal = () => {
        return productosCarrito.reduce(
            (sum, producto) => sum + producto.precio * producto.cantidad,
            0
        );
    };

    const calcularTotal = () => {
        const subtotal = calcularSubtotal();
        const impuestos = subtotal * 0.16; // Ejemplo: 16% de IVA
        return subtotal + impuestos;
    };

    return (
        <div className="tabla-wrapper">
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {!productosCarrito || productosCarrito.length === 0 ? (
                        <tr>
                            <td colSpan="6">No hay productos en el carrito</td>
                        </tr>
                    ) : (
                        productosCarrito.map((producto) => (
                            <tr key={producto.id}>
                                <td>
                                    <img
                                        src={producto.imageUrl}
                                        alt={producto.nombre}
                                        width="50"
                                    />
                                </td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={producto.cantidad}
                                        min="1"
                                        onChange={(e) =>
                                            actualizarCantidad(
                                                producto.id,
                                                Math.max(1, parseInt(e.target.value) || 1)
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    ${(producto.precio * producto.cantidad).toFixed(2)}
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setProductoAEliminar(producto.id);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <BorrarModal isOpen={isModalOpen} onConfirm={manejarEliminar} />
            <div className="resumen">
                <p>
                    <strong>Subtotal:</strong> ${calcularSubtotal().toFixed(2)}
                </p>
                <p>
                    <strong>Total (incluye impuestos):</strong> ${calcularTotal().toFixed(2)}
                </p>
            </div>
        </div>
    );
});

export default Carrito;
