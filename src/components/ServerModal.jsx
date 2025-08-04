import React from 'react'
import useMovieServers from '../hooks/useMovieServers'

const ServerModal = ({ movie, isOpen, onClose, onServerSelect }) => {
  const { servers, isLoading, error, refetch } = useMovieServers(movie?.id)

  const handleServerSelect = (server) => {
    if (server.site === 'YouTube') {
      // Open YouTube trailer in new tab
      window.open(`https://www.youtube.com/watch?v=${server.key}`, '_blank')
    } else {
      // For other servers, you can implement custom streaming logic
      onServerSelect(server)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[80vh] overflow-scroll scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h3 className="text-white text-lg font-semibold">
            Available Servers
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-circle-line text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : servers.length > 0 ? (
            <div className="space-y-2">
              <p className="text-gray-300 text-sm mb-4">
                Select a server to play "{movie.title}"
              </p>
              {servers.map((server, index) => (
                <button
                  key={server.key}
                  onClick={() => handleServerSelect(server)}
                  className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <i className="ri-play-fill text-white"></i>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Server {index + 1}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {server.site} • {server.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-green-400 text-xs">
                    HD
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <p className="text-gray-400 text-sm">
                No servers available for this movie
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Try checking back later or browse other movies
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServerModal 