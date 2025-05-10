import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        My Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite movies saved yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
