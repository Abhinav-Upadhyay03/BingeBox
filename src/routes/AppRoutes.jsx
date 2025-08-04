import { Routes, Route, Navigate } from 'react-router-dom'
import Homescreen from '../pages/Homescreen'
import Browse from '../pages/Browse'
import { useStore } from '../store/store'
import MoviesList from '../pages/MoviesList'

const AppRoutes = () => {
  const { user } = useStore()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/browse" /> : <Homescreen />} />
      <Route path="/browse" element={user ? <Browse /> : <Navigate to="/" />} />
      <Route path="/movieslist" element={user ? <MoviesList /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes 