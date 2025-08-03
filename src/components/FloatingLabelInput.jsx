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

  return (
    <div className={`flex-1 relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        className={`w-full px-4 text-white bg-black/60 border border-gray-500 rounded text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent  ${
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
    </div>
  )
}

export default FloatingLabelInput 