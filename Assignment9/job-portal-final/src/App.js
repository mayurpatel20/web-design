
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import JobListing from './components/JobListing';
import CompanyShowcase from './components/CompanyShowcase';
import LogoutButton from './components/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute';
import { AppBar, Toolbar, Button } from '@mui/material';



function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" component={Link} to="/jobs">Job Listings</Button>
          <Button color="inherit" component={Link} to="/company-showcase">Company Showcase</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Routes>
        {/* Only accessible if logged in */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobListing /></ProtectedRoute>} />
        <Route path="/company-showcase" element={<ProtectedRoute><CompanyShowcase /></ProtectedRoute>} />
        
        {/* Login page is accessible to everyone */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;