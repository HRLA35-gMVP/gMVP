// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Forms
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
import { registerValid } from '../formHelpers/validators.js';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Register = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '' }}
      validationSchema={registerValid}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        console.log('Formik:', data);

        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            data.email,
            data.password
          );

          createUserProfileDocument(user, { displayName: data.displayName });

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

          <ValidatorField
            placeholder="Display Name"
            name="displayName"
            value={values.displayName}
            type="input"
          />

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="solid"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Cancel
            </Button>
          </Link>

          <Button
            variant="solid"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
