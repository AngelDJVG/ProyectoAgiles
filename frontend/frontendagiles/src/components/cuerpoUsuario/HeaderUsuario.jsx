import '../../estilos/cuerpoUsuario/HeaderUsuario.css';
import React, { useState } from 'react';
import LogoutButton from '../LogoutButton';
import StompClient from './StompClient';
import Promocion from '../../models/Promocion';

function HeaderUsuario({ onSearchChange, setCarrito }) {
	
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (onSearchChange) {
			onSearchChange(value); 
		}
	};

	const handleNewMessage = (message) => {
		let promocion = new Promocion(message.id, message.id_producto, message.monto, message.fechaInicio, message.fechaFin);
		alert(`Nueva promocion: ${promocion.id_producto} con un descuento de ${promocion.monto}`);
	};

	return (
		<>
			<StompClient onMessage={handleNewMessage} />
			<header className="header">
				<nav className="navbar">
					<img src="/assets/Logo.png" alt="carrito" className="titulo" onClick={()=>{setCarrito(false)}} />
					<div className="search-bar">
						<input
							type="text"
							placeholder="Buscar..."
							onChange={handleInputChange} // Escuchar cambios en el input
						/>
					</div>
					<img src="/assets/Carrito.png" alt="carrito" className="shooping-icon" onClick={()=>{setCarrito(true)}}/>
					<LogoutButton />
				</nav>
			</header>
		</>
	);
}

export default HeaderUsuario;