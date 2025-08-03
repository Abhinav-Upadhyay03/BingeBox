import bgImage from "../assets/bg-homescreen.jpg"
import SignIn from "../components/SignIn"
import TitleScreen from "../components/TitleScreen"
import { useState } from "react"

const Homescreen = () => {

    const [isSignIn, setIsSignIn] = useState(false)
    const [title, setTitle] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    
    const handleSignIn = () => {
        setTitle("Sign In")
        setSignUpEmail("")
        setIsSignIn(!isSignIn)
    }
    
    const handleGetStarted = (email) => {
        console.log("get started with email:", email);
        setSignUpEmail(email)
        setTitle("Sign Up")
        setIsSignIn(true)
    }
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={bgImage || "/placeholder.svg"}
                    alt="background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/70 to-black/80"></div>
            </div>

            <header className="relative z-10 flex items-center justify-between px-4 md:px-12 py-4">
                <div className="text-red-600 text-2xl md:text-4xl font-bold tracking-tight">BingeBox</div>
                <button onClick={() => handleSignIn()} className={`${!isSignIn ? "bg-red-600 hover:bg-red-700" : " "} px-4 py-2 rounded text-sm font-bold transition-colors cursor-pointer text-white`}>
                    {!isSignIn ? "Sign In" : "Back"}
                </button>
            </header>
            {isSignIn ? <SignIn title={title} email={signUpEmail} /> : <TitleScreen onGetStarted={(email) => handleGetStarted(email)}/>}
        </div>
    )
}

export default Homescreen