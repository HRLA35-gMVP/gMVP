// Dependencies
import React from 'react';
import { Formik, Form, Field } from 'formik';

// Firebase Auth
import { auth, createUserProfileDocument } from '../../firebase.js';

const Register = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '' }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

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
        </Form>
      )}
    </Formik>
  );
};

export default Register;
