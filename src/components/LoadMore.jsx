import React, { useContext } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

// This component renders a "Load More Movies" button
// It lets users load more movies when there are more pages available
const LoadMore = () => {
  // Get loading state, loadMore function, current page, and total pages from context
  const { loading, loadMore, page, totalPages } = useContext(MovieContext);

  // If we are on the last page, don't show the button
  if (page >= totalPages) return null;

  return (
    // Center the button horizontally with some margin on top and bottom
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      {/* Button to load more movies */}
      <Button
        variant="contained"
        onClick={loadMore} // Calls the loadMore function when clicked
        disabled={loading} // Disable button while loading
        sx={{
          minWidth: 200,
          borderRadius: '20px',
          py: 1
        }}
      >
        {/* Show a loading spinner if loading, otherwise show button text */}
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