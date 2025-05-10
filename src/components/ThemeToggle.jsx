// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

// ThemeToggle lets the user switch between dark mode and light mode
const ThemeToggle = () => {
  // Get dark mode state and the function to change it from context
  const { darkMode, setDarkMode } = useContext(MovieContext);

  return (
    // Tooltip shows a label when you hover over the button
    <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
      {/* IconButton is a clickable button with an icon */}
      <IconButton
        onClick={() => setDarkMode(!darkMode)} // Toggle dark mode on click
        sx={{
          backgroundColor: theme => 
            darkMode 
              ? 'rgba(255, 255, 255, 0.1)' // Light background in dark mode
              : 'rgba(0, 0, 0, 0.05)',     // Dark background in light mode
          borderRadius: '8px',              // Rounded corners
          width: 40,                        // Button width
          height: 40,                       // Button height
          '&:hover': {
            backgroundColor: theme => 
              darkMode 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.1)',
          },
          mr: 1, // Margin right for spacing
        }}
      >
        {/* Show a sun icon if dark mode is on, otherwise show a moon icon */}
        {darkMode ? (
          <Sun 
            size={20} 
            style={{ 
              color: '#fff',      // White sun icon in dark mode
              strokeWidth: 2
            }} 
          />
        ) : (
          <Moon 
            size={20} 
            style={{ 
              color: '#1976d2',  // Blue moon icon in light mode
              strokeWidth: 2
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;