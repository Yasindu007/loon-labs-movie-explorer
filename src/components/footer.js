import React from 'react';
import { Box, Typography, Link } from '@mui/material';

// Footer component for the Movie Explorer app
const Footer = () => {
  return (
    // Box is a layout component from MUI, used here as the footer container
    <Box
      component="footer"
      sx={{
        mt: 'auto', // Pushes the footer to the bottom if using flex layout
        py: 3,      // Padding on the y-axis (top and bottom)
        px: 2,      // Padding on the x-axis (left and right)
        // Set background color based on light or dark mode
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800]
      }}
    >
      {/* Typography is used for styled text */}
      <Typography variant="body2" color="text.secondary" align="center">
        {/* Display the current year and app name */}
        © {new Date().getFullYear()} Movie Explorer
        {' | '}
        {/* External link to TMDb for attribution */}
        <Link
          color="inherit"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener"
        >
          Powered by TMDb
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;