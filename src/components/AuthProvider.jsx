import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useStore } from '../store/store'

const AuthProvider = ({ children }) => {
  const { setUser } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [setUser])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-2">
        <i className="ri-loader-2-line animate-spin text-white text-xl"></i>
        <span className="text-white text-lg font-medium font-sans">Loading...</span>
      </div>
    )
  }

  return children
}

export default AuthProvider 