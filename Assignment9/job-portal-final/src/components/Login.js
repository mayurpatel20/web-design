import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
      setMessage(response.data.message);
      navigate('/'); 
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || 'An unknown error occurred'));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
