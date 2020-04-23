// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

const Register = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '' }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        console.log('Formik:', data);

        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            data.email,
            data.password
          );

          createUserProfileDocument(user, { displayName: data.displayName });
        } catch (error) {
          console.error('handleRegistration Error:', error);
        } finally {
          setSubmitting(false);
          resetForm();
          history.push('/');
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
          <Field
            placeholder="Display Name"
            name="displayName"
            value={values.displayName}
            type="text"
          />

          <button disabled={isSubmitting} type="submit">
            Register
          </button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
