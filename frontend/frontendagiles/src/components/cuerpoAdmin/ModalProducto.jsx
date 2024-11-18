import React, { useState } from "react";
import "../../estilos/cuerpoAdmin/modalProducto.css";

const ModalProducto = ({ isOpen, onClose }) => {
  const [unidadMedida, setUnidadMedida] = useState('pz'); // Estado para la unidad de medida

  const unidades = [
    { value: 'pz', label: 'Pieza' },
    { value: 'kg', label: 'Kilogramo' },
    { value: 'lt', label: 'Litro' },
    { value: 'ml', label: 'Mililitro' },
    { value: 'und', label: 'Unidad' }
  ];

  const handleUnidadChange = (event) => {
    setUnidadMedida(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Producto</h2>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Nombre" />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" placeholder="Descripción" />
          </div>
          <div className="form-group">
            <label>Marca</label>
            <input type="text" placeholder="Marca" />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <input type="text" placeholder="Categoria" />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" placeholder="Cantidad" />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" placeholder="Precio" />
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
          <button type="button" className="modal-add-button">
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
