import React, { useState } from 'react'
import ServerModal from './ServerModal'

const MovieCard = ({ movie, variant = 'grid' }) => {
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handlePlayClick = (e) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleServerSelect = (server) => {
    console.log('Selected server:', server)
  }

  // Grid variant (for MoviesList)
  if (variant === 'grid') {
    return (
      <>
        <div 
          className="group cursor-pointer transition-transform duration-200 hover:scale-102"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        >
          <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-gray-800">
            {!imageError && movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  <p className="text-xs">{movie.title}</p>
                </div>
              </div>
            )}
            
            <div className={`absolute inset-0 transition-all duration-200 flex items-center justify-center ${
              isHovered ? 'bg-black/50' : 'bg-black/0 group-hover:bg-black/50'
            }`}>
              <div className={`transition-opacity duration-200 text-white text-center p-2 ${
                isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <h3 className="font-semibold text-sm line-clamp-2 mb-3">{movie.title}</h3>
                <p className="text-xs text-gray-300 mb-3">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • {movie.vote_average?.toFixed(1) || 'N/A'} ⭐
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handlePlayClick}
                    className="bg-white text-black px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <i className="ri-play-fill"></i>
                    Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServerModal
          movie={movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onServerSelect={handleServerSelect}
        />
      </>
    )
  }

  // Row variant (for MovieRow)
  return (
    <>
      <div 
        className="relative flex-shrink-0 transition-all duration-300 hover:scale-102 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
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
                <button 
                  onClick={handlePlayClick}
                  className="bg-white text-black px-3 py-1 rounded text-xs font-medium hover:bg-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <i className="ri-play-fill"></i>
                  Play
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ServerModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onServerSelect={handleServerSelect}
      />
    </>
  )
}

export default MovieCard