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
  PseudoBox
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

const App = () => {
  const user = useContext(UserContext);

  return (
    <Flex direction="column" align="center" justify="center">
      <Box
        bg="#BEEBE9"
        p={[2, 4, 6, 8]}
        height="100%"
        width={[
          '100%', // base
          '50%', // 480px upwards
          '25%', // 768px upwards
          '15%' // 992px upwards
        ]}
      >
        <Switch>
          {!!user ? (
            <React.Fragment>
              <Redirect to="/profile" />
              <Route exact path="/profile" component={UserPage} />
              <Route exact path="/friends" component={FriendsListHelper} />
              <Route exact path="/challenge" component={ChallengeStatus} />
              <Route exact path="/edit" component={EditProfile} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Redirect to="/" />
              <Route exact path="/">
                <Flex direction="column" alignItems="center">
                  <div>
                    <Box>
                      <Image
                        rounded="full"
                        w="275px"
                        h="100px"
                        src="https://mvp2020.s3-us-west-1.amazonaws.com/streak3.png"
                        ml="auto"
                        mr="auto"
                        mt="10"
                      />
                    </Box>
                    <Box
                      bg="#F7EEC7"
                      textAlign="center"
                      w="50%"
                      mr="auto"
                      ml="auto"
                      height="30px"
                      fontSize="xlg"
                      boxShadow="1px 2px 3px #A2A2A2"
                      pt="2px"
                    >
                      Welcome!
                    </Box>

                    <Popover>
                      <PopoverTrigger>
                        <StyledButton
                          as={Box}
                          bg="#F7EEC7"
                          textAlign="center"
                          w="40%"
                          mr="auto"
                          ml="auto"
                          mt="14px"
                          height="20px"
                          fontSize="xs"
                          boxShadow="1px 2px 3px #A2A2A2"
                          pt="2px"
                          pb="2px"
                        >
                          Learn More
                        </StyledButton>
                      </PopoverTrigger>
                      <StyledPopoverContent zIndex={4}>
                        <PopoverArrow />
                        <PopoverHeader>Yo.</PopoverHeader>
                        <PopoverBody>
                          We're going public on May 1st.
                        </PopoverBody>
                      </StyledPopoverContent>
                    </Popover>

                    <Box mt="15%">
                      <Image
                        rounded="full"
                        size="200px"
                        h="190px"
                        src="https://mvp2020.s3-us-west-1.amazonaws.com/bird.png"
                        ml="auto"
                        mr="auto"
                        mt="10"
                      />
                    </Box>

                    <Box>
                      <Link to="/login" style={{ textDecoration: 'none' }}>
                        <PseudoBox
                          as="button"
                          bg="#FFB6BA"
                          mr="auto"
                          ml="auto"
                          mt="20%"
                          mb="10%"
                          rounded="20px"
                          fontWeight="semibold"
                          w="100%"
                          h="40px"
                          color="#373737"
                          _hover={{ bg: '#FFB6BA' }}
                          _focus={{ boxShadow: 'outline' }}
                        >
                          Log In
                        </PseudoBox>
                      </Link>
                    </Box>

                    <Box pb="80%">
                      <Link to="/register" style={{ textDecoration: 'none' }}>
                        <PseudoBox
                          as="button"
                          bg="#FFB6BA"
                          rounded="20px"
                          fontWeight="semibold"
                          h="40px"
                          w="100%"
                          color="#373737"
                          _hover={{ bg: '#FFB6BA' }}
                          _focus={{ boxShadow: 'outline' }}
                        >
                          Register
                        </PseudoBox>
                      </Link>
                    </Box>
                  </div>
                </Flex>
              </Route>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset" component={ForgotPassword} />
              <Route exact path="/reset/confirmation" component={CheckEmail} />
            </React.Fragment>
          )}
        </Switch>
      </Box>
    </Flex>
  );
};

export default App;
