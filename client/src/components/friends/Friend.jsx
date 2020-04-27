// Dependencies
import React, { useContext } from 'react';
import { setUserChallenges, challengeAdjustMember } from '../../firebase.js';
import { ChallengeContext } from '../../providers/ChallengeProvider.jsx';

// Chakra + Forms
import { useToast, Flex, Box, Avatar } from '@chakra-ui/core';
import {
  BsFillPersonPlusFill,
  BsFillPersonFill,
  BsPersonCheck
} from 'react-icons/bs';
import { StyledIconButton } from '../../styledComponents/ericStyles.js';

const Friend = ({ UID, photoURL, displayName }) => {
  const challenge = useContext(ChallengeContext);
  const toast = useToast();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <Avatar name={displayName} src={photoURL} />
        <Box alignSelf="center" paddingLeft="1rem">
          {displayName}
        </Box>
      </Flex>
      {window.location.href.slice(window.location.href.length - 7) ===
      'friends' ? (
        <StyledIconButton
          icon={BsPersonCheck}
          verticalAlign="middle"
          onClick={() => {
            toast({
              title: `No more time. 😢`,
              description:
                "Viewing your friend's profile is not currently available. Our engineers are working hard at hand to bring this feature to you.",
              status: 'warning',
              duration: 9001,
              isClosable: true
            });
          }}
        />
      ) : (
        <StyledIconButton
          icon={
            challenge.members[UID] !== undefined
              ? BsFillPersonFill
              : BsFillPersonPlusFill
          }
          verticalAlign="middle"
          onClick={async () => {
            if (challenge.members[UID] === undefined) {
              try {
                await Promise.all([
                  challengeAdjustMember(challenge.CUID, UID),
                  setUserChallenges(challenge.CUID, UID)
                ]);

                toast({
                  title: `Success`,
                  description: `${displayName} has invited to ${challenge.challengeName}.`,
                  status: 'success',
                  duration: 9001,
                  isClosable: true
                });
              } catch (error) {
                toast({
                  title: 'An error occurred.',
                  description: error,
                  status: 'error',
                  duration: 9001,
                  isClosable: true
                });
              }
            } else {
              toast({
                title: `User already exists.`,
                description: `${displayName} is already participating in this challenge.`,
                status: 'warning',
                duration: 9001,
                isClosable: true
              });
            }
          }}
        />
      )}
    </Flex>
  );
};

export default Friend;
