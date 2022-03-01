// Dependencies
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useToast, Box, Flex, Button, Image } from '@chakra-ui/core';
import { validateEmailPasswordFormat } from '../formHelpers/validators.js';
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Login = () => {
  const toast = useToast();

  return (
    <Flex top="0" height="100%" width="100%" direction="column">
      <Image
        rounded="full"
        size="150px"
        src="https://mvp2020.s3-us-west-1.amazonaws.com/enter.png"
        ml="auto"
        mr="auto"
        mt="12%"
      />

      <Box pl="10%" pr="10%" pt="15%">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={ validateEmailPasswordFormat }
          onSubmit={ async ( data, { resetForm }) => {
            try {
              let userCredential = await signInWithEmail(data.email, data.password);
              console.log("userCred", userCredential)
              //resetForm();
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
          {({ values, isSubmitting } ) => (
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
                color="white"
                w="100%"
                h="40px"
                mb="15%"
                color="#373737"
                _hover={{ bg: '#FF5454' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Google OAuth
              </Button>

              <Flex justify="space-between" align="center">
                <Link to="/reset" style={{ textDecoration: 'none' }}>
                  <Button
                    bg="#F7EEC7"
                    pt="10px"
                    pb="10px"
                    rounded="20px"
                    fontWeight="semibold"
                    color="white"
                    w="100%"
                    h="40px"
                    color="#747474"
                    // mb="60%"
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
                    pt="10px"
                    pb="10px"
                    rounded="20px"
                    fontWeight="semibold"
                    color="white"
                    w="100%"
                    h="40px"
                    color="#747474"
                    // mb="60%"
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
    </Flex>
  );
};

export default Login;
