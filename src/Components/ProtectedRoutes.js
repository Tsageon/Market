
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    navigate('/login', { state: { from: location } });
    return null;
  }

  return children;
};

export default ProtectedRoute;