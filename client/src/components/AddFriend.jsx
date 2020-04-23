// Dependencies
import React, { Component, useContext } from 'react';
import { Formik, Form, Field } from 'formik';

// Context
import { UserContext } from '../providers/UsersProvider.jsx';

const AddFriend = () => {
  const user = useContext(UserContext);

  return (
    <Formik
      initialValues={{ friendCode: '' }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        console.log('Formik:', data);

        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Field name="friendCode" value={values.friendCode} type="input" />
          <button disabled={isSubmitting} type="submit">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFriend;
