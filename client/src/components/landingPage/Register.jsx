// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@material-ui/core';

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
            <Field
              placeholder="Display Name"
              name="displayName"
              value={values.displayName}
              type="text"
              as={TextField}
            />
          </div>

          <Link to="/">
            <Button>Cancel</Button>
          </Link>
          <Button disabled={isSubmitting} type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
