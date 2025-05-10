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

const SearchBar = () => {
  const { search, setSearch, searchMovies } = useContext(MovieContext);
  const [query, setQuery] = useState(search || '');

  useEffect(() => {
    setQuery(search || '');
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSearch('');
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Discover Movies
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          mb: 2
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
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
                  py: 2
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end" size="small">
                      <X size={16} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
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