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
  Stack,
  Button
} from '@chakra-ui/core';
import ValidatorField from '../formHelpers/ValidatorField.jsx';
import { displayNameValid } from '../formHelpers/validators.js';
import FileHelper from '../editProfile/FileHelper';

const EditProfile = () => {
  const user = useContext(UserContext);
  const toast = useToast();

  return (
    <React.Fragment>
      <Stack
        isInline
        bg="#FFB6BA"
        pl="4%"
        pr="4%"
        width={[
          '100%', // base
          '50%', // 480px upwards
          '25%', // 768px upwards
          '15%' // 992px upwards
        ]}
        justifyContent="space-between"
      >
        <Button
          as={Link}
          to="/profile"
          align="center"
          variant="link"
          color="#E8E8E8"
          pb="4%"
          pt="4%"
        >
          Cancel
        </Button>
        <Text
          variant="link"
          color="#fff"
          fontSize="18px"
          fontWeight="bold"
          pb="4%"
          pt="4%"
        >
          Edit Profile
        </Text>
        <Button
          as={Link}
          to="/profile"
          align="center"
          variant="link"
          color="#E8E8E8"
          pb="4%"
          pt="4%"
        >
          Save
        </Button>
      </Stack>
      <Box
        bg="#BEEBE9"
        p={[2, 4, 6, 8]}
        height="full"
        width={[
          '100%', // base
          '50%', // 480px upwards
          '25%', // 768px upwards
          '15%' // 992px upwards
        ]}
      >
        <Flex direction="column" align="center" justify="center">
          <Box pt="10%">
            <Avatar src={user.photoURL} size="xl" />
          </Box>

          <Text
            pt="2%"
            fontSize={['sm', 'md', 'lg', 'xl']}
            color="##373737"
            align="center"
            justify="center"
          >
            {user.displayName}
          </Text>
        </Flex>

        <Stack spacing={0.25} pt="15%" pb="5%" align="left" pl="5%" pr="5%">
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
                  duration: 9001,
                  isClosable: true
                });
                resetForm();
              } catch (error) {
                toast({
                  title: 'An error occurred.',
                  description: error,
                  status: 'error',
                  duration: 9001,
                  isClosable: true
                });
              } finally {
                return null;
              }
            }}
          >
            {({ values, isSubmitting }) => (
              <Flex as={Form}>
                <ValidatorField
                  placeholder="Display Name"
                  name="displayName"
                  value={values.displayName}
                  type="input"
                />
                <Button
                  variant="solid"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Edit
                </Button>
              </Flex>
            )}
          </Formik>
        </Stack>

        <Stack spacing={0.25} pt="8%" pb="20%" align="left" pl="5%" pr="5%">
          <FileHelper />
        </Stack>

        <Flex direction="column" align="center" justify="center" pb="30%">
          <Button
            variantColor="red"
            rounded="20px"
            variant="solid"
            w="80%"
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
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default EditProfile;
