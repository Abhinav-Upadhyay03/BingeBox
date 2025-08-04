import { create } from 'zustand'

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  nowPlayingMovies: [],
  setNowPlayingMovies: (movies) => set({ nowPlayingMovies: movies }),
  popularMovies: [],
  setPopularMovies: (movies) => set({ popularMovies: movies }),
  topRatedMovies: [],
  setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
  upcomingMovies: [],
  setUpcomingMovies: (movies) => set({ upcomingMovies: movies }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}))