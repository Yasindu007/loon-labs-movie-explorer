import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export const getTrendingMovies = (page = 1) => {
  return axios.get(`${baseUrl}/trending/movie/week`, {
    params: { api_key: apiKey, page },
  });
};

export const searchMovies = (query, page = 1) => {
  return axios.get(`${baseUrl}/search/movie`, {
    params: { api_key: apiKey, query, page },
  });
};

export const getMovieDetails = (id) => {
  return axios.get(`${baseUrl}/movie/${id}`, {
    params: { api_key: apiKey, append_to_response: 'videos,credits' },
  });
};
