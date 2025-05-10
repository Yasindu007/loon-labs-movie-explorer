import React, { useContext } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const LoadMore = () => {
  const { loading, loadMore, page, totalPages } = useContext(MovieContext);

  if (page >= totalPages) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Button
        variant="contained"
        onClick={loadMore}
        disabled={loading}
        sx={{
          minWidth: 200,
          borderRadius: '20px',
          py: 1
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Load More Movies'
        )}
      </Button>
    </Box>
  );
};

export default LoadMore;