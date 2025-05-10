import React, { useState, useContext, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box, 
  Button,
  Typography
} from '@mui/material';
import { Search, X } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

// SearchBar component lets users search for movies by typing a query
const SearchBar = () => {
  // Get the current search value and search functions from context
  const { search, setSearch, searchMovies } = useContext(MovieContext);
  // Local state for the input box value
  const [query, setQuery] = useState(search || '');

  // Keep the input box in sync with the global search state
  useEffect(() => {
    setQuery(search || '');
  }, [search]);

  // When the form is submitted (user presses Enter or clicks Search)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    if (query.trim()) {
      searchMovies(query); // Call the search function with the query
    }
  };

  // When the clear (X) button is clicked, reset the input and search state
  const handleClear = () => {
    setQuery('');
    setSearch('');
  };

  return (
    // Outer Box adds margin below the search bar
    <Box sx={{ mb: 4 }}>
      {/* Title above the search bar */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Discover Movies
      </Typography>
      
      {/* Paper gives the search bar a card-like background */}
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          mb: 2
        }}
      >
        {/* The form wraps the input and button so Enter works */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
            {/* TextField is the search input box */}
            <TextField
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 0,
                  '& fieldset': { border: 'none' }
                },
                '& .MuiOutlinedInput-input': {
                  py: 2 // Makes the input taller
                }
              }}
              InputProps={{
                // Search icon at the start of the input
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
                // X (clear) icon at the end, only if there's text
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end" size="small">
                      <X size={16} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {/* Search button to submit the form */}
            <Button 
              type="submit"
              variant="contained"
              disableElevation
              sx={{ 
                borderRadius: 0,
                px: 4,
                whiteSpace: 'nowrap'
              }}
            >
              Search
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SearchBar;