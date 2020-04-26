// Dependencies
import { auth, createUserProfileDocument } from '../../firebase.js';
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
        pl="10%"
        pr="10%"
        pt="18%"
      >
         <Image
          rounded="full"
          w="220px"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/blueemail2.png"
          ml="auto"
          mr="auto"
          pl="10%"
          mb="18%"
        />

        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          validationSchema={registerValid}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            console.log('Formik:', data);

            try {
              const { user } = await auth.createUserWithEmailAndPassword(
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
            } finally {
              setSubmitting(false);
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
              <Box pt="10%"></Box>
              <ValidatorField
                placeholder="Password"
                name="password"
                value={values.password}
                type="password"
              />
              <Box pt="10%"></Box>
              <ValidatorField
                placeholder="Display Name"
                name="displayName"
                value={values.displayName}
                type="input"
              />

              <Button
                bg="#FFB6BA"
                w="100%"
                h="40px"
                mt="18%"
                rounded="20px"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                  variant="solid"
                  w="100%"
                  h="40px"
                  bg="#F7EEC7"
                  rounded="20px"
                  mt="10%"
                  mb="25%"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Cancel
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Register;
