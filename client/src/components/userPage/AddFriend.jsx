// Dependencies
import { addFriend } from '../../firebase.js';
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { Button, Flex, useToast } from '@chakra-ui/core';
import { friendCodeValid } from '../formHelpers/validators.js';

// Components
import ValidatorField from '../formHelpers/ValidatorField.jsx';

// Check if the input is the same as the current user's ID
const selfCheck = (input, user) => {
  if (input === user.uid) return 'Why are you trying to add yourself?';
  if (user.friends[input] !== undefined) return 'Friend already exists.';
  return '';
};

const AddFriend = () => {
  const user = useContext(UserContext);
  const toast = useToast();

  return (
    <Formik
      initialValues={{ friendCode: '' }}
      validationSchema={friendCodeValid}
      onSubmit={async (data, { resetForm }) => {
        if (
          user.friends[data.friendCode] === undefined &&
          data.friendCode !== ''
        ) {
          try {
            const found = await addFriend(user.uid, data.friendCode);
            if (!found) {
              toast({
                title: 'An error occurred.',
                description: 'Invalid friend code.',
                status: 'error',
                duration: 9001,
                isClosable: true
              });
            } else {
              resetForm();

              toast({
                title: 'Friend added!',
                description: `${found} has been added to your friends list.`,
                status: 'success',
                duration: 9001,
                isClosable: true
              });
            }
          } catch (error) {
            resetForm();

            toast({
              title: 'An error occurred.',
              description: error,
              status: 'error',
              duration: 9001,
              isClosable: true
            });
          }
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Flex as={Form}>
          <ValidatorField
            placeholder="Friend Code"
            name="friendCode"
            value={values.friendCode}
            type="input"
            callback={(data) => selfCheck(data, user)}
          />
          <Button
            variant="solid"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            bg="#FFB6BA"
          >
            Add
          </Button>
        </Flex>
      )}
    </Formik>
  );
};

export default AddFriend;
