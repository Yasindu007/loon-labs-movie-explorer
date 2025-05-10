import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { MovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(MovieContext);
  
  // Handle favorite toggle
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
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
      {/* Favorite button */}
      <IconButton
        onClick={handleFavoriteToggle}
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
        <Heart 
          color={isFavorite(movie.id) ? "red" : "white"} 
          size={20} 
          fill={isFavorite(movie.id) ? "red" : "none"} 
        />
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
      </Box>
    </Card>
  );
};

export default MovieCard;