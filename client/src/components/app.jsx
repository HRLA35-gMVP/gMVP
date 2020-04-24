// Dependencies
import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Forms
import { Button } from '@chakra-ui/core';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';
import BuildChallenge from './BuildChallenge/BuildAChallenge.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);

  return !user ? (
    <Switch>
      <Route exact path="/">
        <div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="solid">Login</Button>
          </Link>
        </div>
        <div>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="solid">Register</Button>
          </Link>
        </div>
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
