// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { FriendsContext } from '../../providers/FriendsProvider.jsx';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { signOut } from '../../firebase.js';
import {
  Button,
  SimpleGrid,
  Box,
  Avatar,
  AccordionPanel,
  Heading
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

const UserPage = () => {
  const user = useContext(UserContext);
  const friends = useContext(FriendsContext);

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
            <StyledText>0</StyledText>
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
            <StyledText>0</StyledText>
          </Box>
        </StyledBox>
        <Link to="/friends">
          <StyledBox>
            <Heading as="h6" size="sm" paddingBottom="0.35rem">
              Friends
            </Heading>
            <StyledText>{Object.keys(user.friends).length - 1}</StyledText>
          </StyledBox>
        </Link>
      </SimpleGrid>

      <StyledBox>
        <Heading as="h6" size="sm" paddingBottom="0.35rem">
          Active Challenges
        </Heading>
        <StyledText>{Object.keys(user.challenges).length}</StyledText>
      </StyledBox>

      <Box>
        <AddFriend />
      </Box>

      <Button variant="solid" onClick={() => console.log(friends.getFriends())}>
        Friends
      </Button>

      <Button variant="solid" onClick={signOut}>
        Sign Out
      </Button>
    </StyledStack>
  );
};

export default UserPage;
