import { useState, useEffect } from 'react'
import CandidateCard from '../components/CandidateCard'
import ProgressBar from '../components/ProgressBar'

interface Candidate {
  id: string
  name: string
  party: string
  symbol: string
  votes: number
}

const INITIAL_RESULTS: Candidate[] = [
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', symbol: '🌳', votes: 34500 },
  { id: '2', name: 'Priya Singh', party: 'Bharatiya Janata Party', symbol: '🪷', votes: 42800 },
  { id: '3', name: 'Amit Verma', party: 'Aam Aadmi Party', symbol: '🧹', votes: 28900 },
  { id: '4', name: 'Zara Khan', party: 'Samajwadi Party', symbol: '🔱', votes: 15600 },
  { id: '5', name: 'NOTA', party: 'None of the Above', symbol: '❌', votes: 3200 },
]

export default function Results() {
  const [results, setResults] = useState<Candidate[]>(INITIAL_RESULTS)
  const [isLive] = useState(true)

  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0)
  const winner = results.reduce((prev, current) => 
    current.votes > prev.votes ? current : prev
  )
  const sortedResults = [...results].sort((a, b) => b.votes - a.votes)

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setResults(prev => 
        prev.map(candidate => ({
          ...candidate,
          votes: candidate.votes + Math.floor(Math.random() * 10)
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="heading-1">Election Results</h1>
          <p className="text-gray-600 text-lg">Local Body Election 2026 - Real-time Results</p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="badge-info">📈 Total Votes: {totalVotes.toLocaleString()}</span>
            {isLive && <span className="badge-success">🔴 LIVE Updates</span>}
          </div>
        </div>

        {/* Winner Section */}
        {totalVotes > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-warning rounded-xl p-8 mb-12">
            <h2 className="heading-2 text-center mb-6">🏆 Current Leading Candidate</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-6xl">{winner.symbol}</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{winner.name}</h3>
                <p className="text-xl font-semibold text-warning mb-2">{winner.party}</p>
                <p className="text-gray-700">
                  <span className="text-3xl font-bold text-primary">{winner.votes.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">votes</span>
                </p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary">
                  {((winner.votes / totalVotes) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Progress Bars */}
          <div className="card p-8">
            <h3 className="heading-2 mb-8">Vote Distribution</h3>
            {sortedResults.map((candidate, index) => (
              <ProgressBar
                key={candidate.id}
                label={`${index + 1}. ${candidate.name}`}
                votes={candidate.votes}
                totalVotes={totalVotes}
                percentage={(candidate.votes / totalVotes) * 100}
                color={['bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-rose-500', 'bg-gray-500'][index % 5]}
              />
            ))}
          </div>

          {/* Statistics */}
          <div className="card p-8">
            <h3 className="heading-2 mb-8">Statistics</h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-gray-600 text-sm mb-2">Total Votes Cast</p>
                <p className="text-4xl font-bold text-primary">{totalVotes.toLocaleString()}</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-gray-600 text-sm mb-2">Registered Voters</p>
                <p className="text-4xl font-bold text-primary">2,850,000</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-gray-600 text-sm mb-2">Voter Turnout</p>
                <p className="text-4xl font-bold text-primary">
                  {((totalVotes / 2850000) * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">Last Updated</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Cards */}
        <div className="mb-12">
          <h3 className="heading-2 mb-8">Candidate Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sortedResults.map((candidate, index) => (
              <div key={candidate.id}>
                <CandidateCard
                  {...candidate}
                  isSelected={candidate.id === winner.id}
                  onClick={() => {}}
                />
                {index === 0 && (
                  <div className="text-center mt-3">
                    <span className="badge-success text-xs">🥇 First Place</span>
                  </div>
                )}
                {index === 1 && (
                  <div className="text-center mt-3">
                    <span className="badge-warning text-xs">🥈 Second Place</span>
                  </div>
                )}
                {index === 2 && (
                  <div className="text-center mt-3">
                    <span className="badge-info text-xs">🥉 Third Place</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="card p-8 bg-blue-50 border-2 border-primary">
          <h3 className="heading-3 mb-4">📋 About These Results</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Results are updated in real-time as votes are received</li>
            <li>✓ All votes are encrypted and verified for authenticity</li>
            <li>✓ Results are transparent and independently verifiable</li>
            <li>✓ Final results will be announced after voting period closes</li>
            <li>✓ Detailed result breakdown available for election commission officials</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
