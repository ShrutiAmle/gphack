import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CandidateCard from '../components/CandidateCard'

interface VotingBoothProps {
  voterId: string
  onVoteSubmitted: () => void
}

interface Candidate {
  id: string
  name: string
  party: string
  symbol: string
}

const CANDIDATES: Candidate[] = [
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', symbol: 'INC' },
  { id: '2', name: 'Priya Singh', party: 'Bharatiya Janata Party', symbol: 'BJP' },
  { id: '3', name: 'Amit Verma', party: 'Aam Aadmi Party', symbol: 'AAP' },
  { id: '4', name: 'Zara Khan', party: 'Samajwadi Party', symbol: 'SP' },
  { id: '5', name: 'NOTA', party: 'None of the Above', symbol: 'NOTA' },
]

export default function VotingBooth({ voterId, onVoteSubmitted }: VotingBoothProps) {
  const navigate = useNavigate()
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const selected = CANDIDATES.find(c => c.id === selectedCandidate)

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      alert('Please select a candidate')
      return
    }

    setIsSubmitting(true)

    // Simulate API call and vote encryption
    setTimeout(() => {
      // In a real application, encrypt the vote and store securely
      console.log(`Vote submitted for: ${selected?.name} by voter: ${voterId}`)
      setSuccessMessage(true)
      setIsSubmitting(false)

      // Redirect after showing success
      setTimeout(() => {
        onVoteSubmitted()
        navigate('/vote-confirmation')
      }, 2500)
    }, 2000)
  }

  if (successMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-100 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6">✓</div>
          <h2 className="heading-2 text-green-700 mb-4 text-4xl glow-text">Vote Submitted Successfully!</h2>
          <p className="text-gray-700 mb-4 text-lg font-medium">Your vote has been encrypted and securely stored.</p>
          <div className="bg-white px-6 py-3 rounded-xl shadow-lg mb-6 inline-block border-2 border-green-200">
            <p className="text-gray-600 text-sm">Confirmation ID:</p>
            <code className="bg-green-50 px-4 py-2 rounded text-primary font-bold">{voterId}-{Date.now()}</code>
          </div>
          <p className="text-gray-500 text-sm mt-4 font-semibold">Redirecting in 3 seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="heading-1 text-4xl md:text-5xl glow-text">Voting Booth</h1>
          <p className="text-gray-700 text-lg font-semibold mt-2">Local Body Election 2026</p>
          <div className="mt-4">
            <span className="inline-block badge-info px-6 py-2 text-base">
              Voter ID: <span className="font-bold">{voterId}</span>
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-warning p-8 rounded-xl mb-12 shadow-lg">
          <h3 className="heading-3 text-warning mb-4 text-xl">Instructions</h3>
          <ul className="text-gray-700 space-y-2 list-disc list-inside text-lg">
            <li>Select your preferred candidate by clicking on their card</li>
            <li>Review your selection carefully</li>
            <li>Click "Submit Vote" to confirm and cast your vote</li>
            <li>Your vote is encrypted and completely anonymous</li>
            <li>You cannot change your vote once submitted</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="heading-2 mb-10 text-3xl md:text-4xl glow-text">Select Your Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CANDIDATES.map(candidate => (
              <CandidateCard
                key={candidate.id}
                {...candidate}
                isSelected={selectedCandidate === candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
              />
            ))}
          </div>
        </div>

        {selectedCandidate && (
          <div className="card p-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary shadow-2xl">
            <h3 className="heading-3 mb-6 text-2xl">Your Selection</h3>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="bg-primary text-white px-8 py-6 rounded-lg font-bold text-2xl">{selected?.symbol}</div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-600 text-sm font-bold uppercase mb-2">Selected Candidate:</p>
                <h4 className="heading-2 text-3xl mb-2 glow-text">{selected?.name}</h4>
                <p className="text-lg text-gray-700 font-semibold">{selected?.party}</p>
              </div>
              <div className="badge-success px-6 py-4 text-lg">Ready</div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {selectedCandidate && !showConfirmation && (
            <button
              onClick={() => setShowConfirmation(true)}
              className="btn-primary bg-gradient-to-r from-primary to-blue-700 text-lg px-8 py-4"
            >
              Confirm & Submit Vote
            </button>
          )}
          {!selectedCandidate && (
            <button
              disabled
              className="btn-primary opacity-50 cursor-not-allowed text-lg px-8 py-4"
            >
              Please Select a Candidate
            </button>
          )}
          <a href="/" className="btn-outline text-lg px-8 py-4 text-primary border-primary">
            ← Cancel
          </a>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="card max-w-md w-full p-10 shadow-2xl">
              <h3 className="heading-3 mb-6 text-2xl">Final Confirmation</h3>
              <p className="text-gray-700 mb-8 text-lg">
                You are about to cast your vote for:
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl mb-8 text-center border-2 border-primary/20">
                <div className="inline-block bg-primary text-white px-6 py-4 rounded-lg font-bold text-xl mb-4">{selected?.symbol}</div>
                <p className="text-xl font-bold text-gray-800 mb-2">{selected?.name}</p>
                <p className="text-gray-700 font-semibold">{selected?.party}</p>
              </div>
              <div className="space-y-3 mb-8 text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Your vote will be encrypted and stored securely</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Your vote is completely anonymous</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold mt-1">!</span>
                  <span className="font-bold">This action cannot be undone</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitVote}
                  disabled={isSubmitting}
                  className={`flex-1 btn-primary bg-gradient-to-r from-green-500 to-green-600 text-lg py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Yes, Submit Vote'}
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                  className="flex-1 btn-outline text-lg py-4 text-primary border-primary"
                >
                  ← Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
