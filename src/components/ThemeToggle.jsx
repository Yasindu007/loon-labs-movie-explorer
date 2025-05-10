// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(MovieContext);

  return (
    <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        sx={{
          backgroundColor: theme => 
            darkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          width: 40,
          height: 40,
          '&:hover': {
            backgroundColor: theme => 
              darkMode 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.1)',
          },
          mr: 1,
        }}
      >
        {darkMode ? (
          <Sun 
            size={20} 
            style={{ 
              color: '#fff',
              strokeWidth: 2
            }} 
          />
        ) : (
          <Moon 
            size={20} 
            style={{ 
              color: '#1976d2',
              strokeWidth: 2
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;