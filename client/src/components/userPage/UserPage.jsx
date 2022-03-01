// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { signOutOfApp } from '../../firebase.js';
import {
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack
} from '@chakra-ui/core';
import { FiLogOut, FiUsers, FiEdit } from 'react-icons/fi';
import { MdPlaylistAdd } from 'react-icons/md';

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
    <Flex position="absolute" top="0" height="100%" width="100%">
      <StyledStack
        position="absolute"
        height="100%"
        width="100%"
        spacing="1rem"
      >
        <Box>
          <Avatar
            name={user.displayName}
            src={user.photoURL}
            size="xl"
          ></Avatar>

          <StyledAccItem>
            <StyleAccHeader>
              <Box flex="1">{user.displayName}</Box>
            </StyleAccHeader>
            <AccordionPanel>{user.uid}</AccordionPanel>
          </StyledAccItem>
        </Box>

        <Flex justifyContent="space-between" overflowX="scroll">
          <StyledBox>
            <Box minWidth="80px">
              <Heading as="h6" size="sm" paddingBottom="0.35rem">
                Completed
              </Heading>
              <StyledText>{user.completed}</StyledText>
            </Box>
          </StyledBox>
          <StyledBox>
            <Box minWidth="80px">
              <Heading as="h6" size="sm" paddingBottom="0.35rem">
                Wins
              </Heading>
              <StyledText>{user.wins}</StyledText>
            </Box>
          </StyledBox>
          <StyledBox>
            <Box minWidth="80px">
              <Heading as="h6" size="sm" paddingBottom="0.35rem">
                Friends
              </Heading>
              <StyledText>{Object.keys(user.friends).length - 1}</StyledText>
            </Box>
          </StyledBox>
        </Flex>

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

        <Box>
          <AddFriend />
        </Box>
      </StyledStack>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        paddingLeft="1rem"
        paddingRight="1rem"
        bg="#F7EEC7"
      >
        <Flex align="center" justify="center" justifyContent="space-between">
          {window.location.href.slice(window.location.href.length - 7) ===
          'profile' ? (
            <IconButton
              icon={FiLogOut}
              variant="solid"
              onClick={signOutOfApp}
              bg="#F7EEC7"
            />
          ) : (
            <Button as={Link} to="/profile" variant="solid" bg="#F7EEC7">
              Back To Your Profile
            </Button>
          )}

          <IconButton
            icon={FiEdit}
            as={Link}
            to="/edit"
            variant="solid"
            bg="#F7EEC7"
          />

          <IconButton
            icon={FiUsers}
            as={Link}
            to="/friends"
            variant="solid"
            bg="#F7EEC7"
          />

          <IconButton
            icon={MdPlaylistAdd}
            as={Link}
            to="/challenge/create"
            variant="solid"
            bg="#F7EEC7"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserPage;
