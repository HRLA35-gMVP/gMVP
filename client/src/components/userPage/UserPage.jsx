// Dependencies
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from '../../firebase.js';
import { Button } from '@material-ui/core';

// Components
import AddFriend from '../AddFriend.jsx';

// Context
import { UserContext } from '../../providers/UsersProvider.jsx';

export const UserPage = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  const handleSignOut = async () => {
    history.push('/');
    await signOut();
  };

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

      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};
