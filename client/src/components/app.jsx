// Dependencies
import React, { useContext } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// Forms
import { Button } from '@chakra-ui/core';

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';
import BuildChallenge from './BuildChallenge/BuildAChallenge.jsx';

// Test comment 3
// Test comment 4

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
        <BuildChallenge />
      )}
    </Switch>
  );
};

export default App;
