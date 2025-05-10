// src/context/MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import movieService from '../services/api';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [search, setSearch] = useState(localStorage.getItem('lastSearch') || '');
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    fetchTrending();
    movieService.getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const data = await movieService.getTrending();
      setTrending(data);
    } catch {
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, pageNum = 1, filters = {}) => {
    if (!query.trim() && !filters.with_genres && !filters.year && !filters['vote_average.gte']) return;
    setLoading(true);
    try {
      const data = await movieService.searchMovies(query, pageNum, filters);
      setMovies(prev => (pageNum === 1 ? data.results : [...prev, ...data.results]));
      setTotalPages(data.total_pages);
      setSearch(query);
      localStorage.setItem('lastSearch', query);
      setPage(pageNum);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const filters = {
      ...(selectedGenre && { with_genres: selectedGenre }),
      ...(yearFilter && { year: yearFilter }),
      ...(ratingFilter > 0 && { 'vote_average.gte': ratingFilter }),
    };
    if (page < totalPages) {
      if (search && search.trim()) {
        searchMovies(search, page + 1, filters);
      } else {
        discoverMore(page + 1, filters);
      }
    }
  };

  const discoverMore = async (nextPage, filters) => {
    setLoading(true);
    try {
      const data = await movieService.discoverMovies(nextPage, filters);
      setMovies(prev => [...prev, ...data.results]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = async () => {
    setIsFiltered(true);
    setLoading(true);
    const filters = {
      ...(selectedGenre && { with_genres: selectedGenre }),
      ...(yearFilter && { year: yearFilter }),
      ...(ratingFilter > 0 && { 'vote_average.gte': ratingFilter }),
    };
    try {
      let data;
      if (search && search.trim()) {
        data = await movieService.searchMovies(search, 1, filters);
      } else {
        data = await movieService.discoverMovies(1, filters);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setPage(1);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedGenre('');
    setYearFilter('');
    setRatingFilter(0);
    setIsFiltered(false);
    setMovies([]);
    setSearch('');
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

  const isFavorite = (id) => favorites.some(movie => movie.id === id);

  return (
    <MovieContext.Provider
      value={{
        trending,
        movies,
        setMovies,
        searchMovies,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        search,
        setSearch,
        darkMode,
        setDarkMode,
        page,
        totalPages,
        loading,
        loadMore,
        genres,
        selectedGenre, setSelectedGenre,
        yearFilter, setYearFilter,
        ratingFilter, setRatingFilter,
        filterMovies,
        resetFilters,
        isFiltered,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};