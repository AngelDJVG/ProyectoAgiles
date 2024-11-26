import '../../estilos/cuerpoUsuario/HeaderUsuario.css';
import React from 'react';
import LogoutButton from '../LogoutButton';

function HeaderUsuario({ onSearchChange, setCarrito }) {
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (onSearchChange) {
			onSearchChange(value); // Llamar al handler pasado desde el padre
		}
	};

	return (
		<>
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