import React, { useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useContext(MovieContext);

  // Handle removing from favorites
  const handleRemoveFavorite = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(movieId);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        My Favorite Movies {favorites.length > 0 && `(${favorites.length})`}
      </Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          backgroundColor: 'rgba(0,0,0,0.04)', 
          borderRadius: 2 
        }}>
          <Typography variant="h6" color="text.secondary">
            You don't have any favorite movies yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Find and add movies to your favorites list
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/"
            sx={{ borderRadius: '20px' }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.2)'
                  },
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
                component={Link}
                to={`/movie/${movie.id}`}
                style={{ textDecoration: 'none' }}
              >
                {/* Remove button */}
                <IconButton
                  onClick={(e) => handleRemoveFavorite(e, movie.id)}
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                    },
                    zIndex: 10
                  }}
                >
                  <Heart color="red" size={20} fill="red" />
                </IconButton>

                {/* Movie poster */}
                <CardMedia
                  component="img"
                  sx={{ 
                    height: '200px',
                    objectFit: 'cover',
                  }}
                  image={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/api/placeholder/300/450'}
                  alt={movie.title}
                />
                
                {/* Rating */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '12px',
                    padding: '3px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Star color="gold" size={16} fill="gold" />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </Typography>
                </Box>
                
                {/* Content */}
                <CardContent sx={{ flexGrow: 1, padding: '12px' }}>
                  <Typography variant="subtitle1" component="div" noWrap fontWeight="bold">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.split('-')[0] || 'Unknown year'}
                  </Typography>
                </CardContent>
                
                {/* Hover content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    padding: '12px',
                    transform: 'translateY(100%)',
                    transition: 'transform 0.3s',
                    '.MuiCard-root:hover &': {
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ 
                    color: 'white', 
                    mb: 1,
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '0.8rem' 
                  }}>
                    {movie.overview || 'No description available'}
                  </Typography>
                  <Button 
                    size="small" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      mt: 1, 
                      bgcolor: 'primary.main',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      padding: '4px 12px'
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default FavoritesPage;