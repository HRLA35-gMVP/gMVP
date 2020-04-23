// Dependencies
import React, { useContext } from 'react';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import RegisterOrLogin from './landingPage/RegisterOrLogin.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);
  return user ? <UserPage /> : <RegisterOrLogin />;
};

export default App;
