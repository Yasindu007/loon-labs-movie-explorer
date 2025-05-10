import React, { useContext } from 'react';
import { Grid, Box, Button, Typography, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';

// MovieList displays a grid of movies (trending, search, or filtered)
const MovieList = () => {
  // Get movie data and state from context
  const { 
    movies,        // Array of movies from search or filters
    trending,      // Array of trending movies (default)
    loading,       // Boolean: true if loading data
    loadMore,      // Function to load more movies
    page,          // Current page number
    totalPages,    // Total number of pages available
    search,        // Current search query (if any)
    isFiltered     // Boolean: true if filters are applied
  } = useContext(MovieContext);

  // Decide which list to show: search/filtered movies or trending
  const list = movies.length ? movies : trending;

  // Get the title for the movie list section
  const getListTitle = () => {
    if (search) {
      return `Search Results for "${search}"`;
    } else if (isFiltered) {
      return 'Filtered Movies';
    } else {
      return 'Trending Movies';
    }
  };

  return (
    <>
      {/* Section title with count */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        {getListTitle()} {list.length > 0 && `(${list.length})`}
      </Typography>

      {/* Show a message if there are no movies and not loading */}
      {list.length === 0 && !loading ? (
        <Box sx={{ textAlign: 'center', py: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            No movies found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <>
          {/* Grid of movie cards */}
          <Grid container spacing={2}>
            {list.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {/* Load More Button: appears if there are more pages */}
          {list.length > 0 && page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                onClick={loadMore}
                disabled={loading}
                sx={{ minWidth: '200px', borderRadius: '20px', boxShadow: 2 }}
              >
                {/* Show spinner while loading, otherwise show button text */}
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Load More Movies'
                )}
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default MovieList;