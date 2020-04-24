// Dependencies
import React, { Component, useContext } from 'react';

// Forms
import { Formik, Form } from 'formik';
import { Input, Button } from '@chakra-ui/core';

// Context
import { UserContext } from '../providers/UsersProvider.jsx';

// Components
import ValidatedTextField from './formHelpers/ValidatedField.jsx';

// Firestore
import { addFriend } from '../firebase.js';
import { friendCodeValidation } from './formHelpers/validators.js';

const AddFriend = () => {
  const user = useContext(UserContext);

  return (
    <Formik
      initialValues={{ friendCode: '' }}
      validationSchema={friendCodeValidation}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        if (user.friends[data.friendCode] === undefined) {
          try {
            await addFriend(user.uid, data.friendCode);
            console.log('Success');
          } catch (error) {
            console.error('AddFriend: ', error);
          }
        }

        if (data.friendCode === user.uid) {
          alert('Why are you adding yourself?');
        }

        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <ValidatedTextField
            placeholder="Friend Code"
            name="friendCode"
            value={values.friendCode}
            type="input"
            as={Input}
          />
          <Button variant="solid" disabled={isSubmitting} type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFriend;
