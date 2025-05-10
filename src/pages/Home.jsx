import React, { useContext, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import { MovieContext } from '../context/MovieContext';

// Home page shows the search bar, filter options, and the list of movies
const Home = () => {
  // Get movie data and functions from context
  const { 
    trending, 
    movies, 
    favorites, 
    addFavorite, 
    removeFavorite,
    search,
    setSearch,
    setMovies
  } = useContext(MovieContext);

  // When the search box is cleared, reset the movies list
  useEffect(() => {
    if (!search) {
      setMovies([]);
    }
  }, [search, setMovies]);

  return (
    <>
      {/* Search bar at the top */}
      <SearchBar />
      {/* Filter options for genre, year, rating */}
      <MovieFilter />
      {/* List of movies (trending, search, or filtered) */}
      <MovieList />
    </>
  );
};

export default Home;