
import React from 'react';
import { Typography, Container } from '@mui/material';

function About() {
  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" paragraph>
        Our job portal connects talented professionals with leading companies looking for their skills.
        We are dedicated to making job hunting a streamlined and efficient process, where you can find 
        opportunities that match your career goals.
      </Typography>
      <Typography variant="body1">
        Our mission is to bridge the gap between companies and talented individuals, fostering growth 
        and innovation across various industries.
      </Typography>
    </Container>
  );
}

export default About;
