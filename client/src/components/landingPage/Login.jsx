// Dependencies
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Forms
import { Formik, Form } from 'formik';
import { Input, Button } from '@chakra-ui/core';
import { loginValidation } from '../formHelpers/validators.js';

// Firebase Auth
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';

// Components
import ValidatedTextField from '../formHelpers/ValidatedField.jsx';

const Login = () => {
  const history = useHistory();

  const handleOAuth = async () => {
    await signInWithGoogle();
    history.push('/profile');
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {
            await signInWithEmail(data.email, data.password);
            resetForm();
            setSubmitting(false);
            history.push('/profile');
          } catch (error) {
            setSubmitting(false);
            alert('Incorrect Email or Password.');
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <ValidatedTextField
              placeholder="Email Address"
              name="email"
              value={values.email}
              type="input"
              as={Input}
            />

            <ValidatedTextField
              placeholder="Password"
              name="password"
              value={values.password}
              type="password"
              as={Input}
            />

            <Button variant="solid" disabled={isSubmitting} type="submit">
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
