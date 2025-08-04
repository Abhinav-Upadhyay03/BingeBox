import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MovieRow = ({ title, movies, category }) => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleSeeMore = () => {
    navigate(`/${category}`)
  }

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      setShowRightArrow(!isAtEnd)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition)
      // Check initial position
      checkScrollPosition()
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition)
      }
    }
  }, [movies])

  return (
    <div className="px-4 md:px-12 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <button 
          onClick={handleSeeMore}
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          See More
        </button>
      </div>
      
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4"
        >
          {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* Gradient fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        
        {/* Right arrow indicator */}
        {showRightArrow && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative flex-shrink-0 transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-48 md:w-56">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 md:h-80 object-cover rounded-md"
        />
        
        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/80 rounded-md flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <span>{movie.vote_average?.toFixed(1)} ⭐</span>
              <span>•</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="bg-white text-black px-3 py-1 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
                Play
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700 transition-colors">
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieRow 