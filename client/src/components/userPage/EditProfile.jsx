// Dependencies
import { editProfile, storage } from '../../firebase';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../providers/UsersProvider';

// Chakra + Forms
import { Formik, Form } from 'formik';
import {
  useToast,
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Stack
} from '@chakra-ui/core';
import ValidatorField from '../formHelpers/ValidatorField.jsx';
import { displayNameValid } from '../formHelpers/validators.js';
import FileHelper from '../editProfile/FileHelper';

const EditProfile = () => {
  const user = useContext(UserContext);
  const toast = useToast();

  return (
    <Box
      bg="#BEEBE9"
      height="100%"
      width="100%"
      pl="10%"
      pr="10%"
      pt="10%"
      position="absolute"
      top="0"
      overflowY="scroll"
    >
      <Flex direction="column" align="center" justify="center">
        <Box
          bg="#F7EEC7"
          pl="8%"
          pr="8%"
          boxShadow="1px 2px 3px #A2A2A2"
          align="center"
          mb="10%"
        >
          <Text textAlign="center" fontSize="lg" color="#464646">
            EDIT PROFILE
          </Text>
        </Box>
        <Box align="center">
          <Avatar
            ml="auto"
            mr="auto"
            src={user.photoURL}
            size="2xl"
            position="relative"
            mb="-8%"
          />
        </Box>
        <FileHelper />
        <Text
          mt="3%"
          fontSize="sm"
          color="#2E2E2E"
          position="relative"
          mt="10%"
          fontWeight="semibold"
        >
          {user.email}
        </Text>
      </Flex>
      <Formik
        initialValues={{ displayName: '' }}
        validationSchema={displayNameValid}
        onSubmit={async (data, { resetForm }) => {
          try {
            await editProfile(user.uid, data);
            toast({
              title: 'Display name changed!',
              description: `${data.displayName} is now your display name.`,
              status: 'success',
              duration: 2000,
              isClosable: true
            });
            resetForm();
          } catch (error) {
            toast({
              title: 'An error occurred.',
              description: error,
              status: 'error',
              duration: 5000,
              isClosable: true
            });
          } finally {
            return null;
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Flex
            as={Form}
            direction="column"
            marginTop="1.5rem"
            marginBottom="1.5rem"
          >
            <Text fontSize="xs" textAlign="left">
              Display Name
            </Text>
            <ValidatorField
              placeholder={user.displayName}
              name="displayName"
              value={values.displayName}
              type="input"
            />

            <Button
              bg="#FFB6BA"
              rounded="20px"
              fontWeight="semibold"
              w="100%"
              h="40px"
              marginTop="1.5rem"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        )}
      </Formik>

      <Button
        as={Link}
        to="/profile"
        align="center"
        bg="#F7EEC7"
        w="100%"
        h="40px"
        bg="#F7EEC7"
        rounded="20px"
        marginBottom="1.5rem"
      >
        Cancel
      </Button>

      <Button
        bg="#FF5454"
        rounded="20px"
        variant="solid"
        w="100%"
        color="white"
        onClick={() => {
          toast({
            title: 'No leaving.',
            description: '​👹​👺​👻​',
            status: 'error',
            duration: 9001,
            isClosable: true
          });
        }}
      >
        Delete Account
      </Button>
    </Box>
  );
};

export default EditProfile;
