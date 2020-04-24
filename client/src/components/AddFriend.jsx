// Dependencies
import React, { useContext } from 'react';

// Forms
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
import { friendCodeValid } from './formHelpers/validators.js';

// Context
import { UserContext } from '../providers/UsersProvider.jsx';

// Components
import ValidatorField from './formHelpers/ValidatorField.jsx';

// Firestore
import { addFriend } from '../firebase.js';

// Check if the input is the same as the current user's ID
const selfCheck = (input, user) => {
  if (input === user.uid) return 'Why are you trying to adding yourself?';
  if (user.friends[input] !== undefined) return 'Friend already exists.';
  return '';
};

const AddFriend = () => {
  const user = useContext(UserContext);

  return (
    <Formik
      initialValues={{ friendCode: '' }}
      validationSchema={friendCodeValid}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        if (
          user.friends[data.friendCode] === undefined &&
          data.friendCode !== ''
        ) {
          try {
            const found = await addFriend(user.uid, data.friendCode);
            if (!found) {
              alert('User not found. Double check input');
            } else {
              resetForm();
            }
          } catch (error) {
            resetForm();
            alert('AddFriend: ', error);
          }
        }

        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <ValidatorField
            placeholder="Friend Code"
            name="friendCode"
            value={values.friendCode}
            type="input"
            callback={(data) => selfCheck(data, user)}
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
