// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { ChallengeContext } from '../../providers/ChallengeProvider.jsx';

// Components
import FriendsList from './FriendsList.jsx';

const FriendsListHelper = () => {
  const user = useContext(UserContext);
  const challenge = useContext(ChallengeContext);

  return (
    <FriendsList
      user={user.uid}
      friends={Object.keys(user.friends)}
      CUID={challenge.CUID}
    />
  );
};

export default FriendsListHelper;
