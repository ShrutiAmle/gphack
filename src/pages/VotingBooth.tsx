import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CandidateCard from '../components/CandidateCard'
import Alert from '../components/Alert'

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
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', symbol: '🌳' },
  { id: '2', name: 'Priya Singh', party: 'Bharatiya Janata Party', symbol: '🪷' },
  { id: '3', name: 'Amit Verma', party: 'Aam Aadmi Party', symbol: '🧹' },
  { id: '4', name: 'Zara Khan', party: 'Samajwadi Party', symbol: '🔱' },
  { id: '5', name: 'NOTA', party: 'None of the Above', symbol: '❌' },
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
        navigate('/')
      }, 2000)
    }, 2000)
  }

  if (successMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">✓</div>
          <h2 className="heading-2 text-green-700 mb-4">Vote Submitted Successfully!</h2>
          <p className="text-gray-700 mb-2">Your vote has been encrypted and securely stored.</p>
          <p className="text-gray-600 text-sm">Confirmation ID: <code className="bg-white px-2 py-1 rounded">{voterId}-{Date.now()}</code></p>
          <p className="text-gray-500 text-sm mt-4">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🗳️</div>
          <h1 className="heading-1">Voting Booth</h1>
          <p className="text-gray-600 text-lg">Local Body Election 2026</p>
          <p className="text-gray-600 mt-2">
            <span className="badge-info">Voter ID: {voterId}</span>
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border-l-4 border-warning p-6 rounded-lg mb-8">
          <h3 className="heading-3 text-warning mb-2">📋 Instructions</h3>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>Select your preferred candidate by clicking on their card</li>
            <li>Review your selection carefully</li>
            <li>Click "Submit Vote" to confirm and cast your vote</li>
            <li>Your vote is encrypted and completely anonymous</li>
            <li>You cannot change your vote once submitted</li>
          </ul>
        </div>

        {/* Candidates Grid */}
        <div className="mb-12">
          <h2 className="heading-2 mb-8">Select Your Candidate</h2>
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

        {/* Selection Summary */}
        {selectedCandidate && (
          <div className="card p-8 mb-8 bg-blue-50 border-2 border-primary">
            <h3 className="heading-3 mb-4">📌 Your Selection</h3>
            <div className="flex items-center space-x-6">
              <div className="text-6xl">{selected?.symbol}</div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">Selected Candidate:</p>
                <h4 className="heading-3 mb-2">{selected?.name}</h4>
                <p className="text-gray-600">{selected?.party}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {selectedCandidate && !showConfirmation && (
            <button
              onClick={() => setShowConfirmation(true)}
              className="btn-primary"
            >
              Confirm & Submit Vote
            </button>
          )}
          {!selectedCandidate && (
            <button
              disabled
              className="btn-primary opacity-50 cursor-not-allowed"
            >
              Please Select a Candidate
            </button>
          )}
          <a href="/" className="btn-outline">
            Cancel
          </a>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card max-w-sm w-full p-8">
              <h3 className="heading-3 mb-4">⚠️ Final Confirmation</h3>
              <p className="text-gray-700 mb-6">
                You are about to cast your vote for:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
                <p className="text-5xl mb-3">{selected?.symbol}</p>
                <p className="text-lg font-bold text-gray-800">{selected?.name}</p>
                <p className="text-gray-600">{selected?.party}</p>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                ✓ Your vote will be encrypted and stored securely<br/>
                ✓ Your vote is completely anonymous<br/>
                ✓ This action cannot be undone
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitVote}
                  disabled={isSubmitting}
                  className={`flex-1 btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Yes, Submit Vote'}
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
