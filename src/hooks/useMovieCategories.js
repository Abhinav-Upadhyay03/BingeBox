import { useEffect } from "react"
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../services/browse.service"
import { useStore } from "../store/store"

const useMovieCategories = () => {
  const { 
    setPopularMovies, 
    setTopRatedMovies, 
    setUpcomingMovies 
  } = useStore()
  
  useEffect(() => {
    // Fetch Popular Movies
    getPopularMovies().then((data) => {
      if (data.results) {
        setPopularMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching popular movies:', error)
    })

    // Fetch Top Rated Movies
    getTopRatedMovies().then((data) => {
      if (data.results) {
        setTopRatedMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching top rated movies:', error)
    })

    // Fetch Upcoming Movies
    getUpcomingMovies().then((data) => {
      if (data.results) {
        setUpcomingMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching upcoming movies:', error)
    })
  }, [setPopularMovies, setTopRatedMovies, setUpcomingMovies])
}

export default useMovieCategories 