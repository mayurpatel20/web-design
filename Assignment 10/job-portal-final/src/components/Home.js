

import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function Home() {
  return (
    <Container style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>Welcome to the Job Portal</Typography>
      <Typography variant="body1" gutterBottom>
      Discover job opportunities, connect with top companies, and advance your career. Our portal helps job seekers find the right opportunities that match their skills and experience, making the job search process simple and efficient.
      </Typography>
      
      <Box mt={4}>
        <img
          src="imagehome.png"
          alt="Job Search"
          style={{ width: '80%', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box>
    </Container>
  );
}

export default Home;

