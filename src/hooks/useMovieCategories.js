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
  
  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      if (data.results) {
        setNowPlayingMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching now playing movies:', error)
    })

    getPopularMovies().then((data) => {
      if (data.results) {
        setPopularMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching popular movies:', error)
    })

    getTopRatedMovies().then((data) => {
      if (data.results) {
        setTopRatedMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching top rated movies:', error)
    })

    getUpcomingMovies().then((data) => {
      if (data.results) {
        setUpcomingMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching upcoming movies:', error)
    })
  }, [setPopularMovies, setTopRatedMovies, setUpcomingMovies, setNowPlayingMovies])
}

export default useMovieCategories 