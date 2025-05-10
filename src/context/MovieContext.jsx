// src/context/MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import movieService from '../services/api';

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [search, setSearch] = useState(() => localStorage.getItem('lastSearch') || '');
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filter states
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  // Load trending movies and genres when component mounts
  useEffect(() => {
    fetchTrending();
    fetchGenres();
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchGenres = async () => {
    try {
      const genreData = await movieService.getGenres();
      setGenres(genreData);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const data = await movieService.getTrending();
      setTrending(data);
    } catch (error) {
      console.error('Error in fetchTrending:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const data = await movieService.searchMovies(query, page);
      
      setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
      setTotalPages(data.total_pages);
      setSearch(query);
      setIsFiltered(false);
      
      // Save search query to localStorage
      localStorage.setItem('lastSearch', query);
      setPage(page);
    } catch (error) {
      console.error('Error in searchMovies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = async (page = 1) => {
    try {
      setLoading(true);

      const filters = {
        genreId: selectedGenre,
        year: yearFilter,
        minRating: ratingFilter || 0,
      };

      const data = await movieService.discoverMovies(filters, page);

      setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
      setTotalPages(data.total_pages);
      setIsFiltered(true);
      setPage(page);
    } catch (error) {
      console.error('Error filtering movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedGenre('');
    setYearFilter('');
    setRatingFilter(0);

    // If there's a previous search, re-run it
    if (search) {
      searchMovies(search, 1);
    } else {
      // Otherwise, go back to trending
      setMovies([]);
      setIsFiltered(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      if (isFiltered) {
        filterMovies(nextPage);
      } else if (search) {
        searchMovies(search, nextPage);
      }
    }
  };

  const addFavorite = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => {
    return favorites.some(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        movies,
        setMovies,
        trending,
        setTrending,
        loading,
        setLoading,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        darkMode,
        setDarkMode,
        page,
        totalPages,
        loadMore,
        // Filter related
        genres,
        selectedGenre,
        setSelectedGenre,
        yearFilter,
        setYearFilter,
        ratingFilter,
        setRatingFilter,
        filterMovies,
        resetFilters,
        isFiltered
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};