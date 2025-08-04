import { options } from "../constants/options";

export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?page=${page}`, options
  );
  const data = await response.json();
  return data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=${page}`, options
  );
  const data = await response.json();
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`, options
  );
  const data = await response.json();
  return data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?page=${page}`, options
  );
  const data = await response.json();
  return data;
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`, options
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) return { results: [] };
  
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`, 
    options
  );
  const data = await response.json();
  return data;
};