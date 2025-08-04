import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'

const MovieRow = ({ title, movies, category }) => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleSeeMore = () => {
    navigate(`/movieslist?category=${category}`)
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
            <MovieCard key={movie.id} movie={movie} variant="row" />
          ))}
        </div>
        
        {/* Gradient fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        
        {/* Right arrow indicator */}
        {showRightArrow && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
              <i className="ri-arrow-right-line text-white"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieRow 