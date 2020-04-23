// Dependencies
import React, { Component, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField } from '@material-ui/core';

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
          <Field
            placeholder="Friend Code"
            name="friendCode"
            value={values.friendCode}
            type="input"
            as={TextField}
          />
          <Button disabled={isSubmitting} type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFriend;
