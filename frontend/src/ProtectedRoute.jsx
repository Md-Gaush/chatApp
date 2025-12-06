import React from 'react'

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ( {children}) => {
    
  const { authUser } = useSelector((state) => state.user);
  if(!authUser){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute
