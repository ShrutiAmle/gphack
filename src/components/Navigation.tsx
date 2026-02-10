import { Link } from 'react-router-dom'
import { useState } from 'react'

interface NavigationProps {
  isVoterLoggedIn: boolean
  isAdminLoggedIn: boolean
  onLogout: () => void
}

export default function Navigation({ isVoterLoggedIn, isAdminLoggedIn, onLogout }: NavigationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLogout = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onLogout()
      setIsAnimating(false)
    }, 300)
  }

  return (
    <nav className="bg-gradient-to-r from-primary via-blue-600 to-blue-700 shadow-2xl sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="text-primary font-bold text-2xl group-hover:rotate-12 transition-transform duration-300">V</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline group-hover:text-blue-100 transition-colors">
              E-Voting
            </span>
          </Link>

          {/* Menu - Enhanced */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-all duration-300 font-semibold hover:bg-white/10 transform hover:scale-110"
            >
              Home
            </Link>
            <Link 
              to="/results" 
              className="text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-all duration-300 font-semibold hover:bg-white/10 transform hover:scale-110"
            >
              Results
            </Link>

            {isVoterLoggedIn && (
              <Link
                to="/voter-dashboard"
                className="text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-all duration-300 font-semibold hover:bg-white/10 transform hover:scale-110"
              >
                Dashboard
              </Link>
            )}

            {isAdminLoggedIn && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-all duration-300 font-semibold hover:bg-white/10 transform hover:scale-110"
                >
                  Admin
                </Link>
                <Link
                  to="/admin/election-management"
                  className="text-white hover:text-blue-100 px-4 py-2 rounded-lg transition-all duration-300 font-semibold hover:bg-white/10 transform hover:scale-110"
                >
                  Elections
                </Link>
              </>
            )}
            
            {(isVoterLoggedIn || isAdminLoggedIn) ? (
              <button
                onClick={handleLogout}
                className={`bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg transition-all duration-300 font-semibold transform hover:scale-110 hover:shadow-lg ${
                  isAnimating ? 'scale-95 opacity-50' : ''
                }`}
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/voter-login"
                  className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-lg transition-all duration-300 font-semibold transform hover:scale-110 hover:shadow-lg"
                >
                  Voter Login
                </Link>
                <Link
                  to="/admin/login"
                  className="bg-black/15 text-white hover:bg-black/25 px-6 py-2 rounded-lg transition-all duration-300 font-semibold"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
