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
    <React.Fragment>
      <p>Homies 💪😊</p>
      <p>{user.displayName}</p>
      <p>{user.uid}</p>
      <p>{user.uid.length}</p>
      {user.friends !== undefined ? (
        <div>
          <p>Friends: {Object.keys(user.friends).length - 1}</p>
          <p>Groups: {Object.keys(user.groups).length}</p>
        </div>
      ) : null}
      <AddFriend />

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="solid" onClick={signOut}>
          Sign Out
        </Button>
      </Link>
    </React.Fragment>
  );
};
