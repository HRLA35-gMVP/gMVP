// Dependencies
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);

  return !user ? (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={UserPage} />
    </Switch>
  );
};

export default App;
