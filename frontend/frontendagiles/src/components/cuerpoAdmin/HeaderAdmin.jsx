import '../../estilos/cuerpoAdmin/HeaderAdmin.css';
import React from 'react';
import LogoutButton from '../LogoutButton';

function HeaderAdmin(){
    return <>
    <header className="header">
        <h2>Panel de administración de inventario</h2>
        <LogoutButton />
    </header>
    </>;
}

export default HeaderAdmin;