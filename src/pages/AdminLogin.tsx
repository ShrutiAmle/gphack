import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mfaEnabled: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setMessage('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock authentication (admin/admin or superadmin/admin)
    if ((formData.username === 'admin' || formData.username === 'superadmin') && formData.password === 'admin') {
      setMessage('Login successful! Redirecting to dashboard...')
      setTimeout(() => {
        navigate('/admin-dashboard')
      }, 1500)
    } else {
      setErrors(prev => ({
        ...prev,
        submit: 'Invalid username or password'
      }))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-1 text-3xl mb-2">Admin Portal</h1>
          <p className="text-gray-600">Secure election management dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          {/* Locked Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Messages */}
          {errors.submit && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {errors.submit}
            </div>
          )}

          {message && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter admin username"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                  errors.username
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-primary'
                }`}
                disabled={loading}
              />
              {errors.username && (
                <p className="text-red-600 text-xs mt-1 font-semibold">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                  errors.password
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-primary'
                }`}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>
              )}
            </div>

            {/* MFA Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mfa"
                name="mfaEnabled"
                checked={formData.mfaEnabled}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              <label htmlFor="mfa" className="ml-2 text-sm text-gray-600 cursor-pointer">
                Enable Multi-Factor Authentication
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-semibold text-lg"
            >
              {loading ? 'Authenticating...' : 'Login to Admin Panel'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700 space-y-1">
            <p><strong>Username:</strong> admin or superadmin</p>
            <p><strong>Password:</strong> admin</p>
            <p className="text-xs text-gray-600 mt-2 italic">For demonstration purposes only</p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg text-center text-xs text-gray-600">
            <p className="font-semibold mb-1 text-primary">Secure Connection</p>
            <p>This portal is protected by end-to-end encryption and audit logging</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
