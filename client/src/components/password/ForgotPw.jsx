// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPasswordWithEmail } from '../../firebase.js';

// Chakra + Forms
import {
  useToast,
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Icon
} from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import ValidatorField from '../formHelpers/ValidatorField.jsx';
import { emailValid } from '../formHelpers/validators.js';

const ForgotPassword = () => {
  const history = useHistory();
  const toast = useToast();

  return (
    <React.Fragment>
      <Stack
        isInline
        bg="#F7EEC7"
        pl="4%"
        pr="4%"
        width={[
          '100%', // base
          '50%', // 480px upwards
          '25%', // 768px upwards
          '15%' // 992px upwards
        ]}
        justifyContent="space-between"
      >
        <Button
          as={Link}
          to="/login"
          align="center"
          variant="link"
          color="#8B8B8B"
          pb="4%"
          pt="4%"
        >
          Cancel
        </Button>
        <Text
          variant="link"
          color="#464646"
          fontSize="18px"
          fontWeight="bold"
          pb="4%"
          pt="4%"
        >
          Forgot Password
        </Text>
        <Button variant="link" color="#E8E8E8" pb="4%" pt="4%"></Button>
      </Stack>

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
      >
        <Flex direction="column" align="center" justify="center">
          <Icon pt="20%" name="lock" size="200px" color="#F7EEC7" />
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
              <Stack
                spacing={0.25}
                pt="30%"
                pb="20%"
                align="left"
                pl="5%"
                pr="5%"
              >
                <ValidatorField
                  placeholder="Email Address"
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
                  color="#373737"
                  _hover={{ bg: '#FFB6BA' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  Reset Password
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPassword;
