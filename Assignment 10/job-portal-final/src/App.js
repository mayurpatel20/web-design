import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import { AppBar, Toolbar, Button } from '@mui/material';

import Login from './components/Login';
import Employees from './components/Employees';
import AddJobs from './components/AddJobs';
import Jobs from './components/Jobs';
import About from './components/About';
import Contact from './components/Contact';
import CompanyShowcase from './components/CompanyShowcase';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    localStorage.removeItem('authToken'); // Clear localStorage
    localStorage.removeItem('role');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Router>
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: '#5c7258', // Custom header color (green)
          color: '#FFFFFF', // Text color for better contrast
        }}
      >
        <Toolbar>
          {/* Navbar Links */}
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/about">
                About Us
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact Us
              </Button>
              <Button color="inherit" component={Link} to="/company-showcase">
                Company Showcase
              </Button>

              {/* Admin-Specific Buttons */}
              {role === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/employees">
                    Employees
                  </Button>
                  <Button color="inherit" component={Link} to="/add-jobs">
                    Add Jobs
                  </Button>
                </>
              )}

              {/* Employee-Specific Buttons */}
              {role === 'employee' && (
                <Button color="inherit" component={Link} to="/jobs">
                  Jobs
                </Button>
              )}

              {/* Logout Button */}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* Public route (Login button if not authenticated) */}
          {!isAuthenticated && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === 'admin' ? (
                <Navigate to="/employees" />
              ) : role === 'employee' ? (
                <Navigate to="/jobs" />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-jobs"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddJobs />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes for Both Roles */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-showcase"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <CompanyShowcase />
            </ProtectedRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

