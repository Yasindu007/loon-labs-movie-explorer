import React, { useContext, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import { MovieContext } from '../context/MovieContext';

// Home page shows the search bar, filter options, and the list of movies
const Home = () => {
  // Only use setMovies and search from context
  const { search, setMovies } = useContext(MovieContext);

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