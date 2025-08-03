import React from 'react'
import { useState } from 'react'
import FloatingLabelInput from './FloatingLabelInput'
const TitleScreen = ({ onGetStarted }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    
    const onEmailChange = (e) => {
      setEmail(e.target.value)
      setError('')
    }
    const handleGetStarted = () => {
        if (!email) {
          setError('Please enter your email')
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')   
            return;
        }
        
        onGetStarted(email);
    }
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-white text-md md:text-xl mb-4 font-bold">Starts at ₹149. Cancel at any time.</p>
          <p className="text-white text-base md:text-lg mb-8 font-medium">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <FloatingLabelInput
              type="email"
              value={email}
              onChange={onEmailChange}
              label="Email address"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 md:py-2 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer" onClick={() => handleGetStarted()}>
              Get Started
              <i className="ri-arrow-right-line"></i>
            </button>
            
          </div>
          {error && <p className="text-red-500 text-md font-medium mt-2 max-w-2xl mx-auto text-left"><i className="ri-close-circle-line"></i> {error}</p>}
          
        </div>
    </div>
  )
}

export default TitleScreen
