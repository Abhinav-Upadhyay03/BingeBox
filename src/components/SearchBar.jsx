import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMovies } from '../services/browse.service'
import ServerModal from './ServerModal'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchMoviesFromAPI = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchMovies(searchQuery)
        setSearchResults(data.results || [])
      } catch (error) {
        console.error('Error searching movies:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchMoviesFromAPI, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim()) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/movieslist?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
      setSearchQuery('')
    }
  }

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
    setShowResults(false)
    setSearchQuery('')
  }

  const handleServerSelect = (server) => {
    console.log('Selected server:', server)
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowResults(true)}
          className="w-32 sm:w-48 md:w-64 bg-black/20 backdrop-blur-sm text-white placeholder-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 rounded-full border border-white/30 focus:border-white/50 focus:outline-none transition-all duration-200 text-xs sm:text-sm"
        />
        <i className="ri-search-line absolute left-2.5 md:top-1/2 top-[7px]  transform -translate-y-1/2 w-2 h-2 md:w-6 md:h-6 text-gray-300"></i>
      </div>

      {/* Search Results */}
      {showResults && (searchResults.length > 0 || isLoading) && (
        <div className="absolute right-0 top-10 sm:top-12 w-64 sm:w-72 md:w-80 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 sm:max-h-96 overflow-y-auto scrollbar-hide">
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              searchResults.map((movie) => (
                <SearchResultItem key={movie.id} movie={movie} onClick={handleMovieSelect} />
              ))
            )}
          </div>
        </div>
      )}

      {showResults && searchQuery && !isLoading && searchResults.length === 0 && (
        <div className="absolute right-0 top-10 sm:top-12 w-64 sm:w-72 md:w-80 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-3 sm:p-4 text-gray-400 text-center text-xs sm:text-sm">
            No movies found
          </div>
        </div>
      )}

      {/* Server Modal */}
      {selectedMovie && (
        <ServerModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedMovie(null)
          }}
          onServerSelect={handleServerSelect}
        />
      )}
    </div>
  )
}

const SearchResultItem = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      onClick={() => onClick(movie)}
      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
    >
      <div className="w-10 h-14 sm:w-12 sm:h-18 bg-gray-800 rounded overflow-hidden flex-shrink-0">
        {!imageError && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-xs sm:text-sm line-clamp-1">{movie.title}</h4>
        <p className="text-gray-400 text-xs">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • {movie.vote_average?.toFixed(1) || 'N/A'} ⭐
        </p>
      </div>
    </div>
  )
}

export default SearchBar 