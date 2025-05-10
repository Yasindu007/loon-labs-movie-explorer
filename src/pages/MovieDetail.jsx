import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';
import {
  Box,
  Typography,
  Chip,
  Button,
  Grid,
} from '@mui/material';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getMovieDetails(id);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleAddFavorite = () => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!existing.find((m) => m.id === movie.id)) {
      localStorage.setItem('favorites', JSON.stringify([...existing, movie]));
      alert('Added to favorites!');
    } else {
      alert('Already in favorites.');
    }
  };

  if (!movie) return <Typography>Loading...</Typography>;

  const trailer = movie.videos?.results.find((v) => v.type === 'Trailer');

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <Typography gutterBottom>{movie.overview}</Typography>
      <Box sx={{ my: 2 }}>
        {movie.genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1 }} />
        ))}
      </Box>
      <Button variant="contained" onClick={handleAddFavorite}>
        Add to Favorites
      </Button>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Cast
      </Typography>
      <Grid container spacing={1}>
        {movie.credits?.cast.slice(0, 5).map((actor) => (
          <Grid item key={actor.id}>
            <Typography>{actor.name}</Typography>
          </Grid>
        ))}
      </Grid>

      {trailer && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Trailer</Typography>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      )}
    </Box>
  );
};

export default MovieDetail;
