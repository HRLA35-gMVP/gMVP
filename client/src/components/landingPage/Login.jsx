// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@material-ui/core';

// Firebase Auth
import { signInWithGoogle, signInWithEmail } from '../../firebase.js';

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {
            await signInWithEmail(data.email, data.password);
          } catch (error) {
            console.error('handleEmalSignIn Error:', error);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <Field
                placeholder="Email Address"
                name="email"
                value={values.email}
                type="email"
                as={TextField}
              />
            </div>
            <div>
              <Field
                placeholder="Password"
                name="password"
                value={values.password}
                type="password"
                as={TextField}
              />
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Email Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <Button onClick={signInWithGoogle}>Google OAuth</Button>
      </div>
      <Link to="/register">
        <Button>Register</Button>
      </Link>
    </div>
  );
};

export default Login;
