// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider, CSSReset, Box, Flex, IconButton, Avatar, Text, Stack, Input, Divider, Button, PseudoBox, Icon, Image} from "@chakra-ui/core";

// Forms
import { Formik, Form } from 'formik';
import { loginValid } from '../formHelpers/validators.js';

// Firebase Auth
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Login = () => {
  const history = useHistory();

  const handleOAuth = async () => {
    await signInWithGoogle();
    history.push('/profile');
  };

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
         <Box><Image rounded="full" size="150px" src="https://mvp2020.s3-us-west-1.amazonaws.com/enter.png" ml="auto" mr="auto" mt="20%"/></Box>
             <Box pl="5%" pr="5%" pt="10%"> 
                  <Formik
                    initialValues={{ email: '123@123.com', password: '123123' }}
                    validationSchema={loginValid}
                    onSubmit={async (data, { setSubmitting, resetForm }) => {
                      setSubmitting(true);

                      try {
                        await signInWithEmail(data.email, data.password);

                        setSubmitting(false);
                        resetForm();

                        history.push('/profile');
                      } catch (error) {
                        setSubmitting(false);
                        alert('Incorrect Email or Password.');
                      }
                    }}
                  >
                    {({ values, isSubmitting }) => (
                     <Box pl="8%" >
                        <Form>
                          <ValidatorField
                            placeholder="Email Address"
                            name="email"
                            value={values.email}
                            type="input"
                          />
                          <ValidatorField
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          type="password"
                        />
                    <Box pt="20px"></Box>
                        <PseudoBox
                              as="button"
                              bg="#FFB6BA"
                              m="5%"

                              rounded="20px"
                              fontWeight="semibold"
                              isDisabled={isSubmitting}
                              isLoading={isSubmitting}
                              type="submit"
                              color="white"
                              w="80%"
                              h="40px"
                              color="#373737"
                              _hover={{ bg: "#FFB6BA" }}
                              _focus={{ boxShadow: "outline" }}>Sign In
                        </PseudoBox>

                        <PseudoBox
                              as="button"
                              bg="#FF6161"
                              m="5%"
                              mt="3"
                              rounded="20px"
                              fontWeight="semibold"
                              onClick={handleOAuth}
                              type="submit"
                              color="white"
                              w="80%"
                              h="40px"
                              color="#373737"
                              _hover={{ bg: "#FF5454" }}
                              _focus={{ boxShadow: "outline" }}>Google OAuth
                        </PseudoBox>
                        {/* <Box bg='#BEEBE9'h="20px" ></Box> */}
                    </Form>
                    </Box>
                  
                )}
              </Formik> 

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button pt="15px" pb="15px" mt="20px" mb="20px" variant="solid">Return</Button>
          </Link>
           </Box> 
           </Box>  
         </Flex>
    
       
      </ThemeProvider>
      </>
  );
};

export default Login;
