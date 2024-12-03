import React, { useState } from "react";
import "../../estilos/cuerpoPromociones/ModalPromocion.css";
import PromocionService from "../../services/PromocionService";

const ModalPromociones = ({ isOpen, onConfirm, producto }) => {
    const [nuevoPrecio, setNuevoPrecio] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleAgregarClick = () => {
        if (fechaFin === '' || fechaInicio === '' || nuevoPrecio === '') {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (nuevoPrecio <= 0) {
            alert("El precio debe ser mayor a 0.");
            return;
        }

        if (nuevoPrecio >= producto.precio) {
            alert("El precio debe ser menor al precio original.");
            return;
        }

        if (fechaFin <= fechaInicio) {
            alert("La fecha de fin debe ser posterior a la fecha de inicio.");
            return;
        }

        const promocion = {
            id_producto: producto.id,
            monto: nuevoPrecio,
            fechaInicio,
            fechaFin
        };

        PromocionService.crearPromocion(promocion).then(res => {
            if (res) {
                alert("Promocion agregada con éxito");
                onConfirm(true);
            } else {
                alert("Error al agregar la promocion");
                onConfirm(false);
            }
        }).catch(err => {
            console.error("Error al agregar la promocion");
            onConfirm(false);
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Promoción {producto.nombre}</h2>
                <form>
                    <div className="form-group">
                        <label>Precio</label>
                        <input type="number" min="0" max={producto.precio} step="any" placeholder="Precio" onChange={handleInputChange(setNuevoPrecio)} />
                    </div>
                    <div className="form-group">
                        <label>Fecha Inicio</label>
                        <input type="date" onChange={handleInputChange(setFechaInicio)} min={new Date().toISOString().slice(0, 10)} />
                    </div>
                    <div className="form-group">
                        <label>Fecha Fin</label>
                        <input type="date" onChange={handleInputChange(setFechaFin)} min={new Date().toISOString().slice(0, 10)} />
                    </div>
                    <button type="button" className="modal-add-button" onClick={handleAgregarClick}>
                        Agregar
                    </button>
                </form>
                <button className="modal-close-button" onClick={() => onConfirm(false)}>
                    X
                </button>
            </div>
        </div>
    );
};

export default ModalPromociones;
