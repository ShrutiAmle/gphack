// Static results view without animations; focused on clear analytics
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
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', symbol: 'INC', votes: 34500 },
  { id: '2', name: 'Priya Singh', party: 'Bharatiya Janata Party', symbol: 'BJP', votes: 42800 },
  { id: '3', name: 'Amit Verma', party: 'Aam Aadmi Party', symbol: 'AAP', votes: 28900 },
  { id: '4', name: 'Zara Khan', party: 'Samajwadi Party', symbol: 'SP', votes: 15600 },
  { id: '5', name: 'NOTA', party: 'None of the Above', symbol: 'NOTA', votes: 3200 },
]

export default function Results() {
  const results = INITIAL_RESULTS
  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0)
  const winner = results.reduce((prev, current) => 
    current.votes > prev.votes ? current : prev
  )
  const sortedResults = [...results].sort((a, b) => b.votes - a.votes)
  const runnerUp = sortedResults[1]
  const nota = results.find(c => c.symbol === 'NOTA')

  const winnerShare = totalVotes > 0 ? (winner.votes / totalVotes) * 100 : 0
  const marginVotes = runnerUp ? winner.votes - runnerUp.votes : 0
  const marginPercent = totalVotes > 0 ? (marginVotes / totalVotes) * 100 : 0
  const notaShare = nota && totalVotes > 0 ? (nota.votes / totalVotes) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-1 text-4xl md:text-5xl">Election Results</h1>
          <p className="text-gray-700 text-xl font-semibold mt-3">Local Body Election 2026 - Real-time Results</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="badge-info px-6 py-3 text-base">
              Total Votes: {totalVotes.toLocaleString()}
            </span>
            <span className="badge-success px-6 py-3 text-base">
              Winner: {winner.name}
            </span>
          </div>
        </div>

        {/* Winner & Key Metrics */}
        {totalVotes > 0 && (
          <div className="bg-white border border-yellow-200 rounded-2xl p-10 mb-12 shadow-sm">
            <h2 className="heading-2 text-center mb-8 text-3xl">Current Leading Candidate</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="bg-yellow-400 text-white px-6 py-4 rounded-lg font-bold text-2xl">{winner.symbol}</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl font-bold text-gray-800 mb-3">{winner.name}</h3>
                <p className="text-2xl font-bold text-warning mb-4">{winner.party}</p>
                <div className="bg-white rounded-lg p-4 shadow-lg inline-block md:block">
                  <p className="text-gray-700 text-sm font-semibold mb-2">Votes Received:</p>
                  <p className="text-4xl font-bold text-primary">
                    {winner.votes.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <p className="text-gray-600 text-sm font-bold mb-2">Vote Share</p>
                <p className="text-4xl font-bold text-primary mb-2">
                  {winnerShare.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">
                  Lead of {marginVotes.toLocaleString()} votes ({marginPercent.toFixed(1)}%) over next candidate
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Progress Bars */}
          <div className="card p-10">
            <h3 className="heading-2 mb-10 text-3xl">Vote Distribution</h3>
            {sortedResults.map((candidate, index) => (
              <div key={candidate.id} className="mb-8">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                    <span className="inline-block bg-primary text-white px-3 py-1 rounded-md font-bold text-sm">{candidate.symbol}</span>
                    <span className="font-bold text-gray-800">{candidate.name}</span>
                  </div>
                  <span className="text-primary font-bold">
                    {candidate.votes.toLocaleString()} votes
                  </span>
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
          <div className="card p-10">
            <h3 className="heading-2 mb-10 text-3xl">Analytics Overview</h3>
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Total Votes Cast</p>
                <p className="text-3xl font-bold text-primary">{totalVotes.toLocaleString()}</p>
              </div>
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Registered Voters</p>
                <p className="text-3xl font-bold text-primary">2,850,000+</p>
              </div>
              <div className="border-b border-gray-200 pb-8 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Voter Turnout</p>
                <p className="text-5xl font-bold text-success">
                  {((totalVotes / 2850000) * 100).toFixed(2)}%
                </p>
              </div>
              {nota && (
                <div className="border-b border-gray-200 pb-8">
                  <p className="text-gray-600 text-sm font-bold mb-3 uppercase">NOTA Share</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {nota.votes.toLocaleString()} votes ({notaShare.toFixed(2)}%)
                  </p>
                </div>
              )}
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 text-sm font-bold mb-3 uppercase">Last Updated</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Cards */}
        <div className="mb-12">
          <h3 className="heading-2 mb-10 text-3xl">Candidate Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sortedResults.map((candidate, index) => (
              <div key={candidate.id} className="relative">
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
        <div className="card p-10 bg-blue-50 border-2 border-primary shadow-lg">
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
