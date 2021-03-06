// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// Chakra + Forms
import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Image,
  PseudoBox,
  Button,
  Text
} from '@chakra-ui/core';

// Componenets + Styles
// Landing Page
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

const App = () => {
  const user = useContext(UserContext);

  return (
    <Flex direction="column" align="center" justify="center" h="100%">
      <Switch>
        {!!user ? (
          <React.Fragment>
            <Route exact path="/edit" component={EditProfile} />
            <Route exact path="/challenge/create" component={BuildChallenge} />
            <Route path="/challenge/(invite|view)">
              <ChallengeProvider>
                <Route
                  exact
                  path="/challenge/invite/*"
                  component={FriendsListHelper}
                />
                <Route
                  exact
                  path="/challenge/view/*"
                  component={ChallengeStatus}
                />
              </ChallengeProvider>
            </Route>
            <Redirect to="/profile" />
            <Route path="/profile" component={UserPage} />
            <Route exact path="/friends" component={FriendsListHelper} />
            <Route exact path="/challenge" component={ChallengeStatus} />
          </React.Fragment>
        ) : (
          <Box
            position="absolute"
            top="0"
            background="#BEEBE9"
            padding={[2, 4, 6, 8]}
            height="100%"
            width={[
              '100%', // base
              '50%', // 480px upwards
              '25%', // 768px upwards
              '15%' // 992px upwards
            ]}
          >
            <Redirect to="/" />
            <Route exact path="/">
              <Flex direction="column" alignItems="center" height="100%">
                <Image
                  rounded="full"
                  width="275px"
                  height="100px"
                  marginTop="3rem"
                  src="https://mvp2020.s3-us-west-1.amazonaws.com/streak3.png"
                />

                <Box
                  position="relative"
                  background="#F7EEC7"
                  boxShadow="1px 2px 3px #A2A2A2"
                  width="50%"
                  fontSize="xlg"
                  textAlign="center"
                >
                  Welcome!
                </Box>

                <Popover>
                  <PopoverTrigger>
                    <StyledButton
                      as={Box}
                      background="#F7EEC7"
                      boxShadow="1px 2px 3px #A2A2A2"
                      marginTop="1rem"
                      width="40%"
                      height="20px"
                      fontSize="xs"
                      textAlign="center"
                    >
                      Learn More
                    </StyledButton>
                  </PopoverTrigger>
                  <StyledPopoverContent zIndex={4}>
                    <PopoverArrow />
                    <PopoverHeader textAlign="center" fontSize="md">
                      Join. Connect. Achieve
                    </PopoverHeader>
                    <PopoverBody textAlign="center" fontSize="sm">
                      Streak is a platform where you can connect with your
                      family, friends, and peers to collaborate individually for
                      any activity.
                    </PopoverBody>
                  </StyledPopoverContent>
                </Popover>

                <Image
                  rounded="full"
                  size="200px"
                  height="190px"
                  marginTop="10%"
                  marginBottom="10%"
                  src="https://mvp2020.s3-us-west-1.amazonaws.com/bird.png"
                />

                <Link to="/login" style={{ width: '80%' }}>
                  <PseudoBox
                    as={Button}
                    rounded="20px"
                    background="#FFB6BA"
                    color="#373737"
                    width="100%"
                    height="40px"
                    marginTop="5%"
                    marginBottom="10%"
                    fontWeight="semibold"
                    textAlign="center"
                    _hover={{ bg: '#FFB6BA' }}
                    _focus={{ boxShadow: 'outline' }}
                  >
                    Log In
                  </PseudoBox>
                </Link>

                <Link to="/register" style={{ width: '80%' }}>
                  <PseudoBox
                    as={Button}
                    background="#FFB6BA"
                    color="#373737"
                    rounded="20px"
                    width="100%"
                    height="40px"
                    fontWeight="semibold"
                    _hover={{ bg: '#FFB6BA' }}
                    _focus={{ boxShadow: 'outline' }}
                  >
                    Register
                  </PseudoBox>
                </Link>
              </Flex>
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={ForgotPassword} />
            <Route exact path="/reset/confirmation" component={CheckEmail} />
          </Box>
        )}
      </Switch>
    </Flex>
  );
};

export default App;
