// src/context/MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import movieService from '../services/api';

// Create a context so we can share movie data and actions across the app
export const MovieContext = createContext();

// MovieProvider wraps your app and provides movie-related state and functions
export const MovieProvider = ({ children }) => {
  // State for the list of movies (search/filter results)
  const [movies, setMovies] = useState([]);
  // State for trending movies (default homepage)
  const [trending, setTrending] = useState([]);
  // State for user's favorite movies, loaded from localStorage if available
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  // State for the current search query, loaded from localStorage if available
  const [search, setSearch] = useState(localStorage.getItem('lastSearch') || '');
  // State for dark mode, loaded from localStorage if available
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  // State for the current page of results
  const [page, setPage] = useState(1);
  // State to show loading spinner while fetching data
  const [loading, setLoading] = useState(false);
  // State for the total number of pages available
  const [totalPages, setTotalPages] = useState(0);

  // Filter states
  const [genres, setGenres] = useState([]);           // List of all genres
  const [selectedGenre, setSelectedGenre] = useState(''); // Currently selected genre
  const [yearFilter, setYearFilter] = useState('');       // Currently selected year
  const [ratingFilter, setRatingFilter] = useState(0);    // Currently selected minimum rating
  const [isFiltered, setIsFiltered] = useState(false);    // True if any filter is applied

  // On first load, fetch trending movies and genres
  useEffect(() => {
    fetchTrending();
    movieService.getGenres().then(setGenres);
  }, []);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch trending movies from the API
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

  // Search for movies by query and filters
  const searchMovies = async (query, pageNum = 1, filters = {}) => {
    // Don't search if there's no query and no filters
    if (!query.trim() && !filters.with_genres && !filters.year && !filters['vote_average.gte']) return;
    setLoading(true);
    try {
      const data = await movieService.searchMovies(query, pageNum, filters);
      // If it's the first page, replace movies; otherwise, append more
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

  // Load more movies for the next page (for infinite scroll or "Load More" button)
  const loadMore = () => {
    // Build filters object from current filter state
    const filters = {
      ...(selectedGenre && { with_genres: selectedGenre }),
      ...(yearFilter && { year: yearFilter }),
      ...(ratingFilter > 0 && { 'vote_average.gte': ratingFilter }),
    };
    // Only load more if there are more pages
    if (page < totalPages) {
      if (search && search.trim()) {
        // If searching, load more search results
        searchMovies(search, page + 1, filters);
      } else {
        // If not searching, load more trending/filtered movies
        discoverMore(page + 1, filters);
      }
    }
  };

  // Helper to load more movies using the discover endpoint (for filters/trending)
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

  // Apply filters to the movie list (genre, year, rating)
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
        // If searching, filter search results
        data = await movieService.searchMovies(search, 1, filters);
      } else {
        // If not searching, filter trending/discover results
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

  // Reset all filters and clear the movie list
  const resetFilters = () => {
    setSelectedGenre('');
    setYearFilter('');
    setRatingFilter(0);
    setIsFiltered(false);
    setMovies([]);
    setSearch('');
  };

  // Add a movie to favorites and save to localStorage
  const addFavorite = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Remove a movie from favorites and update localStorage
  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Check if a movie is in the favorites list
  const isFavorite = (id) => favorites.some(movie => movie.id === id);

  // Provide all state and functions to the rest of the app
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