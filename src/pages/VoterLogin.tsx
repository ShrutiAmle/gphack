import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'

interface VoterLoginProps {
  onLogin: (voterId: string) => void
}

export default function VoterLogin({ onLogin }: VoterLoginProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState<'voter-id' | 'otp'>('voter-id')
  const [voterId, setVoterId] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')

  const validateVoterId = () => {
    if (!voterId.trim()) {
      setError('Please enter your voter ID')
      return false
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSendOtp = async () => {
    if (!validateVoterId()) return

    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      // Generate a mock OTP
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(mockOtp)
      console.log(`Mock OTP sent to ${email}: ${mockOtp}`)
      
      setStep('otp')
      setLoading(false)
    }, 1500)
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP')
      return
    }

    setLoading(true)
    setError('')

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === generatedOtp) {
        onLogin(voterId)
        navigate('/voting-booth')
      } else {
        setError('Invalid OTP. Please try again.')
      }
      setLoading(false)
    }, 1500)
  }

  const handleBackToVoterId = () => {
    setStep('voter-id')
    setOtp('')
    setGeneratedOtp('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Security Info */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="heading-2">Secure Voter Login</h1>
          <p className="text-gray-600 mt-2">Your identity is protected with military-grade encryption</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          {error && (
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError('')}
            />
          )}

          {step === 'voter-id' ? (
            <div className="space-y-6">
              <h2 className="heading-3">Enter Your Details</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Voter ID / EPIC Number
                </label>
                <input
                  type="text"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                  placeholder="e.g., AB123456789"
                  className="input-field"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can find this on your voter card
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Registered with election commission
                </p>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>📢 Demo Mode:</strong> Use any voter ID and enter the OTP shown in console after sending
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="heading-3">Verify OTP</h2>
              <p className="text-gray-600">
                Enter the 6-digit OTP sent to <strong>{email}</strong>
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="input-field text-center text-2xl tracking-widest"
                  disabled={loading}
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>

                <button
                  onClick={handleBackToVoterId}
                  disabled={loading}
                  className="w-full btn-outline"
                >
                  Back
                </button>
              </div>

              <div className="text-center text-gray-600 text-sm">
                <p>Demo OTP: <code className="bg-gray-100 px-2 py-1 rounded">{generatedOtp}</code></p>
                <p className="text-xs text-gray-500 mt-2">Check browser console for the OTP</p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              🔒 Your data is encrypted and secure. We follow all election commission guidelines.
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have your voter ID? 
            <a href="#" className="text-primary hover:underline ml-1">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
