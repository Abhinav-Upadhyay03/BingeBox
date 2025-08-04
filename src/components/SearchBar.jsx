import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { nowPlayingMovies } = useStore()
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = nowPlayingMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, nowPlayingMovies])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim()) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-300 transition-colors p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Input */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-red-500 focus:outline-none"
                autoFocus
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{movie.title}</h4>
                      <p className="text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()} • {movie.vote_average?.toFixed(1)} ⭐
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-4 text-gray-400 text-center py-4">
                No movies found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar 