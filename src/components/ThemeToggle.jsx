// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { 
  IconButton, 
  Tooltip,
  useTheme
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { MovieContext } from '../context/MovieContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(MovieContext);
  const theme = useTheme();
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton 
        color="inherit" 
        onClick={toggleDarkMode}
        aria-label="toggle theme"
        sx={{ 
          ml: 1,
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;