// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

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
            <Field
              placeholder="Email Address"
              name="email"
              value={values.email}
              type="email"
            />
            <Field
              placeholder="Password"
              name="password"
              value={values.password}
              type="password"
            />
            <button disabled={isSubmitting} type="submit">
              Email Login
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={signInWithGoogle}>Google OAuth</button>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Login;
