// src/services/api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance with base configuration
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// API service with methods for different endpoints
const movieService = {
  // Get trending movies of the week
  getTrending: async () => {
    try {
      const response = await tmdbAPI.get('/trending/movie/week');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Search movies by query
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbAPI.get('/search/movie', {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbAPI.get(`/movie/${movieId}`, {
        params: { append_to_response: 'videos,credits' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },
  
  // Get movie genres list
  getGenres: async () => {
    try {
      const response = await tmdbAPI.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }
};

export default movieService;