// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';

// Components
import FriendsList from './FriendsList.jsx';
import FriendsProvider from '../../providers/FriendsProvider.jsx';

const FriendsListHelper = () => {
  const user = useContext(UserContext);

  return (
    // <FriendsProvider>
    <FriendsList user={user.uid} friends={Object.keys(user.friends)} />
    // </FriendsProvider>
  );
};

export default FriendsListHelper;
