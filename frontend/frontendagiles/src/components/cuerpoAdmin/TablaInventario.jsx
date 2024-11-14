import '../../estilos/cuerpoAdmin/TablaInventario.css';
import React from 'react';

function TablaInventario(){
    let productosInventario = [{
        id: 1,
        imagen: 'imagen1.jpg',
        nombre: 'Producto 1',
        descripcion: 'Descripción 1',
        precio: 200,
        stock: 20,
        unidad: 'Pz'
    },
    {
        id: 2,
        imagen: 'imagen2.jpg',
        nombre: 'Producto 2',
        descripcion: 'Descripción 2',
        precio: 100,
        stock: 10,
        unidad: 'Pz'
    },
    {
        id: 3,
        imagen: 'imagen3.jpg',
        nombre: 'Producto 3',
        descripcion: 'Descripción 3',
        precio: 300,
        stock: 30,
        unidad: 'Pz'
    }
    ];

    function manejarEditar(productoInventario){
        console.log('Editar', productoInventario);
    }

    function manejarEliminar(productoInventario){
        console.log('Eliminar', productoInventario);
    }

    return <table className="tabla">
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Unidad</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            {productosInventario.map((prodInv) => (
                <tr key={prodInv.id}>
                    <td><img src={prodInv.imagen} alt={prodInv.nombre}/></td>
                    <td>{prodInv.nombre}</td>
                    <td>{prodInv.descripcion}</td>
                    <td>{prodInv.stock}</td>
                    <td>{prodInv.unidad}</td>
                    <td>{prodInv.precio}</td>
                    <td><button onClick={() => manejarEditar(prodInv)}>Editar</button></td>
                    <td><button onClick={() => manejarEliminar(prodInv)}>Eliminar</button></td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default TablaInventario;