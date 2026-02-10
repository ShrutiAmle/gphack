import { useState, useEffect } from 'react'
import CandidateCard from '../components/CandidateCard'
import ProgressBar from '../components/ProgressBar'
import AnimatedCounter from '../components/AnimatedCounter'

interface Candidate {
  id: string
  name: string
  party: string
  symbol: string
  votes: number
}

const INITIAL_RESULTS: Candidate[] = [
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', symbol: 'INC', votes: 34500 },
  { id: '2', name: 'Priya Singh', party: 'Bharatiya Janata Party', symbol: 'BJP', votes: 42800 },
  { id: '3', name: 'Amit Verma', party: 'Aam Aadmi Party', symbol: 'AAP', votes: 28900 },
  { id: '4', name: 'Zara Khan', party: 'Samajwadi Party', symbol: 'SP', votes: 15600 },
  { id: '5', name: 'NOTA', party: 'None of the Above', symbol: 'NOTA', votes: 3200 },
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
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Enhanced */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-5 duration-700">
          <h1 className="heading-1 text-4xl md:text-5xl glow-text">Election Results</h1>
          <p className="text-gray-700 text-xl font-semibold mt-3">Local Body Election 2026 - Real-time Results</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="badge-info px-6 py-3 text-base">
              Total Votes: <AnimatedCounter target={totalVotes} duration={2000} />
            </span>
            {isLive && <span className="badge-success px-6 py-3 text-base animate-pulse">LIVE Updates</span>}
          </div>
        </div>

        {/* Winner Section - Enhanced */}
        {totalVotes > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 border-2 border-warning rounded-2xl p-10 mb-12 shadow-2xl animate-in fade-in scale-in-95 duration-700 delay-100 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-pulse" />
            
            <h2 className="heading-2 text-center mb-8 text-3xl relative z-10">Current Leading Candidate</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="bg-yellow-400 text-white px-6 py-4 rounded-lg font-bold text-2xl">{winner.symbol}</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl font-bold text-gray-800 mb-3 glow-text">{winner.name}</h3>
                <p className="text-2xl font-bold text-warning mb-4">{winner.party}</p>
                <div className="bg-white rounded-lg p-4 shadow-lg inline-block md:block">
                  <p className="text-gray-700 text-sm font-semibold mb-2">Votes Received:</p>
                  <p className="text-4xl font-bold text-primary">
                    <AnimatedCounter target={winner.votes} duration={1500} suffix="" />
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <p className="text-gray-600 text-sm font-bold mb-2">Vote Share</p>
                <p className="text-6xl font-bold text-primary glow-text">
                  {((winner.votes / totalVotes) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Progress Bars */}
          <div className="card p-10 shadow-2xl animate-in fade-in slide-in-from-left-5 duration-700 delay-200">
            <h3 className="heading-2 mb-10 text-3xl glow-text">Vote Distribution</h3>
            {sortedResults.map((candidate, index) => (
              <div key={candidate.id} className="mb-8">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                    <span className="inline-block bg-primary text-white px-3 py-1 rounded-md font-bold text-sm">{candidate.symbol}</span>
                    <span className="font-bold text-gray-800">{candidate.name}</span>
                  </div>
                  <span className="text-primary font-bold"><AnimatedCounter target={candidate.votes} duration={1500} suffix=" votes" /></span>
                </div>
                <ProgressBar
                  label={candidate.party}
                  votes={candidate.votes}
                  totalVotes={totalVotes}
                  percentage={(candidate.votes / totalVotes) * 100}
                  color={['bg-primary', 'bg-orange-500', 'bg-purple-500', 'bg-rose-500', 'bg-gray-500'][index % 5]}
                />
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="card p-10 shadow-2xl animate-in fade-in slide-in-from-right-5 duration-700 delay-300">
            <h3 className="heading-2 mb-10 text-3xl glow-text">Statistics</h3>
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Total Votes Cast</p>
                <p className="text-5xl font-bold text-primary glow-text"><AnimatedCounter target={totalVotes} duration={2000} /></p>
              </div>
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Registered Voters</p>
                <p className="text-5xl font-bold text-primary"><AnimatedCounter target={2850000} duration={2000} suffix="+" /></p>
              </div>
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Voter Turnout</p>
                <p className="text-5xl font-bold text-success">
                  {((totalVotes / 2850000) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Last Updated</p>
                <p className="text-2xl font-bold text-gray-800 animate-pulse">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Cards */}
        <div className="mb-12 animate-in fade-in slide-up duration-700 delay-500">
          <h3 className="heading-2 mb-10 text-3xl glow-text">Candidate Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sortedResults.map((candidate, index) => (
              <div key={candidate.id} className="relative animate-in fade-in slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  {index === 0 && <span className="badge-success text-lg">1st</span>}
                  {index === 1 && <span className="badge-warning text-lg">2nd</span>}
                  {index === 2 && <span className="badge-info text-lg">3rd</span>}
                </div>
                <CandidateCard
                  {...candidate}
                  isSelected={candidate.id === winner.id}
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="card p-10 bg-blue-50 border-2 border-primary shadow-lg animate-in fade-in slide-up duration-700 delay-600">
          <h3 className="heading-3 mb-6 text-2xl">About These Results</h3>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <span>Results are updated in real-time as votes are received</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <span>All votes are encrypted and verified for authenticity</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <span>Results are transparent and independently verifiable</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <span>Final results will be announced after voting period closes</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <span>Detailed result breakdown available for election commission officials</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
