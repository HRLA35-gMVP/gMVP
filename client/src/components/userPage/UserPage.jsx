// Dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Forms
import { signOut } from '../../firebase.js';
import { Button } from '@chakra-ui/core';

// Components
import AddFriend from '../AddFriend.jsx';

// Context
import { UserContext } from '../../providers/UsersProvider.jsx';

export const UserPage = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <p>Homies 💪😊</p>
      <p>{user.displayName}</p>
      <p>{user.uid}</p>
      {user.friends !== undefined ? (
        <div>
          <p>Friends: {user.friends.length}</p>
          <p>Groups: {user.groups.length}</p>
        </div>
      ) : null}
      <AddFriend />

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="solid" onClick={signOut}>
          Sign Out
        </Button>
      </Link>
    </div>
  );
};
