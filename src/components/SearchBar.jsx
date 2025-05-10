import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Search } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const { searchMovies } = useContext(MovieContext);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '20px' }}>
      <TextField 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        label="Search Movies" 
        fullWidth 
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 1 }}
        startIcon={<Search size={18} />}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;