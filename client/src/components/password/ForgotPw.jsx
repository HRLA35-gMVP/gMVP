// Dependencies
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordWithEmail } from '../../firebase.js';

// Chakra + Forms
import {
  useToast,
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Icon,
  Image
} from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import ValidatorField from '../formHelpers/ValidatorField.jsx';
import { emailValid } from '../formHelpers/validators.js';

const ForgotPassword = () => {
  const history = useNavigate();
  const toast = useToast();

  return (
    <React.Fragment>
      <Box
        bg="#BEEBE9"
        p={[2, 4, 6, 8]}
        height="full"
        width={[
          '100%', // base
          '50%', // 480px upwards
          '25%', // 768px upwards
          '15%' // 992px upwards
        ]}
        pl="10%"
        pr="10%"
        pt="18%"
      >
        <Flex direction="column" align="center" justify="center">
          <Text textAlign="center" color="#747474" mb="3%">FORGOT PASSWORD</Text>
          <Image
            w="300px"
            src="https://mvp2020.s3-us-west-1.amazonaws.com/bluelock.png"
            ml="auto"
            mr="auto"
            mb="20%"
          />
        </Flex>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValid}
          onSubmit={async (data, { resetForm }) => {
            try {
              await resetPasswordWithEmail(data.email);

              resetForm();

              history.push('/reset/confirmation');
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: error,
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
                  placeholder="Enter Email Address"
                  name="email"
                  value={values.email}
                  type="input"
                />

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
                  mt="15%"
                  color="#373737"
                  _hover={{ bg: '#FFB6BA' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  Reset Password
                </Button>

                <Button
                  as={Link}
                  to="/login"
                  align="center"
                  w="100%"
                  h="40px"
                  mt="10%"
                  bg="#F7EEC7"
                  rounded="20px"
                  mb="30%"
                >
                  Cancel
                </Button>
            
            </Form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPassword;
