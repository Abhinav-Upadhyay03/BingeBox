import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import { searchMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies } from '../services/browse.service'

const MoviesList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const { setSearchResults } = useStore()

  // Helper function to filter movies with posters
  const filterMoviesWithPosters = (movies) => {
    return movies.filter(movie => movie.poster_path)
  }

  // Helper function to fetch movies until we have enough with posters
  const fetchMoviesWithPosters = async (fetchFunction, page, targetCount = 20) => {
    let allMovies = []
    let currentPage = page
    let totalPagesCount = 1
    
    while (allMovies.length < targetCount && currentPage <= 500) { // Safety limit
      try {
        const data = await fetchFunction(currentPage)
        const filteredMovies = filterMoviesWithPosters(data.results || [])
        allMovies = [...allMovies, ...filteredMovies]
        totalPagesCount = data.total_pages || 1
        
        if (data.results?.length === 0 || currentPage >= totalPagesCount) {
          break
        }
        currentPage++
      } catch (error) {
        console.error('Error fetching movies:', error)
        break
      }
    }
    
    return {
      movies: allMovies.slice(0, targetCount),
      totalPages: totalPagesCount,
      lastFetchedPage: currentPage - 1
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      const category = searchParams.get('category')
      const search = searchParams.get('search')
      const page = parseInt(searchParams.get('page')) || 1

      try {
        let movieData = []
        let pageTitle = ''
        let totalPagesCount = 1

        if (search) {
          // Handle search results
          const searchData = await fetchMoviesWithPosters(
            (pageNum) => searchMovies(search, pageNum),
            page,
            20
          )
          movieData = searchData.movies
          totalPagesCount = searchData.totalPages
          pageTitle = `Showing results for "${search}"`
          setSearchResults(movieData) // Store search results
        } else if (category) {
          // Handle category browsing
          let fetchFunction
          switch (category) {
            case 'popular':
              fetchFunction = getPopularMovies
              pageTitle = 'Popular Movies'
              break
            case 'top-rated':
              fetchFunction = getTopRatedMovies
              pageTitle = 'Top Rated Movies'
              break
            case 'upcoming':
              fetchFunction = getUpcomingMovies
              pageTitle = 'Upcoming Movies'
              break
            case 'now-playing':
              fetchFunction = getNowPlayingMovies
              pageTitle = 'Now Playing Movies'
              break
            default:
              pageTitle = 'Movies'
              break
          }
          
          if (fetchFunction) {
            const categoryData = await fetchMoviesWithPosters(fetchFunction, page, 20)
            movieData = categoryData.movies
            totalPagesCount = categoryData.totalPages
          }
        }

        setMovies(movieData)
        setTitle(pageTitle)
        setCurrentPage(page)
        setTotalPages(totalPagesCount)
        setHasNextPage(page < totalPagesCount)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setMovies([])
        setTitle('Error loading movies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [searchParams, setSearchResults])

  const handlePageChange = (newPage) => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    const newSearchParams = new URLSearchParams()
    
    if (search) {
      newSearchParams.set('search', search)
    } else if (category) {
      newSearchParams.set('category', category)
    }
    
    newSearchParams.set('page', newPage.toString())
    setSearchParams(newSearchParams)
  }

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <div className="px-4 md:px-12 py-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
            {title}
          </h1>
          
          {movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} variant="grid" />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-md transition-colors ${
                            currentPage === pageNum
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MoviesList 