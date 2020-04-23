// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

// Components
import ValidatedTextField from './ValidatedField.jsx';

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
          <ValidatedTextField
            placeholder="Email Address"
            name="email"
            value={values.email}
            type="email"
            as={TextField}
          />
          <ValidatedTextField
            placeholder="Password"
            name="password"
            value={values.password}
            type="password"
            as={TextField}
          />
          <ValidatedTextField
            placeholder="Display Name"
            name="displayName"
            value={values.displayName}
            type="text"
            as={TextField}
          />

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Cancel</Button>
          </Link>

          <Button variant="contained" disabled={isSubmitting} type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
