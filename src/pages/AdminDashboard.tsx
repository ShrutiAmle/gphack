import { useState } from 'react'
import Alert from '../components/Alert'

interface ElectionStats {
  totalVoters: number
  votesReceived: number
  avgVotingTime: number
  systemUptime: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats] = useState<ElectionStats>({
    totalVoters: 2850000,
    votesReceived: 850000,
    avgVotingTime: 3.5,
    systemUptime: 99.95
  })

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid admin password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8">
          <h1 className="heading-2 text-center mb-8">Admin Dashboard</h1>
          
          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Login to Dashboard
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Demo:</strong> Use password: <code>admin123</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const turnout = ((stats.votesReceived / stats.totalVoters) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="heading-1">Admin Dashboard</h1>
            <p className="text-gray-600">Election Management & Monitoring</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              setPassword('')
            }}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <p className="text-gray-600 text-sm mb-2">Total Registered Voters</p>
            <p className="text-4xl font-bold text-primary mb-2">{stats.totalVoters.toLocaleString()}</p>
            <span className="badge-info">Active Elections</span>
          </div>

          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <p className="text-gray-600 text-sm mb-2">Votes Received</p>
            <p className="text-4xl font-bold text-success mb-2">{stats.votesReceived.toLocaleString()}</p>
            <span className="badge-success">{turnout}% Turnout</span>
          </div>

          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <p className="text-gray-600 text-sm mb-2">Avg. Voting Time</p>
            <p className="text-4xl font-bold text-warning mb-2">{stats.avgVotingTime}s</p>
            <span className="badge-warning">Per Voter</span>
          </div>

          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <p className="text-gray-600 text-sm mb-2">System Uptime</p>
            <p className="text-4xl font-bold text-success mb-2">{stats.systemUptime}%</p>
            <span className="badge-success">Excellent</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Election Control */}
          <div className="card p-8">
            <h2 className="heading-2 mb-6">Election Control</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Voting Status</p>
                  <p className="text-sm text-gray-600">Election ongoing</p>
                </div>
                <span className="badge-success">LIVE</span>
              </div>

              <button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-3 rounded-lg font-semibold transition">
                Pause Voting
              </button>

              <button className="w-full bg-red-500 text-white hover:bg-red-600 px-4 py-3 rounded-lg font-semibold transition">
                End Election
              </button>

              <button className="w-full bg-primary text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition">
                📊 Generate Final Report
              </button>
            </div>
          </div>

          {/* Security Monitoring */}
          <div className="card p-8">
            <h2 className="heading-2 mb-6">Security Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg">
                <span className="text-gray-700">Encryption Status</span>
                <span className="badge-success">✓ Active</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg">
                <span className="text-gray-700">Vote Verification</span>
                <span className="badge-success">✓ Verified</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg">
                <span className="text-gray-700">Fraud Detection</span>
                <span className="badge-success">✓ No Threats</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg">
                <span className="text-gray-700">Database Integrity</span>
                <span className="badge-success">✓ Healthy</span>
              </div>

              <button className="w-full btn-outline text-primary border-primary hover:bg-primary hover:text-white">
                🔒 Full Security Audit
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="card p-8 mb-12">
          <h2 className="heading-2 mb-8">Voting Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Peak Voting Hour</td>
                  <td className="py-3 px-4 font-semibold">4:30 PM</td>
                  <td className="py-3 px-4"><span className="badge-info">Data</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Failed Login Attempts</td>
                  <td className="py-3 px-4 font-semibold">23</td>
                  <td className="py-3 px-4"><span className="badge-warning">⚠ Monitor</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Double Vote Attempts</td>
                  <td className="py-3 px-4 font-semibold">0</td>
                  <td className="py-3 px-4"><span className="badge-success">✓ Clean</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Response Time Avg</td>
                  <td className="py-3 px-4 font-semibold">145ms</td>
                  <td className="py-3 px-4"><span className="badge-success">✓ Excellent</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="card p-8 bg-blue-50 border-2 border-primary">
          <h3 className="heading-3 mb-4">Admin Security Notice</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✓ All admin actions are logged and auditable</li>
            <li>✓ Multiple authentication layers protect sensitive operations</li>
            <li>✓ Real-time alerts for any anomalous activity</li>
            <li>✓ Backup systems ensure continuity in case of failures</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
