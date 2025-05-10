import React, { useContext } from 'react';
import { Grid, Box, Button, Typography, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';

const MovieList = () => {
  const { 
    movies, 
    trending, 
    loading, 
    loadMore, 
    page, 
    totalPages, 
    search, 
    isFiltered 
  } = useContext(MovieContext);

  const list = movies.length ? movies : trending;

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
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        {getListTitle()} {list.length > 0 && `(${list.length})`}
      </Typography>

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
          <Grid container spacing={2}>
            {list.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {/* Load More Button */}
          {list.length > 0 && page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                onClick={loadMore}
                disabled={loading}
                sx={{ minWidth: '200px', borderRadius: '20px', boxShadow: 2 }}
              >
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