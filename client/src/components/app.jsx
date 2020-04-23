// Dependencies
import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
      <Route exact path="/">
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Login</Button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Register</Button>
        </Link>
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={UserPage} />
      <Route exact path="/profile" component={UserPage} />
    </Switch>
  );
};

export default App;
