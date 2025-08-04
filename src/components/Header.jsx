import React from 'react'
import { useStore } from '../store/store'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const Header = () => {
    const { user, setUser } = useStore()
    const navigate = useNavigate()
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
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 via-black/70 to-transparent">
            <div className="text-red-600 text-2xl md:text-4xl font-bold tracking-tight">BingeBox</div>

            <div className="flex items-center gap-4">
                <SearchBar />
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
    )
}

export default Header
