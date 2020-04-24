// Dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Forms
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
import { registerValid } from '../formHelpers/validators.js';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

const Register = () => {
  const history = useHistory();

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
          <ValidatorField
            placeholder="Display Name"
            name="displayName"
            value={values.displayName}
            type="input"
          />

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="solid">Cancel</Button>
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
