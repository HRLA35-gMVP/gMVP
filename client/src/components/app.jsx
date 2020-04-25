// Dependencies
import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider, CSSReset, Box, Flex, Button, PseudoBox, Image} from "@chakra-ui/core";

// Componenets
import { UserPage } from './userPage/userPage.jsx';
import Register from './landingPage/Register.jsx';
import Login from './landingPage/Login.jsx';

// Contexts
import { UserContext } from '../providers/UsersProvider.jsx';

const App = () => {
  const user = useContext(UserContext);

  return (
    <>
    <ThemeProvider>
    <CSSReset />
    <Flex direction="column" align="center" justify="center">
    <Box bg='#BEEBE9'  p={[2, 4, 6, 8]} height="100%"  width={[
              "100%", // base
              "50%", // 480px upwards
              "25%", // 768px upwards
              "15%", // 992px upwards
          ]}>
                
    { !user ? ( 
    <Switch>
      <Route exact path="/">
        <Flex direction="column" alignItems="center">
        <div>
        <Box><Image rounded="full" w="275px" h="100px" src="https://mvp2020.s3-us-west-1.amazonaws.com/streak3.png" ml="auto" mr="auto" mt="10"/></Box>
        <Box bg="#F7EEC7" textAlign="center" w="50%"mr="auto" ml="auto" height="30px"  fontSize="xlg" boxShadow="1px 2px 3px #A2A2A2" pt="2px">Welcome!</Box>
        <Box bg="#F7EEC7" textAlign="center" w="40%"mr="auto" ml="auto" mt="14px" height="20px"  fontSize="xs" boxShadow="1px 2px 3px #A2A2A2" pt="2px" pb="2px" >Learn More</Box>
        <Box mt="15%"><Image rounded="full" size="200px" h="190px" src="https://mvp2020.s3-us-west-1.amazonaws.com/bird.png" ml="auto" mr="auto" mt="10"/></Box>

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
                _hover={{ bg: "#FFB6BA" }}
                _focus={{ boxShadow: "outline" }}>Log In
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
                  _hover={{ bg: "#FFB6BA" }}
                  _focus={{ boxShadow: "outline" }}>Register
              </PseudoBox>
            </Link>
          </Box>
        </div>
        </Flex>
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={UserPage} />
      <Route exact path="/profile" component={UserPage} />
    </Switch>
  )
  }
    </Box>  
  </Flex>
  </ThemeProvider>
  </>
  );
  
}

export default App;
