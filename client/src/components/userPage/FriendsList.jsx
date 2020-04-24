// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { Link } from 'react-router-dom';
import { getUserDocument } from '../../firebase.js';

// Chakra + Forms
import { Button, Box, Text, Stack } from '@chakra-ui/core';

const FriendsList = () => {
  const user = useContext(UserContext);

  console.log(user);

  return (
    <Box>
      <Link to="/profile">
        <Button>Profile</Button>
      </Link>
      <Text>Number of Friends: {Object.keys(user.friends).length - 1}</Text>
      <Stack spacing="1rem" textAlign="center">
        {Object.keys(user.friends).map(async (friendUID, index) => {
          if (friendUID !== user.uid) {
            let user = await getUserDocument(friendUID);
            console.log(user);
            return (
              <Text key={index} index={index}>
                {friendUID}
              </Text>
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default FriendsList;
