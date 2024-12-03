import React, { useState } from "react";
import "../../estilos/cuerpoProductoInventario/modalProducto.css";
import ProductoService from "../../services/ProductoService";

const ActualizarModal = ({ isOpenActualizar, prodInv, onConfirm}) => {
  const [stock, setStock] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleActualizarClick = () => {
    ProductoService.actualizarInventario(prodInv.id, stock)
      .then((res) => {
        alert(res ? "¡Stock actualizado con éxito!" : "¡Error al actualizar el inventario!");
        onConfirm(true);
      }).catch((error) => {
        console.error("Error al actualizar el inventario"); 
        onConfirm(false);
      });
  };

  if (!isOpenActualizar) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Actualizando Producto: {prodInv.producto.nombre}</h2>
        <form>
          <div className="form-group">
            <input type="number" min="0" step="any" placeholder="Stock" value={stock} onChange={handleInputChange(setStock)} />
          </div>
          <button type="button" className="modal-add-button" onClick={handleActualizarClick}>
            Actualizar
          </button>
        </form>
        <button className="modal-close-button" onClick= {()=>onConfirm(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ActualizarModal;
