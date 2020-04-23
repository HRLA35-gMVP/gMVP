// Dependencies
import React, { useContext } from 'react';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Login from './landingPage/Login.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);
  return user ? <UserPage /> : <Login />;
};

export default App;
