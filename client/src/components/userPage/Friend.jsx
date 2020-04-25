// Dependencies
import React, { useContext } from 'react';

// Chakra + Forms
import { Flex, Box, Avatar } from '@chakra-ui/core';
import { BsFillPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs';
import { StyledIconButton } from '../../styledComponents/ericStyles';
import { FriendsContext } from '../../providers/FriendsProvider';

const Friend = ({ UID, photoUrl, displayName }) => {
  const friends = useContext(FriendsContext);

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <Avatar name={displayName} src={photoUrl} />
        <Box alignSelf="center" paddingLeft="1rem">
          {displayName}
        </Box>
      </Flex>
      <StyledIconButton
        variant="outline"
        icon={
          friends.friends[UID] !== undefined
            ? BsFillPersonDashFill
            : BsFillPersonPlusFill
        }
        verticalAlign="middle"
        onClick={() => {
          if (friends.friends[UID] === undefined) {
            friends.addFriend(UID);
          } else {
            friends.removeFriend(UID);
          }
        }}
      />
    </Flex>
  );
};

export default Friend;
