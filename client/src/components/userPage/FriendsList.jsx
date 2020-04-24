// Dependencies
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { Link } from 'react-router-dom';

// Chakra + Forms
import { Button } from '@chakra-ui/core';

const FriendsList = () => {
  const user = useContext(UserContext);

  console.log(user);

  return (
    <div>
      <Link to="/profile">
        <Button>Profile</Button>
      </Link>
    </div>
  );
};

export default FriendsList;
