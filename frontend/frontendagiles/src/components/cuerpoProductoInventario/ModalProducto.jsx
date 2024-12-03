import React, { useState } from "react";
import "../../estilos/cuerpoProductoInventario/modalProducto.css";
import ProductoService from "../../services/ProductoService";

const ModalProducto = ({ isOpen, onClose, onProductoAgregado}) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('pz'); 

  const unidades = [
    { value: 'pz', label: 'Pieza' },
    { value: 'kg', label: 'Kilogramo' },
    { value: 'lt', label: 'Litro' },
    { value: 'ml', label: 'Mililitro' },
    { value: 'und', label: 'Unidad' }
  ];

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleUnidadChange = (event) => {
    setUnidadMedida(event.target.value);
  };

  const handleAgregarClick = () => {
    const producto = {
      nombre,
      descripcion,
      marca,
      categoria,
      cantidad,
      precio,
      unidadMedida
    };
  
    ProductoService.crearProductoInventario(producto, stock)
      .then((res) => {
        alert("¡Producto agregado con éxito!");
        if (onProductoAgregado) { 
          onProductoAgregado(); 
        }
      })
      .catch((error) => {
        console.error("Error al agregar el producto", error); 
      })
      .finally(() => {
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Producto</h2>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Nombre" value={nombre} onChange={handleInputChange(setNombre)} />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" placeholder="Descripción" value={descripcion} onChange={handleInputChange(setDescripcion)} />
          </div>
          <div className="form-group">
            <label>Marca</label>
            <input type="text" placeholder="Marca" value={marca} onChange={handleInputChange(setMarca)} />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <input type="text" placeholder="Categoria" value={categoria} onChange={handleInputChange(setCategoria)} />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" min="0" step="any" placeholder="Stock" value={stock} onChange={handleInputChange(setStock)} />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" min="0" step="any" placeholder="Cantidad" value={cantidad} onChange={handleInputChange(setCantidad)} />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" min="0" step="any" placeholder="Precio" value={precio} onChange={handleInputChange(setPrecio)} />
          </div>
          <div className="form-group">
            <label>Unidad de Medida</label>
            <select value={unidadMedida} onChange={handleUnidadChange}>
              {unidades.map((unidad) => (
                <option key={unidad.value} value={unidad.value}>
                  {unidad.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="modal-add-button" onClick={handleAgregarClick}>
            Agregar
          </button>
        </form>
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
