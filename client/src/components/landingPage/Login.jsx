// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Forms
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
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
    <div>
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
          </Form>
        )}
      </Formik>

      <div>
        <Button variant="solid" onClick={handleOAuth}>
          Google OAuth
        </Button>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="solid">Return</Button>
      </Link>
    </div>
  );
};

export default Login;
