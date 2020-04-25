// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider, CSSReset, Box, Flex,  Button, PseudoBox, Icon, Image} from "@chakra-ui/core";

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
             <Box pl="10%" pr="10%" pt="18%"> 
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
                     <Box >
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
                    <Box pt="15%"></Box>
                        <PseudoBox
                              as="button"
                              bg="#FFB6BA"
                              

                              rounded="20px"
                              fontWeight="semibold"
                              isDisabled={isSubmitting}
                              isLoading={isSubmitting}
                              type="submit"
                              color="white"
                              w="100%"
                              h="40px"
                              color="#373737"
                              _hover={{ bg: "#FFB6BA" }}
                              _focus={{ boxShadow: "outline" }}>Sign In
                        </PseudoBox>

                        <PseudoBox
                              as="button"
                              bg="#FF6161"
                              mt="10%"
                              rounded="20px"
                              fontWeight="semibold"
                              onClick={handleOAuth}
                              type="submit"
                              color="white"
                              w="100%"
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
          <Box align="center" verticalAlign="center" mt="10%">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button pt="10px" pb="10px" mb="50%" w="100%" variant="outline" borderColor="gray" textAlign="center" rounded="20px" color="#A2A2A2">Back</Button>
            </Link>
          </Box>
           </Box> 
           </Box>  
         </Flex>
    
       
      </ThemeProvider>
      </>
  );
};

export default Login;
