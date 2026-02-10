import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import VoterLogin from './pages/VoterLogin'
import VotingBooth from './pages/VotingBooth'
import Results from './pages/Results'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App() {
  const [isVoterLoggedIn, setIsVoterLoggedIn] = useState(false)
  const [voterId, setVoterId] = useState('')
  const [hasVoted, setHasVoted] = useState(false)

  const handleVoterLogin = (id: string) => {
    setIsVoterLoggedIn(true)
    setVoterId(id)
  }

  const handleLogout = () => {
    setIsVoterLoggedIn(false)
    setVoterId('')
  }

  const handleVoteSubmitted = () => {
    setHasVoted(true)
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation isLoggedIn={isVoterLoggedIn} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/voter-login" 
              element={<VoterLogin onLogin={handleVoterLogin} />} 
            />
            <Route 
              path="/voting-booth" 
              element={
                isVoterLoggedIn && !hasVoted ? (
                  <VotingBooth voterId={voterId} onVoteSubmitted={handleVoteSubmitted} />
                ) : isVoterLoggedIn && hasVoted ? (
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="heading-2">Vote Submitted Successfully</h2>
                      <p className="text-gray-600 mb-6">Thank you for voting!</p>
                      <a href="/results" className="btn-primary">View Results</a>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="heading-2">Access Denied</h2>
                      <p className="text-gray-600 mb-6">Please login first to access voting booth.</p>
                      <a href="/voter-login" className="btn-primary">Go to Login</a>
                    </div>
                  </div>
                )
              } 
            />
            <Route path="/results" element={<Results />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
