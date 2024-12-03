import './App.css';
// Auth0
import { useAuth0 } from '@auth0/auth0-react';
// Componentes
import CuerpoAdmin from './components/cuerpoAdmin/CuerpoAdmin';
import CuerpoProductos from './components/cuerpoAdmin/CuerpoProductos';
import CuerpoInicio from './components/cuerpoUsuario/CuerpoInicio';
import CuerpoPromociones from './components/cuerpoAdmin/CuerpoPromociones';
import Home from './components/Home';
// React y Router
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Carrito from './components/cuerpoUsuario/Carrito';


function App() {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [userRole, setUserRole] = useState(null);

  const fetchUserRole = async () => {
    if (isAuthenticated) {
      const claims = await getIdTokenClaims();
      const roles = claims['https://agilesecommerceproyectotokens.com/roles'] || [];
      setUserRole(roles.includes('admin') ? 'admin' : 'user');
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [isAuthenticated, getIdTokenClaims]);

  if (isLoading) return <h1>Cargando...</h1>;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ !isAuthenticated ? (<Home />) : userRole === 'admin' ? (<CuerpoAdmin />) : (<CuerpoInicio />)}/>
          <Route path="/productosinventario" element={<CuerpoProductos />} />
          <Route path="/promociones" element={<CuerpoPromociones />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
