import React from 'react'
import { useStore } from '../store/store'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Browse = () => {
  const { user, setUser } = useStore()
  const navigate = useNavigate()
  
  // Extract first name from display name
  const getFirstName = (displayName) => {
    if (!displayName) return 'User'
    return displayName.split(' ')[0]
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null)
      navigate('/')
    }).catch((error) => {
      console.error('Error signing out:', error)
    })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-red-600 text-2xl md:text-4xl font-bold tracking-tight">BingeBox</div>
        
        <div className="flex items-center gap-4">
          <span className="text-white text-sm md:text-base">
            Hi, {getFirstName(user?.displayName)}
          </span>
          <button 
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-12 py-8">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-8">
          Welcome to BingeBox
        </h1>
        <p className="text-gray-300 text-lg">
          Start exploring movies and TV shows
        </p>
      </main>
    </div>
  )
}

export default Browse 