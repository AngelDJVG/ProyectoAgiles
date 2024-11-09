import './App.css';

//Auth0
import { useAuth0 } from '@auth0/auth0-react';

//Componentes
import LoginButton from './components/LoginButton';
import CuerpoAdmin from './components/CuerpoAdmin';
import CuerpoInicio from './components/CuerpoInicio';

import { useState, useEffect } from 'react';

//Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchRolUsuario = async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        const roles = claims['https://agilesecommerceproyectotokens.com/roles'] || [];
        if (roles.includes('admin')) {
          setUserRole('admin');
        } else {
          setUserRole('user');
        }
      }
    };
    fetchRolUsuario();
  }, [isAuthenticated, getIdTokenClaims]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            !isAuthenticated ?
            <LoginButton /> : 
            userRole === 'admin' ? 
            <CuerpoAdmin /> : 
            <CuerpoInicio />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
