
import React from 'react';
import { Typography, Container } from '@mui/material';

function About() {
  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" paragraph>
      Welcome to our Job Portal, where opportunity meets talent! Our platform bridges the gap between skilled professionals and top-tier companies actively seeking expertise across various industries. Whether you're a seasoned professional or just starting your career, we are dedicated to making the job search process intuitive, efficient, and tailored to your needs. Discover a wide range of opportunities aligned with your career aspirations. From full-time roles to internships, our portal empowers you to explore job openings, connect with leading organizations, and take the next step in your professional journey. With advanced search features, personalized recommendations, and resources to enhance your resume and interview skills, we ensure you are well-equipped to succeed. Join us today to unlock opportunities and achieve your career goals.
      </Typography>
      <Typography variant="body1">
      Our mission is to connect talented professionals with innovative companies, driving growth and fostering success across industries.
      We aim to bridge the gap between skilled individuals and the opportunities they seek, helping companies build strong, diverse teams while empowering professionals to achieve their career goals.
      </Typography>
    </Container>
  );
}

export default About;