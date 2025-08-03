import React, { useState } from 'react'
import FloatingLabelInput from './FloatingLabelInput'
import { validateEmail, validatePassword } from '../utils/validate'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'
import { useStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../assets/google-icon.svg'
import { extractError } from '../utils/extractError'

const SignIn = ({ title, email: initialEmail = '' }) => {
  const [formType, setFormType] = useState(title)
  const [name, setName] = useState('')
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetPasswordSent, setResetPasswordSent] = useState(false)
  const { setUser } = useStore()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const clearStates = () => {
    setError('')
    setName('')
    setEmail('')
    setPassword('')
    setResetPasswordSent(false)
  }
  const clearError = () => {
    setError('')
    setResetPasswordSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formType === "Sign Up" && !name) {
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
    if (formType != "Reset Password" && !password) {
      setError('Please enter your password')
      return;
    }
    if (formType != "Reset Password" && !validatePassword(password)) {
      setError('Password must be at least 8 characters long')
      return;
    }
    setIsLoading(true)
    if (formType === "Sign In") {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate('/browse');
        setIsLoading(false)
      }).catch((error) => {
        setError(extractError(error))
        setIsLoading(false)
      })
    } else if (formType === "Sign Up") {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(() => {
          setUser(user);
          navigate('/browse');
          setIsLoading(false)
        }).catch((profileError) => {
          setError(extractError(profileError))
          setUser(user);
          setIsLoading(false)
        });
      }).catch((error) => {
        setError(extractError(error))
        setIsLoading(false)
      })
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        setResetPasswordSent(true);
        setIsLoading(false)
      }).catch((error) => {
        setError(extractError(error))
        setIsLoading(false)
      })
    }

  }
  const handleGoogleSignIn = () => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider).then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
      navigate('/browse');
      setIsLoading(false)
    }).catch((error) => {
      setError(extractError(error))
      setIsLoading(false)
    })
  }
  return (
    <div className='relative z-10 flex md:items-center md:min-h-screen justify-center h-fit px-4 md:mt-[-30px]'>
      <div className='bg-black/70 w-full max-w-md p-12 rounded-2xl'>
        <h1 className='text-white text-3xl md:text-4xl lg:text-3xl font-bold mb-4 leading-tight'>{formType}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {formType === "Sign Up" ?
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
          {formType !== "Reset Password" &&
            <FloatingLabelInput
              type='password'
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError() }}
              label='Password'
            />}
          {error && <p className="text-red-500 text-md font-medium text-left"><i className="ri-close-circle-line"></i> {error}</p>}
          {resetPasswordSent && <p className="text-green-500 text-md font-medium text-left"><i className="ri-checkbox-circle-line mr-1"></i>Password reset email sent. Please check your email.</p>}
          <button type='submit' className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer'> {isLoading ? <i className="ri-loader-2-line animate-spin"></i> : formType}</button>
        </form>
        <div className='text-white text-sm mt-4 px-1 flex flex-col items-center'>
          <span className='text-center'>OR</span>
          <button className='flex items-center gap-2 mt-2 bg-white/10 px-4 py-2 rounded-md cursor-pointer' onClick={() => { handleGoogleSignIn() }}>
            <img src={googleIcon} alt="google" className='w-6 h-6' />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className='flex flex-col items-center'>
          {formType === "Sign In" ?
            <>
              <p className='text-white text-sm mt-4 px-1'>Forgot Password?
                <button className='font-bold ml-1 cursor-pointer' onClick={() => { setFormType("Reset Password"); clearStates() }}>
                  Click to reset
                </button>
              </p>
              <p className='text-white text-sm mt-2 px-1'>New to BingeBox?
                <button className='text-red-600 font-bold ml-1 cursor-pointer' onClick={() => { setFormType("Sign Up"); clearStates() }}>
                  Sign Up
                </button>
              </p>
            </>
            :
            <p className='text-white text-sm mt-4 px-1'>{formType === "Sign Up" && "Already have an account?"} {formType === "Reset Password" && "Recalled password? Go back to"}
              <button className='text-red-600 font-bold ml-1 cursor-pointer' onClick={() => { setFormType("Sign In"); clearStates() }}>
                Sign In
              </button>
            </p>
          }
        </div>


      </div>

    </div>
  )
}

export default SignIn
