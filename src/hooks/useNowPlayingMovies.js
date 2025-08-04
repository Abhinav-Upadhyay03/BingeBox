import { useEffect } from "react"
import { getNowPlayingMovies } from "../services/browse.service"
import { useStore } from "../store/store"


const useNowPlayingMovies = () => {
    const { setNowPlayingMovies } = useStore() 
    
    useEffect(() => {
    getNowPlayingMovies().then((data) => {
      if (data.results) {
        setNowPlayingMovies(data.results)
      }
    }).catch((error) => {
      console.error('Error fetching movies:', error)
    })
  }, [setNowPlayingMovies])
}

export default useNowPlayingMovies;