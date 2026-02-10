import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import VoterLogin from './pages/VoterLogin'
import VoterDashboard from './pages/VoterDashboard'
import VotingBooth from './pages/VotingBooth'
import VoteConfirmation from './pages/VoteConfirmation'
import Results from './pages/Results'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ElectionManagement from './pages/ElectionManagement'
import CandidateVoterManagement from './pages/CandidateVoterManagement'
import AuditLogs from './pages/AuditLogs'
import AccessDenied from './pages/AccessDenied'
import NotFound from './pages/NotFound'

function App() {
  const [isVoterLoggedIn, setIsVoterLoggedIn] = useState(false)
  const [voterId, setVoterId] = useState('')
  const [hasVoted, setHasVoted] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  const handleVoterLogin = (id: string) => {
    setIsVoterLoggedIn(true)
    setVoterId(id)
  }

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true)
  }

  const handleLogout = () => {
    setIsVoterLoggedIn(false)
    setVoterId('')
    setIsAdminLoggedIn(false)
  }

  const handleVoteSubmitted = () => {
    setHasVoted(true)
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation
          isVoterLoggedIn={isVoterLoggedIn}
          isAdminLoggedIn={isAdminLoggedIn}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/voter-login" 
              element={<VoterLogin onLogin={handleVoterLogin} />} 
            />
            <Route
              path="/voter-dashboard"
              element={isVoterLoggedIn ? <VoterDashboard /> : <AccessDenied />}
            />
            <Route 
              path="/voting-booth" 
              element={
                isVoterLoggedIn && !hasVoted ? (
                  <VotingBooth voterId={voterId} onVoteSubmitted={handleVoteSubmitted} />
                ) : isVoterLoggedIn && hasVoted ? (
                  <VoteConfirmation />
                ) : (
                  <AccessDenied />
                )
              } 
            />
            <Route
              path="/vote-confirmation"
              element={isVoterLoggedIn && hasVoted ? <VoteConfirmation /> : <AccessDenied />}
            />
            <Route path="/results" element={<Results />} />
            <Route
              path="/admin/login"
              element={<AdminLogin onLogin={handleAdminLogin} />}
            />
            <Route
              path="/admin/dashboard"
              element={isAdminLoggedIn ? <AdminDashboard /> : <AccessDenied />}
            />
            <Route
              path="/admin/election-management"
              element={isAdminLoggedIn ? <ElectionManagement /> : <AccessDenied />}
            />
            <Route
              path="/admin/management"
              element={isAdminLoggedIn ? <CandidateVoterManagement /> : <AccessDenied />}
            />
            <Route
              path="/admin/audit-logs"
              element={isAdminLoggedIn ? <AuditLogs /> : <AccessDenied />}
            />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
