import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ConfirmationReceipt {
  confirmationCode: string
  timestamp: string
  voterId: string
  constituency: string
  encryptedBallotHash: string
}

export default function VoteConfirmation() {
  const navigate = useNavigate()
  const [receipt] = useState<ConfirmationReceipt>({
    confirmationCode: 'VC-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
    timestamp: new Date().toLocaleString('en-IN'),
    voterId: 'V-2026001234',
    constituency: 'Ward 5, Local Body',
    encryptedBallotHash: 'EBH-' + Math.random().toString(36).substring(2, 14)
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Success Indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="heading-1 text-4xl mb-2 text-green-600">Vote Confirmed</h1>
          <p className="text-gray-600 text-lg">Your vote has been successfully recorded and encrypted</p>
        </div>

        {/* Receipt Card - Printable */}
        <div className="card p-8 mb-8 bg-white border-2 border-primary print:border-0" id="receipt">
          {/* Top Border */}
          <div className="h-2 bg-gradient-to-r from-primary to-accent mb-6"></div>

          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-primary mb-2">ELECTION RECEIPT</h2>
            <p className="text-sm text-gray-600">Secure Digital Voting Confirmation</p>
          </div>

          {/* Confirmation Code */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg mb-8 text-center">
            <p className="text-sm text-gray-600 font-semibold mb-2">Confirmation Code</p>
            <p className="text-3xl font-bold text-primary font-mono tracking-wider">{receipt.confirmationCode}</p>
            <p className="text-xs text-gray-500 mt-2">Keep this code for your records</p>
          </div>

          {/* Encrypted Vote */}
          <div className="space-y-6 mb-8">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-xs text-gray-600 font-semibold mb-1">YOUR VOTE (ENCRYPTED)</p>
              <p className="text-lg font-bold text-gray-800">Encrypted — Not Displayed</p>
              <p className="text-xs text-gray-500 mt-1">Ballot Hash: <span className="font-mono">{receipt.encryptedBallotHash}</span></p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-xs text-gray-600 font-semibold mb-1">VOTER ID</p>
              <p className="text-lg font-bold text-gray-800">{receipt.voterId}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-xs text-gray-600 font-semibold mb-1">CONSTITUENCY</p>
              <p className="text-lg font-bold text-gray-800">{receipt.constituency}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">DATE & TIME</p>
              <p className="text-lg font-bold text-gray-800">{receipt.timestamp}</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-sm text-blue-800 mb-8">
            <p className="font-semibold mb-1">Encryption Status: VERIFIED</p>
            <p>Your vote is encrypted using industry-standard 256-bit AES encryption</p>
          </div>

          {/* Footer Border */}
          <div className="h-2 bg-gradient-to-r from-accent to-primary"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handlePrint}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
          <button
            onClick={() => navigate('/results')}
            className="btn-outline flex-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            View Live Results
          </button>
        </div>

        {/* Additional Info */}
        <div className="card p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="heading-3 mb-4 text-primary">What Happens Next?</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold">1</span>
              <span>Your vote has been counted and encrypted in our secure database.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold">2</span>
              <span>Results will be published after the voting window closes.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold">3</span>
              <span>You can verify your vote using your confirmation code on the election website.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary font-bold">4</span>
              <span>The election results will include a full audit trail for transparency.</span>
            </li>
          </ol>
        </div>

        {/* Back Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Home
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body, html {
            background: white;
          }
        }
      `}</style>
    </div>
  )
}
