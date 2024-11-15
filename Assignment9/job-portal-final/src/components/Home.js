
import React from 'react';
import { Typography, Container } from '@mui/material';

function Home() {
  return (
    <Container style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>Welcome to the Job Portal</Typography>
      <Typography variant="body1">
        Discover job opportunities, connect with top companies, and take the next step in your career.
        Our portal is designed to help job seekers find the right match for their skills and experience.
      </Typography>
    </Container>
  );
}

export default Home;

