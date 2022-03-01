import React, { useContext } from 'react';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { Navigate } from 'react-router-dom';


const RequireAuth = ( { children } ) => {
    const user = useContext(UserContext);
    console.log('user in req auth ', user)
    //if (!!user) {
    if (!user) return <Navigate to="/login"/>

  return children
}

export default RequireAuth