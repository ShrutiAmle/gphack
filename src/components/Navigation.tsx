import { Link } from 'react-router-dom'

interface NavigationProps {
  isLoggedIn: boolean
  onLogout: () => void
}

export default function Navigation({ isLoggedIn, onLogout }: NavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-primary to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-xl">🗳️</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">E-Voting Platform</span>
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition duration-300"
            >
              Home
            </Link>
            <Link 
              to="/results" 
              className="text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition duration-300"
            >
              Results
            </Link>
            
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="bg-secondary text-white hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300 font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/voter-login"
                className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg transition duration-300 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
