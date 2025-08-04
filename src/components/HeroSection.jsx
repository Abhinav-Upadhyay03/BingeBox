import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store'
import { getMovieVideos } from '../services/browse.service'

const HeroSection = () => {
  const { nowPlayingMovies } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)
  
  const featuredMovie = nowPlayingMovies[0]
  
  useEffect(() => {
    const fetchVideo = async () => {
      if (featuredMovie) {
        try {
          setIsLoading(true)
          const videoData = await getMovieVideos(featuredMovie.id)
          
          const trailer = videoData.results?.find(video => 
            video.type === 'Trailer' && video.site === 'YouTube'
          )
          
          if (trailer) {
            const embedUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailer.key}&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&enablejsapi=1&origin=${window.location.origin}&color=white&playsinline=1&start=0&end=0&vq=hd1080`
            setVideoUrl(embedUrl)
          } else {
            setVideoUrl(null)
          }
        } catch (error) {
          console.error('Error fetching video:', error)
          setVideoUrl(null)
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    fetchVideo()
  }, [featuredMovie])
  
  const toggleMute = () => {
    if (videoRef.current) {
      const iframe = videoRef.current
      const iframeWindow = iframe.contentWindow
      
      if (isMuted) {
        // Unmute
        iframeWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
      } else {
        // Mute
        iframeWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
      setIsMuted(!isMuted)
    }
  }
  
  if (!featuredMovie || isLoading) {
    return (
      <div className="relative h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative md:h-[80vh] h-[60vh] overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Video or Image */}
      {videoUrl ? (
        <div className="absolute inset-0">
          <iframe
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      )}

      {/* Mute/Unmute Button */}
      {videoUrl && (
        <div className="absolute top-16 md:left-10 left-2 z-20">
          <button
            onClick={toggleMute}
            className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="px-4 md:px-12 pb-16 md:pb-24 w-full">
          {/* Movie Info - appears on hover */}
          <div className={`transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
              {featuredMovie.title}
            </h1>
            <p className="text-white/80 text-sm md:text-lg mb-6 max-w-lg line-clamp-3">
              {featuredMovie.overview}
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </button>
              <button className="bg-gray-600/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600/90 transition-colors">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 