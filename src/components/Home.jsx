import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';


// Generate random information
const getRandomInfo = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return `Random Information: ${randomNumber}`;
};

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to my React App!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This is the home page.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="body1" gutterBottom>
          {getRandomInfo()}
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleLogout} sx={{ marginTop: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;