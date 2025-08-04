import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import useMovieCategories from '../hooks/useMovieCategories'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import MovieRow from '../components/MovieRow'
import Footer from '../components/Footer'
import { useStore } from '../store/store'

const Browse = () => {
  useNowPlayingMovies();
  useMovieCategories();
  
  const { 
    nowPlayingMovies, 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies 
  } = useStore();

  return (
    <div className="bg-black">
      <div className="relative">
        <Header />
        <HeroSection />
      </div>
      
      {/* Movie Categories */}
      <div className="relative z-10 bg-black">
        <MovieRow 
          title="Now Playing" 
          movies={nowPlayingMovies.slice(1, 11)} 
          category="now-playing" 
        />
        <MovieRow 
          title="Popular" 
          movies={popularMovies} 
          category="popular" 
        />
        <MovieRow 
          title="Top Rated" 
          movies={topRatedMovies} 
          category="top-rated" 
        />
        <MovieRow 
          title="Upcoming" 
          movies={upcomingMovies} 
          category="upcoming" 
        />
      </div>
      
      <Footer />
    </div>
  )
}

export default Browse 