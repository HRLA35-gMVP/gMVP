// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { Button, useToast } from '@chakra-ui/core';
import { loginValid } from '../formHelpers/validators.js';

// Firebase Auth
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Login = () => {
  const toast = useToast();

  return (
    <Formik
      initialValues={{ email: '123@123.com', password: '123123' }}
      validationSchema={loginValid}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

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

          <ValidatorField
            placeholder="Password"
            name="password"
            value={values.password}
            type="password"
          />

          <Button
            variant="solid"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Email Login
          </Button>

          <div>
            <Button
              variant="solid"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={signInWithGoogle}
            >
              Google OAuth
            </Button>
          </div>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="solid"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Return
            </Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
