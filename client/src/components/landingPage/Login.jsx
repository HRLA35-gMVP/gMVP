// Dependencies
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';

// Firebase Auth
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';

// Components
import ValidatedTextField from './ValidatedField.jsx';

// Yup Validation
import { loginValidation } from '../../validators.js';

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
          } catch (error) {
            alert('Incorrect Email or Password.');
          } finally {
            setSubmitting(false);
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
              as={TextField}
            />

            <ValidatedTextField
              placeholder="Password"
              name="password"
              value={values.password}
              type="password"
              as={TextField}
            />

            <Button variant="contained" disabled={isSubmitting} type="submit">
              Email Login
            </Button>
          </Form>
        )}
      </Formik>

      <div>
        <Button variant="contained" onClick={handleOAuth}>
          Google OAuth
        </Button>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained">Return</Button>
      </Link>
    </div>
  );
};

export default Login;
