import React, { useState } from 'react'
import FloatingLabelInput from './FloatingLabelInput'

const SignIn = ({title, email: initialEmail = ''}) => {
    const [isSignIn, setIsSignIn] = useState(title === "Sign In")
    const [name, setName] = useState('')
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState('')

  return (
    <div className='relative z-10 flex md:items-center md:min-h-screen justify-center h-fit px-4 md:mt-[-30px]'>
      <div className='bg-black/70 w-full max-w-md p-12 rounded-2xl'>
        <h1 className='text-white text-3xl md:text-4xl lg:text-3xl font-bold mb-4 leading-tight'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        <div className='flex flex-col gap-4'>
          {!isSignIn ? <FloatingLabelInput type= 'text' value={name} onChange={(e) => setName(e.target.value)} label='Full Name' /> : null}
          <FloatingLabelInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email address'
          />
          <FloatingLabelInput
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
          />
          <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer'> {isSignIn ? "Sign In" : "Sign Up"}</button>
        </div>
        {isSignIn ? <p className='text-white text-sm mt-4 px-1'>Don't have an account? <button className='text-red-600' onClick={() => setIsSignIn(false)}>Sign Up</button></p> : <p className='text-white text-sm mt-4 px-1'>Already have an account? <button className='text-red-600' onClick={() => setIsSignIn(true)}>Sign In</button></p>}
        
      </div>
    </div>
  )
}

export default SignIn
