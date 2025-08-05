import { useEffect } from "react"
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../services/browse.service"
import { useStore } from "../store/store"

const useMovieCategories = () => {
  const { 
    setPopularMovies, 
    setTopRatedMovies, 
    setUpcomingMovies,
    setNowPlayingMovies
  } = useStore()
  
  // Helper function to filter movies with posters
  const filterMoviesWithPosters = (movies) => {
    return movies.filter(movie => movie.poster_path)
  }

  // Helper function to fetch movies until we have enough with posters
  const fetchMoviesWithPosters = async (fetchFunction, targetCount = 20) => {
    let allMovies = []
    let currentPage = 1
    
    while (allMovies.length < targetCount && currentPage <= 10) { // Safety limit
      try {
        const data = await fetchFunction(currentPage)
        const filteredMovies = filterMoviesWithPosters(data.results || [])
        allMovies = [...allMovies, ...filteredMovies]
        
        if (data.results?.length === 0) {
          break
        }
        currentPage++
      } catch (error) {
        console.error('Error fetching movies:', error)
        break
      }
    }
    
    return allMovies.slice(0, targetCount)
  }
  
  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      if (data.results) {
        const filteredMovies = filterMoviesWithPosters(data.results)
        setNowPlayingMovies(filteredMovies)
      }
    }).catch((error) => {
      console.error('Error fetching now playing movies:', error)
    })

    fetchMoviesWithPosters(getPopularMovies, 20).then((movies) => {
      setPopularMovies(movies)
    }).catch((error) => {
      console.error('Error fetching popular movies:', error)
    })

    fetchMoviesWithPosters(getTopRatedMovies, 20).then((movies) => {
      setTopRatedMovies(movies)
    }).catch((error) => {
      console.error('Error fetching top rated movies:', error)
    })

    fetchMoviesWithPosters(getUpcomingMovies, 20).then((movies) => {
      setUpcomingMovies(movies)
    }).catch((error) => {
      console.error('Error fetching upcoming movies:', error)
    })
  }, [setPopularMovies, setTopRatedMovies, setUpcomingMovies, setNowPlayingMovies])
}

export default useMovieCategories 