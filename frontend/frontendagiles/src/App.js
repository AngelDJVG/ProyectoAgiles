import './App.css';

import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import {useAuth0} from '@auth0/auth0-react';

function App() {
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) return <h1>Loading...</h1>;
  
  return (
    <div className="App">
      <h1>App</h1>
      {isAuthenticated ? (
        <>
        <Profile/>
        <LogoutButton/>
        </>
      ) : <LoginButton/>}
    </div>
  );
}

export default App;
