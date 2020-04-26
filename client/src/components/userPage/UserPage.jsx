// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { signOut } from '../../firebase.js';
import {
  Button,
  SimpleGrid,
  Box,
  Avatar,
  AccordionPanel,
  Heading,
  Stack
} from '@chakra-ui/core';

// Components + Styles
import AddFriend from './AddFriend.jsx';
import {
  StyledStack,
  StyledAccItem,
  StyleAccHeader,
  StyledBox,
  StyledText
} from '../../styledComponents/ericStyles.js';
import ActiveChallenges from './ActiveChallenges.jsx';

const UserPage = () => {
  const user = useContext(UserContext);

  return (
    <StyledStack spacing="1rem">
      <Box>
        <Avatar name={user.displayName} src={user.photoURL} size="xl"></Avatar>

        <StyledAccItem>
          <StyleAccHeader>
            <Box flex="1">{user.displayName}</Box>
          </StyleAccHeader>
          <AccordionPanel>{user.uid}</AccordionPanel>
        </StyledAccItem>
      </Box>

      <SimpleGrid columns={2} spacing="3rem">
        <StyledBox>
          <Box>
            <Heading as="h6" size="sm" paddingBottom="0.35rem">
              Completed Challenges
            </Heading>
            <StyledText>{user.completed}</StyledText>
          </Box>
          <Box>
            <Heading
              as="h6"
              size="sm"
              paddingBottom="0.35rem"
              paddingTop="0.25rem"
            >
              Wins
            </Heading>
            <StyledText>{user.wins}</StyledText>
          </Box>
        </StyledBox>
        <StyledBox>
          <Link to="/friends">
            <Heading as="h6" size="sm" paddingBottom="0.35rem">
              Friends
            </Heading>
            <StyledText>{Object.keys(user.friends).length - 1}</StyledText>
          </Link>
        </StyledBox>
      </SimpleGrid>

      <Link to="/challenge/create">
        <StyledBox>
          {Object.keys(user.challenges).length === 0 ? (
            <Heading as="h6" size="sm">
              No Active Challenges
            </Heading>
          ) : (
            <Stack spacing="0.25rem">
              <Heading as="h6" size="sm">
                Active Challenges
              </Heading>
              <SimpleGrid columns={3}>
                <Heading as="h6" size="xs">
                  Challenge
                </Heading>
                <Heading as="h6" size="xs">
                  Members
                </Heading>
                <Heading as="h6" size="xs">
                  Duration
                </Heading>
              </SimpleGrid>
              <ActiveChallenges user={user} />
            </Stack>
          )}
        </StyledBox>
      </Link>

      <Box>
        <AddFriend />
      </Box>

      <Button as={Link} to="/edit" variant="solid">
        Edit
      </Button>

      <Button variant="solid" onClick={signOut}>
        Sign Out
      </Button>
    </StyledStack>
  );
};

export default UserPage;
