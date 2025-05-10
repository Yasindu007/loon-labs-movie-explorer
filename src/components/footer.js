import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      mt: 'auto', 
      py: 3, 
      px: 2, 
      backgroundColor: (theme) => theme.palette.mode === 'light' 
        ? theme.palette.grey[200] 
        : theme.palette.grey[800] 
    }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Movie Explorer
        {' | '}
        <Link color="inherit" href="https://www.themoviedb.org/" target="_blank" rel="noopener">
          Powered by TMDb
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;