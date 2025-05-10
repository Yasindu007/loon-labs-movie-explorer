import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Typography, 
  CircularProgress, 
  Box, 
  Grid, 
  Paper, 
  Chip,
  Button,
  IconButton
} from '@mui/material';
import { 
  Star, 
  Heart, 
  Clock, 
  Calendar, 
  Globe, 
  DollarSign
} from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Check if movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === Number(movieId));
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorite(id)) {
      removeFavorite(Number(id));
    } else if (movie) {
      addFavorite(movie);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!movie) return null;

  // Find trailer
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer') || null;
  
  // Get director
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  
  // Get top cast (limit to 6)
  const topCast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              height: '100%',
              position: 'relative'
            }}
          >
            <Box 
              component="img"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/api/placeholder/300/450'}
              alt={movie.title}
              sx={{ 
                width: '100%', 
                height: 'auto',
                display: 'block'
              }}
            />
            
            {/* Favorite button overlay */}
            <IconButton
              onClick={handleFavoriteToggle}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              }}
            >
              <Heart 
                color={isFavorite(id) ? "red" : "white"} 
                size={20} 
                fill={isFavorite(id) ? "red" : "none"} 
              />
            </IconButton>
          </Paper>
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mr: 2 }}>
              {movie.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Star color="gold" size={24} fill="gold" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </Typography>
            </Box>
          </Box>

          {/* Release and runtime info */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Calendar size={16} />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {movie.release_date?.split('-')[0] || 'Unknown'}
              </Typography>
            </Box>
            
            {movie.runtime && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={16} />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Typography>
              </Box>
            )}
            
            {movie.spoken_languages?.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Globe size={16} />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {movie.spoken_languages[0].english_name}
                </Typography>
              </Box>
            )}
            
            {movie.budget > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DollarSign size={16} />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 0 
                  }).format(movie.budget)}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Genres */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movie.genres?.map(genre => (
              <Chip 
                key={genre.id} 
                label={genre.name} 
                size="small" 
                sx={{ 
                  borderRadius: '16px',
                  fontWeight: 500
                }}
              />
            ))}
          </Box>

          {/* Overview */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Overview</Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || 'No overview available.'}
          </Typography>

          {/* Director info */}
          {director && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1">
                <strong>Director:</strong> {director.name}
              </Typography>
            </Box>
          )}

          {/* Cast section */}
          {topCast.length > 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>Top Cast</Typography>
              <Grid container spacing={2}>
                {topCast.map(person => (
                  <Grid item xs={6} sm={4} md={2} key={person.id}>
                    <Paper 
                      elevation={1}
                      sx={{ 
                        borderRadius: 2, 
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box 
                        component="img" 
                        src={person.profile_path 
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : '/api/placeholder/200/300'
                        }
                        alt={person.name}
                        sx={{ width: '100%', height: 'auto' }}
                      />
                      <Box sx={{ p: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }} noWrap>
                          {person.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {person.character}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      {/* Trailer section */}
      {trailer && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Trailer</Typography>
          <Paper 
            elevation={3}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              paddingTop: '56.25%', // 16:9 aspect ratio
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default MoviePage;