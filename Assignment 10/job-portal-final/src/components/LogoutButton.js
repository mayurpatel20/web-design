import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <Button
     variant="contained"
     color="secondary"
     onClick={handleLogout}
     sx={{
      backgroundColor: '#388E3C', 
     '&:hover': {
      backgroundColor: '#2C6F2D', 
    },
    marginTop: '10px',
    marginLeft: 'auto', 
  }}
>
  Logout
</Button>

  );
}

export default LogoutButton;
