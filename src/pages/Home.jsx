import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { movies, trending } = useContext(MovieContext);
  const list = movies.length ? movies : trending;

  return (
    <>
      <SearchBar />
      <MovieFilter />
      {list.length > 0 && <MovieList />}
    </>
  );
};

export default Home;