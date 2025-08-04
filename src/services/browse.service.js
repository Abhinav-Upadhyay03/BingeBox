import { options } from "../constants/options";

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?page=1`, options
  );
  const data = await response.json();
  return data;
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=1`, options
  );
  const data = await response.json();
  return data;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=1`, options
  );
  const data = await response.json();
  return data;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?page=1`, options
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