// Dependencies
import React, { useContext } from 'react';

// Forms
import { signOut } from '../../firebase.js';
import {
  Button,
  Stack,
  SimpleGrid,
  Box,
  Text,
  Avatar,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/core';

// Components
import AddFriend from '../AddFriend.jsx';

// Context
import { UserContext } from '../../providers/UsersProvider.jsx';

export const UserPage = () => {
  const user = useContext(UserContext);

  return (
    <Stack spacing={'1rem'} textAlign="center">
      <Box>
        <Avatar name={user.displayName} src={user.photoURL}></Avatar>

        <AccordionItem>
          <AccordionHeader>
            <Box flex="1">{user.displayName}</Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel>{user.uid}</AccordionPanel>
        </AccordionItem>
      </Box>

      <SimpleGrid columns={2} spacing={'3rem'}>
        <Box>
          <Box>
            <Text>Completed Challenges</Text>
            <Text backgroundColor="#F7FAFC">0</Text>
          </Box>
          <Box>
            <Text>Wins</Text>
            <Text backgroundColor="#F7FAFC">0</Text>
          </Box>
        </Box>
        <Box>
          <Text>Friends</Text>
          <Text backgroundColor="#F7FAFC">
            {Object.keys(user.friends).length - 1}
          </Text>
        </Box>
      </SimpleGrid>

      <Box>
        <Text>Groups</Text>
        <Text backgroundColor="#F7FAFC">{Object.keys(user.groups).length}</Text>
      </Box>

      <Box>
        <AddFriend />
      </Box>

      <Button variant="solid" onClick={signOut}>
        Sign Out
      </Button>
    </Stack>
  );
};
