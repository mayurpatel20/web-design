import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
