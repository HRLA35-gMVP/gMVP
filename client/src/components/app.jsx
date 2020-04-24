// Dependencies
import React, { useContext } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// Forms
import { Button } from '@chakra-ui/core';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);

  return (
    <Switch>
      {!!user ? (
        <React.Fragment>
          <Redirect to="/profile" />
          <Route exact path="/profile" component={UserPage} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to="/" />
          <Route exact path="/">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="solid">Login</Button>
            </Link>
            <div>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="solid">Register</Button>
              </Link>
            </div>
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </React.Fragment>
      )}
    </Switch>
  );
};

export default App;
