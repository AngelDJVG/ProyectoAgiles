import '../../estilos/cuerpoUsuario/HeaderUsuario.css';
import React from 'react';
function HeaderUsuario(){
    return <>
    <header className="header">
        <nav class="navbar">
				<img src= '/assets/Logo.png' alt="carrito" class="titulo"/>
				<div class="search-bar">
					<input type="text" placeholder="Buscar..."/>
				</div>
				<img src= '/assets/Carrito.png' alt="carrito" class="shooping-icon"/>
			</nav>
    </header>
    </>;
}

export default HeaderUsuario;