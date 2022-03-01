// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Chakra + Forms
import {
  Box,Flex,Popover,PopoverTrigger,PopoverHeader,PopoverBody,PopoverArrow,Image,PseudoBox,Button, Text
} from '@chakra-ui/core';

// Landing Page
import LandingPage from './landingPage/LandingPage.jsx';
import Login from './landingPage/Login.jsx';
import Register from './landingPage/Register.jsx';
import ForgotPassword from './password/ForgotPw.jsx';
import CheckEmail from './password/CheckEmail.jsx';

// User Pages
import UserPage from './userPage/userPage.jsx';
import EditProfile from './userPage/EditProfile.jsx';
import FriendsListHelper from './friends/FriendsListHelper.jsx';
import ChallengeStatus from './userPage/ChallengeStatus.jsx';
import BuildChallenge from './BuildChallenge/BuildAChallenge.jsx';

// Styles
import {
  StyledPopoverContent,
  StyledButton
} from '../styledComponents/ericStyles.js';
import ChallengeProvider from '../providers/ChallengeProvider.jsx';
import RequireAuth from './auth/RequireAuth.jsx';

const App = () => {
  //const user = useContext(UserContext);

  return (
    <Flex direction="column" align="center" justify="center" h="100%">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="reset" element={<ForgotPassword/>} />
            <Route path="confirmation" element={<CheckEmail/>} />
            {/* <Route path="/profile" element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            } />
              <Route path="/friends" element={<FriendsListHelper/>} /> */}
              {/* <Route path="/edit" element={<EditProfile/>} />
              <Route path="/challenge" element={<ChallengeStatus/>} />
                  <Route path="/create" element={<BuildChallenge/>} />
                  <Route path="/(invite|view)">
                  <ChallengeProvider>
                      <Route
                      path="/invite/*"
                      element={<FriendsListHelper/>}
                      />
                      <Route
                      path="/view/*"
                      element={<ChallengeStatus/>}
                      />
                  </ChallengeProvider>
                  </Route> */}

        </Routes>
      </Router>
    </Flex>
  );
};

export default App;
