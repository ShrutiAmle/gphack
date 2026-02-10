import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface VoterStats {
  voterId: string
  voterName: string
  constituency: string
  hasVoted: boolean
  votedCandidate?: string
  votingTime?: string
  totalVoters: number
  votesReceived: number
  turnout: number
}

export default function VoterDashboard() {
  const navigate = useNavigate()
  const [stats] = useState<VoterStats>({
    voterId: 'V-2026001234',
    voterName: 'John Doe',
    constituency: 'Ward 5, Local Body',
    hasVoted: false,
    totalVoters: 2500,
    votesReceived: 1250,
    turnout: 50
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold mb-4">
            Verified Voter Session
          </div>
          <h1 className="heading-1 text-4xl mb-2">Voter Dashboard</h1>
          <p className="text-gray-600">Track your status, turnout, and election updates.</p>
        </div>

        {/* Voter Info Card */}
        <div className="card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">Voter ID</p>
              <p className="text-2xl font-bold text-primary">{stats.voterId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">Voter Name</p>
              <p className="text-2xl font-bold text-gray-800">{stats.voterName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">Constituency</p>
              <p className="text-lg text-gray-700">{stats.constituency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">Voting Status</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                stats.hasVoted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {stats.hasVoted ? 'Voted' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!stats.hasVoted && (
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/voting-booth')}
              className="btn-primary text-lg px-8 py-4"
            >
              Cast Your Vote
            </button>
            <button
              onClick={() => navigate('/results')}
              className="btn-outline text-lg px-8 py-4"
            >
              View Live Results
            </button>
          </div>
        )}

        {stats.hasVoted && (
          <div className="card p-6 mb-8 bg-green-50 border-l-4 border-green-500">
            <p className="text-green-800 font-semibold">
              Your vote has been successfully cast. Thank you for participating in this election!
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Registered Voters</p>
            <p className="text-4xl font-bold text-primary">{stats.totalVoters.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Official roll for your ward</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Votes Cast</p>
            <p className="text-4xl font-bold text-primary">{stats.votesReceived.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Live turnout snapshot</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Voter Turnout</p>
            <p className="text-4xl font-bold text-primary">{stats.turnout}%</p>
            <p className="text-xs text-gray-500 mt-2">Updated periodically</p>
          </div>
        </div>

        {/* Important Info */}
        <div className="card p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="heading-3 mb-4 text-primary">Election Information</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold mt-1">•</span>
              <span>Voting is open from 8:00 AM to 5:00 PM at your designated polling station.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold mt-1">•</span>
              <span>Your vote is completely anonymous and encrypted for your privacy.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold mt-1">•</span>
              <span>You can verify your voting status anytime from this dashboard.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold mt-1">•</span>
              <span>For support, contact our helpline: 1800-EVOTE-1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
