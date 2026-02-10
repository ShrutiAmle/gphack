import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Candidate {
  id: number
  name: string
  symbol: string
  party: string
  votes: number
}

interface Voter {
  id: number
  voterId: string
  name: string
  constituency: string
  status: 'pending' | 'voted' | 'cancelled'
}

export default function CandidateVoterManagement() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'candidates' | 'voters'>('candidates')

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'INC - Indian National Congress', symbol: 'INC', party: 'Congress', votes: 420 },
    { id: 2, name: 'BJP - Bharatiya Janata Party', symbol: 'BJP', party: 'BJP', votes: 380 },
    { id: 3, name: 'AAP - Aam Aadmi Party', symbol: 'AAP', party: 'AAP', votes: 280 },
    { id: 4, name: 'SP - Samajwadi Party', symbol: 'SP', party: 'Samajwadi', votes: 190 },
    { id: 5, name: 'NOTA - None of the Above', symbol: 'NOTA', party: 'NOTA', votes: 45 }
  ])

  const [voters, setVoters] = useState<Voter[]>([
    { id: 1, voterId: 'V-2026001001', name: 'Rajesh Kumar', constituency: 'Ward 5', status: 'voted' },
    { id: 2, voterId: 'V-2026001002', name: 'Priya Singh', constituency: 'Ward 5', status: 'pending' },
    { id: 3, voterId: 'V-2026001003', name: 'Amit Patel', constituency: 'Ward 5', status: 'voted' },
    { id: 4, voterId: 'V-2026001004', name: 'Sneha Verma', constituency: 'Ward 5', status: 'pending' },
    { id: 5, voterId: 'V-2026001005', name: 'Deepak Sharma', constituency: 'Ward 5', status: 'cancelled' }
  ])

  const [showAddCandidate, setShowAddCandidate] = useState(false)
  const [newCandidate, setNewCandidate] = useState({ name: '', symbol: '', party: '' })
  const [message, setMessage] = useState('')

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.symbol || !newCandidate.party) {
      alert('Please fill all fields')
      return
    }

    const candidate: Candidate = {
      id: candidates.length + 1,
      name: newCandidate.name,
      symbol: newCandidate.symbol,
      party: newCandidate.party,
      votes: 0
    }

    setCandidates([...candidates, candidate])
    setNewCandidate({ name: '', symbol: '', party: '' })
    setShowAddCandidate(false)
    setMessage('Candidate added successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeleteCandidate = (id: number) => {
    setCandidates(candidates.filter(c => c.id !== id))
    setMessage('Candidate deleted successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleVoterStatusChange = (id: number, newStatus: 'pending' | 'voted' | 'cancelled') => {
    setVoters(voters.map(v =>
      v.id === id ? { ...v, status: newStatus } : v
    ))
    setMessage('Voter status updated!')
    setTimeout(() => setMessage(''), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'voted':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1 text-4xl mb-2">Candidate & Voter Management</h1>
          <p className="text-gray-600">Manage candidates and voter registrations</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-semibold">
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'candidates'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Candidates ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab('voters')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'voters'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Voters ({voters.length})
          </button>
        </div>

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div>
            {/* Add Candidate Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAddCandidate(!showAddCandidate)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Candidate
              </button>
            </div>

            {/* Add Candidate Form */}
            {showAddCandidate && (
              <div className="card p-6 mb-6">
                <h3 className="heading-3 mb-4">Add New Candidate</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Candidate Name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Symbol (e.g., INC)"
                    value={newCandidate.symbol}
                    onChange={(e) => setNewCandidate({ ...newCandidate, symbol: e.target.value })}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Party"
                    value={newCandidate.party}
                    onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCandidate}
                    className="btn-primary px-6 py-2"
                  >
                    Add Candidate
                  </button>
                  <button
                    onClick={() => setShowAddCandidate(false)}
                    className="btn-outline px-6 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Candidates Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Candidate</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Symbol</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Party</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Votes</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {candidates.map(candidate => (
                      <tr key={candidate.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{candidate.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
                            {candidate.symbol}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{candidate.party}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{candidate.votes}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteCandidate(candidate.id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Voters Tab */}
        {activeTab === 'voters' && (
          <div>
            {/* Voter Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="card p-6 text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Voters</p>
                <p className="text-4xl font-bold text-primary">{voters.length}</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">Voted</p>
                <p className="text-4xl font-bold text-green-600">{voters.filter(v => v.status === 'voted').length}</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">Pending</p>
                <p className="text-4xl font-bold text-yellow-600">{voters.filter(v => v.status === 'pending').length}</p>
              </div>
            </div>

            {/* Voters Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Voter ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Constituency</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {voters.map(voter => (
                      <tr key={voter.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-800">{voter.voterId}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{voter.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{voter.constituency}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(voter.status)}`}>
                            {voter.status.charAt(0).toUpperCase() + voter.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={voter.status}
                            onChange={(e) => handleVoterStatusChange(voter.id, e.target.value as 'pending' | 'voted' | 'cancelled')}
                            className="text-xs px-2 py-1 rounded border border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="voted">Voted</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/election-management')}
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Election Management
          </button>
        </div>
      </div>
    </div>
  )
}
