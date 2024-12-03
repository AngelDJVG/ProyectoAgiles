import React from "react";
import "../../estilos/cuerpoProductoInventario/BorrarModal.css";

const BorrarModal = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Seguro que quieres eliminar este producto?</h3>
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={() => onConfirm(true)}>
            Sí
          </button>
          <button className="modal-cancel" onClick={() => onConfirm(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrarModal;
