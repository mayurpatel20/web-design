import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      console.log('Login Response:', response.data); 
      dispatch(login({ role: response.data.role }));
      navigate('/');
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#f3f4f6', 
        padding: '20px',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '20px', color: '#6b7280' }}>
          Please enter your credentials to continue
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#4CAF50', 
              '&:hover': {
                backgroundColor: '#388E3C', 
              },
            }}
          >
            Login
          </Button>
        </form>
        {errorMessage && (
          <Alert severity="error" sx={{ marginTop: '20px' }}>
            {errorMessage}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
