import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { searchMovies, getTrendingMovies } from '../api/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieFilter from '../components/MovieFilter';
import { MovieContext } from '../context/MovieContext';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isTrending, setIsTrending] = useState(true);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const { lastSearch, setLastSearch } = useContext(MovieContext);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await getTrendingMovies(page);
      setMovies((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  const handleSearch = async (query) => {
    setLastSearch(query);
    setIsTrending(false);
    try {
      const res = await searchMovies(query, 1);
      setMovies(res.data.results);
    } catch (err) {
      console.error('Error searching movies:', err);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    isTrending ? fetchTrending() : handleSearch(lastSearch);
  };

  const handleFilter = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filteredMovies = movies.filter((movie) => {
    const genreMatch = filters.genre ? movie.genre_ids.includes(parseInt(filters.genre)) : true;
    const yearMatch = filters.year ? movie.release_date?.startsWith(filters.year) : true;
    const ratingMatch = filters.rating ? movie.vote_average >= parseFloat(filters.rating) : true;
    return genreMatch && yearMatch && ratingMatch;
  });

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />
      <MovieFilter onFilter={handleFilter} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        {isTrending ? 'Trending Movies' : 'Search Results'}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleLoadMore}>
        Load More
      </Button>
    </Box>
  );
};

export default MovieList;
