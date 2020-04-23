// Dependencies
import React, { useContext } from 'react';
import { signOut } from '../../../../firebase.js';

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
      <input placeholder="Friend Code" />
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
