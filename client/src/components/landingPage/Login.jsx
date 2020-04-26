// Dependencies
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { useToast, Box, Flex, Button, Image } from '@chakra-ui/core';
import { loginValid } from '../formHelpers/validators.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Login = () => {
  const toast = useToast();

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
        <Image
          rounded="full"
          size="150px"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/enter.png"
          ml="auto"
          mr="auto"
          mt="18%"
        />
        <Box pl="10%" pr="10%" pt="18%">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValid}
            onSubmit={async (data, { setErrors, resetForm }) => {
              try {
                await signInWithEmail(data.email, data.password);
                resetForm();
              } catch (error) {
                toast({
                  title: 'An error occurred.',
                  description: 'Invalid email or password.',
                  status: 'error',
                  duration: 9001,
                  isClosable: true
                });
              }
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <ValidatorField
                  placeholder="Email Address"
                  name="email"
                  value={values.email}
                  type="input"
                />
                <Box mb="8%"></Box>
                <ValidatorField
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  type="password"
                />

                <Box mt="15%"></Box>
                <Button
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
                  _hover={{ bg: '#FFB6BA' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  Sign In
                </Button>

                <Button
                  bg="#FF6161"
                  mt="10%"
                  rounded="20px"
                  fontWeight="semibold"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  onClick={signInWithGoogle}
                  type="submit"
                  color="white"
                  w="100%"
                  h="40px"
                  color="#373737"
                  _hover={{ bg: '#FF5454' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  Google OAuth
                </Button>
                <Flex align="center" justify="space-between">
                  <Link to="/reset" style={{ textDecoration: 'none' }}>
                    <Button
                      bg="#F7EEC7"
                      mt="18%"
                      pt="10px"
                      pb="10px"
                      rounded="20px"
                      fontWeight="semibold"
                      type="submit"
                      color="white"
                      w="100%"
                      h="40px"
                      color="#747474"
                      mb="25%"
                      _hover={{ bg: '#FF5454' }}
                      _focus={{ boxShadow: 'outline' }}
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Forgot Password
                    </Button>
                  </Link>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button
                      bg="#F7EEC7"
                      mt="18%"
                      pt="10px"
                      pb="10px"
                      rounded="20px"
                      fontWeight="semibold"
                      type="submit"
                      color="white"
                      w="100%"
                      h="40px"
                      color="#747474"
                      mb="25%"
                      _hover={{ bg: '#FF5454' }}
                      _focus={{ boxShadow: 'outline' }}
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
