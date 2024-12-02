import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import axios from '../api';

function AddJobs() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/create/job', formData);
      setMessage(response.data.message);
      setFormData({ companyName: '', jobTitle: '', description: '', salary: '' }); 
    } catch (error) {
      setMessage('Failed to add job. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Add a New Job</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <div style={{ marginTop: '20px' }}>
          {loading ? (
            <CircularProgress />
          ) : (
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
           Add Job
          </Button>

          )}
        </div>
      </form>
      {message && (
        <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default AddJobs;
