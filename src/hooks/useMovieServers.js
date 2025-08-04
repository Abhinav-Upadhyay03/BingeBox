import { useState, useEffect } from 'react'
import { getMovieVideos } from '../services/browse.service'

const useMovieServers = (movieId) => {
  const [servers, setServers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchServers = async () => {
    if (!movieId) return

    setIsLoading(true)
    setError(null)
    
    try {
      const videoData = await getMovieVideos(movieId)
      const availableServers = videoData.results || []
      
      // Filter for available video sources (trailers, clips, etc.)
      const validServers = availableServers.filter(video => 
        video.site === 'YouTube' && video.type === 'Trailer'
      )
      
      setServers(validServers)
    } catch (error) {
      console.error('Error fetching servers:', error)
      setError('Failed to load available servers')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (movieId) {
      fetchServers()
    }
  }, [movieId])

  return {
    servers,
    isLoading,
    error,
    refetch: fetchServers
  }
}

export default useMovieServers 