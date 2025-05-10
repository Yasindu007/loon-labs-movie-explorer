import React, { useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const genres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  // Add more TMDb genre IDs if needed
];

const MovieFilter = ({ onFilter }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const handleFilterChange = () => {
    onFilter({ genre, year, rating });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        select
        label="Genre"
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value);
          handleFilterChange();
        }}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        {genres.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Year"
        type="number"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          handleFilterChange();
        }}
        sx={{ minWidth: 100 }}
      />

      <TextField
        label="Min Rating"
        type="number"
        value={rating}
        onChange={(e) => {
          setRating(e.target.value);
          handleFilterChange();
        }}
        sx={{ minWidth: 120 }}
        inputProps={{ step: 0.1, min: 0, max: 10 }}
      />
    </Box>
  );
};

export default MovieFilter;
