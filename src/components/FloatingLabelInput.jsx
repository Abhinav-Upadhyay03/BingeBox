import React, { useState } from 'react'

const FloatingLabelInput = ({ 
  type = "text", 
  value, 
  onChange, 
  label, 
  placeholder = "", 
  className = "",
  onFocus,
  onBlur,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleFocus = (e) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const handleChange = (e) => {
    if (onChange) onChange(e)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={`flex-1 relative ${className}`}>
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        className={`w-full px-4 text-white bg-black/60 border border-gray-500 rounded text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent ${
          type === 'password' ? 'pr-12' : ''
        } ${
          value || isFocused 
            ? 'pt-6 pb-2' 
            : 'py-3 md:py-4'
        }`}
        {...props}
      />
      <label 
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          value || isFocused
            ? 'top-[6px] text-[12px] text-gray-400' 
            : 'top-1/2 transform -translate-y-1/2 text-base md:text-lg text-gray-400'
        }`}
      >
        {label}
      </label>
      
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {showPassword ? (
            <i className="ri-eye-off-line text-xl"></i>
          ) : (
            <i className="ri-eye-line text-xl"></i>
          )}
        </button>
      )}
    </div>
  )
}

export default FloatingLabelInput 