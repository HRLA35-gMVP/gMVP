// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// Chakra + Forms
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverArrow
} from '@chakra-ui/core';

// Componenets + Styles
import UserPage from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';
import FriendsList from './userPage/FriendsList.jsx';
import BuildChallenge from './BuildChallenge/BuildAChallenge.jsx';
import {
  StyledPopoverContent,
  StyledButton
} from '../styledComponents/ericStyles.js';

const App = () => {
  const user = useContext(UserContext);

  return (
    <Switch>
      {!!user ? (
        <React.Fragment>
          <Route exact path="/" component={FriendsList} />
          <Redirect to="/" />
          <Route exact path="/profile" component={UserPage} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to="/" />
          <Route exact path="/">
            <Popover>
              <PopoverTrigger>
                <StyledButton>Learn More</StyledButton>
              </PopoverTrigger>
              <StyledPopoverContent zIndex={4}>
                <PopoverArrow />
                <PopoverHeader>Yo.</PopoverHeader>
                <PopoverBody>We're going public on May 1st.</PopoverBody>
              </StyledPopoverContent>
            </Popover>
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
        </React.Fragment>
      )}
    </Switch>
  );
};

export default App;
