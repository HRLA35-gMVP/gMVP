// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Forms
import { Formik, Form } from 'formik';
import { Input, Button } from '@chakra-ui/core';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

// Components
import ValidatedTextField from '../formHelpers/ValidatedField.jsx';

// Yup Validation
import { registerValidation } from '../formHelpers/validators.js';

const Register = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ displayName: '', email: '', password: '' }}
      validationSchema={registerValidation}
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
          history.push('/profile');
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
          <ValidatedTextField
            placeholder="Display Name"
            name="displayName"
            value={values.displayName}
            type="input"
            as={Input}
          />

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="solid">Cancel</Button>
          </Link>

          <Button variant="solid" disabled={isSubmitting} type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
