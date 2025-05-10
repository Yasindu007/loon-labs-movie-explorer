import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';

// NotFound component shows a 404 error page when a route doesn't exist
const NotFound = () => {
  return (
    // Box centers everything vertically and horizontally
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center',    // Center items horizontally
        justifyContent: 'center',// Center items vertically
        textAlign: 'center',     // Center text
        py: 8,                   // Padding on top and bottom
      }}
    >
      {/* Big movie icon for visual effect */}
      <MovieIcon sx={{ fontSize: 80, mb: 2, opacity: 0.7 }} />
      {/* Main 404 title */}
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      {/* Description text */}
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      {/* Button to go back to the home page */}
      <Button 
        variant="contained" 
        component={Link} 
        to="/"
        startIcon={<MovieIcon />}
      >
        Return to Home
      </Button>
    </Box>
  );
};

export default NotFound;