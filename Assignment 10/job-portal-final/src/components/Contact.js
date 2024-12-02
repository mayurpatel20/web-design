import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:mayurshiroya2011@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        Have questions or feedback? Feel free to reach out to us using the form below.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
           backgroundColor: '#388E3C', 
             '&:hover': {
            backgroundColor: '#2C6F2D', 
          },
            marginTop: '10px',
          }}
          >
           Send Message
          </Button>

      </form>
    </Container>
  );
}

export default Contact;
