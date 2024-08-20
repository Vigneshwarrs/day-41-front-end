import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';

// Array of random facts
const randomFacts = [
  "Did you know? The Eiffel Tower can be 15 cm taller during the summer.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "Bananas are berries, but strawberries aren’t.",
  "Wombat poop is cube-shaped.",
  "There’s only one letter that doesn’t appear in any U.S. state name: Q.",
  "Octopuses have three hearts.",
  "Cats have fewer toes on their back paws.",
  "A group of flamingos is called a 'flamboyance'."
];

// Function to shuffle array and get unique facts
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Home = () => {
  const navigate = useNavigate();
  const [randomInfo, setRandomInfo] = useState([]);

  useEffect(() => {
    // Shuffle the facts and pick the first 3 unique ones
    const shuffledFacts = shuffleArray(randomFacts);
    const uniqueFacts = shuffledFacts.slice(0, 3); // Get 3 unique facts
    setRandomInfo(uniqueFacts);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to My React App!
      </Typography>
      <Typography variant="h6" gutterBottom>
        This is the home page. Enjoy some fun facts!
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        {randomInfo.map((info, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="body1">
                {info}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{ marginTop: 3, paddingX: 5 }}
        color="primary"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
