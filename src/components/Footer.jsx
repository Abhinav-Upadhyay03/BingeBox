import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-4 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Left side - Developer info */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-gray-400 text-sm md:text-base">
              Developed by Abhinav
            </span>
            <span className="text-gray-600 hidden md:block">•</span>
            <span className="text-gray-400 text-sm md:text-base">
              Let's connect
            </span>
          </div>

          {/* Right side - Brand */}
          <div className="text-red-600 text-xl md:text-2xl font-bold tracking-tight">
            BingeBox
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center mt-6 md:mt-4">
          <div className="flex items-center gap-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/abhinav-upadhyay-67973821b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
             <i className="ri-linkedin-box-fill md:text-3xl text-2xl" fill="white"></i>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Abhinav-Upadhyay03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <i className="ri-github-fill md:text-3xl text-2xl" fill="white"></i>
            </a>

            {/* Email */}
            <a
              href="mailto:abhi.u3131@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <i className="ri-mail-fill md:text-3xl text-2xl" fill="white"></i>
            </a>
          </div>
        </div>

        
      </div>
    </footer>
  )
}

export default Footer 