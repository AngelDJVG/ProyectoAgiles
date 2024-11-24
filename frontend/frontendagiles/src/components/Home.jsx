import React from 'react';
import '../estilos/Home.css';
import logo from '../logo.svg';
import LoginButton from './LoginButton';

const Home = () => {
    return (
        <div className="home-body">
            <header className="home-header">
                <div className="home-contenedor">
                    <h1>Bienvenido a KeComercio</h1>
                    <LoginButton />
                </div>
            </header>
            <main className="home-main">
                <section className="home-intro">
                    <img 
                        src={logo} 
                        alt="Imagen" 
                        className="home-imagen-intro"
                    />
                    <div className="home-texto-intro">
                        <h2>Acerca de nosotros</h2>
                        <p>
                            ¡Bienvenido a KeComercio! Aquí podrá comprar todo lo que necesite, fácil y rápido, con solo unos clics.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
