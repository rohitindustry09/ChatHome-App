import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo }) => {
  const user = localStorage.getItem('user');
  if(children.type.name === 'Signup') {
    return user ? <Navigate to={redirectTo} /> : children;
  } else {
    return user ? children : <Navigate to={redirectTo} />;
  }
   /*else if(children.type.name === 'MyProfile') {
    return user ? children : <Navigate to={redirectTo} />;
  }*/
  
};

export default PrivateRoute;
