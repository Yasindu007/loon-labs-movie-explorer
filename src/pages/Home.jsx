import React, { useContext, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
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

  useEffect(() => {
    if (!search) {
      setMovies([]);
    }
  }, [search, setMovies]);

  return (
    <>
      <SearchBar />
      <MovieFilter />
      <MovieList />
    </>
  );
};

export default Home;