import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
 
  const token = localStorage.getItem('token');

  return (
    token ? <Component {...props}/> : <Navigate to='/' replace/>
  );
};

export default ProtectedRouteElement;
