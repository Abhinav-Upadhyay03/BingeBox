import bgImage from "../assets/bg-homescreen.jpg"

const Homescreen = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={bgImage || "/placeholder.svg"} 
          alt="background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/60 to-black/80"></div>
      </div>
      
      <header className="relative z-10 flex items-center justify-between px-4 md:px-12 py-4">
        <div className="text-red-600 text-2xl md:text-4xl font-bold tracking-tight">BingeBox</div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer">
          Sign In
        </button>
      </header>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-white text-md md:text-xl mb-4 font-medium">Starts at ₹149. Cancel at any time.</p>
          <p className="text-white text-base md:text-lg mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 md:py-4 text-white bg-black bg-opacity-40 border border-gray-500 rounded text-base md:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
              Get Started
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Homescreen