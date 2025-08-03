import React, { useState } from 'react'
import FloatingLabelInput from './FloatingLabelInput'
import { validateEmail, validatePassword } from '../utils/validate'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useStore } from '../store/store'

const SignIn = ({ title, email: initialEmail = '' }) => {
  const [isSignIn, setIsSignIn] = useState(title === "Sign In")
  const [name, setName] = useState('')
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useStore()

  const clearStates = () => {
    setError('')
    setName('')
    setEmail('')
    setPassword('')
  }
  const clearError = () => {
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isSignIn && !name) {
      setError('Please enter your name')
      return;
    }
    if (!email) {
      setError('Please enter your email')
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return;
    }
    if (!password) {
      setError('Please enter your password')
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long')
      return;
    }

    if (isSignIn) {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      }).catch((error) => {
        setError("Invalid credentials. Please try again.");
      })
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(() => {
          setUser(user);
        }).catch((profileError) => {
          console.error('Error updating profile:', profileError);
          setUser(user);
        });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode + ": " + errorMessage);
      })
    }

  }
  return (
    <div className='relative z-10 flex md:items-center md:min-h-screen justify-center h-fit px-4 md:mt-[-30px]'>
      <div className='bg-black/70 w-full max-w-md p-12 rounded-2xl'>
        <h1 className='text-white text-3xl md:text-4xl lg:text-3xl font-bold mb-4 leading-tight'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {!isSignIn ?
            <FloatingLabelInput
              type='text'
              value={name}
              onChange={(e) => { setName(e.target.value); clearError() }}
              label='Full Name'
              error={error}
            /> : null}
          <FloatingLabelInput
            type='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError() }}
            label='Email address'
          />
          <FloatingLabelInput
            type='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError() }}
            label='Password'
          />
          {error && <p className="text-red-500 text-md font-medium text-left"><i className="ri-close-circle-line"></i> {error}</p>}
          <button type='submit' className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer'> {isSignIn ? "Sign In" : "Sign Up"}</button>
        </form>
        {isSignIn ?
          <p className='text-white text-sm mt-4 px-1'>New to BingeBox?
            <button className='text-red-600 font-bold ml-1 cursor-pointer' onClick={() => { setIsSignIn(false); clearStates() }}>
              Sign Up
            </button>
          </p> :
          <p className='text-white text-sm mt-4 px-1'>Already have an account?
            <button className='text-red-600 font-bold ml-1 cursor-pointer' onClick={() => { setIsSignIn(true); clearStates() }}>
              Sign In
            </button>
          </p>
        }

      </div>
    </div>
  )
}

export default SignIn
