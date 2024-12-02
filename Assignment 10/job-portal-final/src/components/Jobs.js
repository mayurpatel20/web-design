import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Container, Button } from '@mui/material';
import axios from '../api';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/get/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Available Jobs</Typography>
      {currentJobs.map((job) => (
        <Card key={job._id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">{job.jobTitle}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{job.companyName}</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>{job.description}</Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
              Salary: ${job.salary}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Pagination Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
        >
          Previous
        </Button>
        <Typography variant="body1" style={{ alignSelf: 'center' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default Jobs;
