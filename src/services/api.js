// This file contains all the functions to talk to the TMDb (The Movie Database) API

import axios from 'axios';

// Your TMDb API key from environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// The base URL for all TMDb API requests
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an axios instance with the base URL and API key included in every request
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// This object contains all the functions you can use to get movie data
const movieService = {
  // Get trending movies of the week from TMDb
  getTrending: async () => {
    try {
      // Make a GET request to /trending/movie/week
      const response = await tmdbAPI.get('/trending/movie/week');
      // Return just the array of movies
      return response.data.results;
    } catch (error) {
      // If something goes wrong, log it and throw the error
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Search movies by a text query (like "batman")
  searchMovies: async (query, page = 1, filters = {}) => {
    try {
      // Build the query parameters for the API call
      const params = {
        query,      // The search text
        page,       // Which page of results
        ...filters, // Any extra filters (genre, year, etc.)
      };
      // Make a GET request to /search/movie with the params
      const response = await tmdbAPI.get('/search/movie', { params });
      // Return the full response data (includes results and pagination info)
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get detailed info about a single movie by its ID
  getMovieDetails: async (movieId) => {
    try {
      // Make a GET request to /movie/{id} and also get videos and credits
      const response = await tmdbAPI.get(`/movie/${movieId}`, {
        params: { append_to_response: 'videos,credits' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },
  
  // Get the list of all movie genres (like Action, Comedy, etc.)
  getGenres: async () => {
    try {
      const response = await tmdbAPI.get('/genre/movie/list');
      // Return just the genres array
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // Discover movies using filters (genre, year, rating, etc.)
  discoverMovies: async (page = 1, filters = {}) => {
    try {
      const params = {
        page,      // Which page of results
        ...filters // Any filters to apply
      };
      // Make a GET request to /discover/movie with the params
      const response = await tmdbAPI.get('/discover/movie', { params });
      return response.data;
    } catch (error) {
      console.error('Error discovering movies:', error);
      throw error;
    }
  },
};

// Export the movieService object so you can use these functions elsewhere
export default movieService;