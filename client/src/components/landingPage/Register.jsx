// Dependencies
import { registerWithEmailAndPassword, createUserProfileDocument } from '../../firebase.js';
import React from 'react';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { Button, useToast, Flex, Box, Image } from '@chakra-ui/core';
import { registerValid } from '../formHelpers/validators.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Register = () => {
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
        paddingLeft="10%"
        paddingRight="10%"
        paddingTop="15%"
      >
        <Image
          rounded="full"
          width="220px"
          marginLeft="15%"
          marginBottom="10%"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/blueemail2.png"
        />

        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          validationSchema={registerValid}
          onSubmit={async (data, { resetForm }) => {
            try {
              const { user } = await registerWithEmailAndPassword(
                data.email,
                data.password
              );

              createUserProfileDocument(user, {
                displayName: data.displayName
              });

              resetForm();
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: 'Email already in use.',
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

              <Box paddingTop="10%">
                <ValidatorField
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  type="password"
                />
              </Box>

              <Box paddingTop="10%">
                <ValidatorField
                  placeholder="Display Name"
                  name="displayName"
                  value={values.displayName}
                  type="input"
                />
              </Box>

              <Button
                background="#FFB6BA"
                variant="solid"
                rounded="20px"
                width="100%"
                height="40px"
                marginTop="18%"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>

              <Button
                as={Link}
                to="/"
                background="#F7EEC7"
                variant="solid"
                rounded="20px"
                width="100%"
                height="40px"
                marginTop="10%"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Register;
