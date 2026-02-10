import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ElectionConfig {
  status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
  startTime: string
  endTime: string
  totalSeats: number
  registeredVoters: number
  expectedTurnout: number
  notifications: boolean
}

export default function ElectionManagement() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<ElectionConfig>({
    status: 'ongoing',
    startTime: '2024-01-15 08:00',
    endTime: '2024-01-15 17:00',
    totalSeats: 50,
    registeredVoters: 2500,
    expectedTurnout: 75,
    notifications: true
  })

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(config)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name.includes('Time') || name.includes('Turnout') ? value : isNaN(Number(value)) ? value : Number(value)
    }))
  }

  const handleSave = () => {
    setConfig(formData)
    setEditMode(false)
    setMessage('Election configuration updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData(config)
    setEditMode(false)
  }

  const toggleElection = (newStatus: string) => {
    setConfig(prev => ({
      ...prev,
      status: newStatus as 'scheduled' | 'ongoing' | 'paused' | 'completed'
    }))
    setMessage(`Election ${newStatus}!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gray-100 text-gray-800'
      case 'ongoing':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1 text-4xl mb-2">Election Management</h1>
          <p className="text-gray-600">Configure and manage election parameters</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-semibold">
            {message}
          </div>
        )}

        {/* Status Card */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="heading-2 text-2xl mb-2">Election Status</h2>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(config.status)}`}>
                {config.status.charAt(0).toUpperCase() + config.status.slice(1)}
              </span>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              {config.status !== 'ongoing' && (
                <button
                  onClick={() => toggleElection('ongoing')}
                  className="btn-primary px-6 py-2"
                >
                  Start Election
                </button>
              )}
              {config.status === 'ongoing' && (
                <button
                  onClick={() => toggleElection('paused')}
                  className="btn-outline px-6 py-2"
                >
                  Pause
                </button>
              )}
              {config.status === 'ongoing' && (
                <button
                  onClick={() => toggleElection('completed')}
                  className="btn-outline px-6 py-2"
                >
                  End Election
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">Total Seats</p>
              <p className="text-2xl font-bold text-primary">{config.totalSeats}</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">Registered Voters</p>
              <p className="text-2xl font-bold text-accent">{config.registeredVoters.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">Expected Turnout</p>
              <p className="text-2xl font-bold text-green-700">{config.expectedTurnout}%</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">Voting Window</p>
              <p className="text-sm font-bold text-blue-900">8 AM - 5 PM</p>
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-2 text-2xl">Configuration</h2>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="btn-outline px-6 py-2 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn-primary px-6 py-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-outline px-6 py-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Election Start Time
              </label>
              {editMode ? (
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{config.startTime}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Election End Time
              </label>
              {editMode ? (
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{config.endTime}</p>
              )}
            </div>

            {/* Total Seats */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Seats Available
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{config.totalSeats}</p>
              )}
            </div>

            {/* Registered Voters */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registered Voters
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="registeredVoters"
                  value={formData.registeredVoters}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{config.registeredVoters.toLocaleString()}</p>
              )}
            </div>

            {/* Expected Turnout */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Turnout (%)
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="expectedTurnout"
                  value={formData.expectedTurnout}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{config.expectedTurnout}%</p>
              )}
            </div>

            {/* Notifications */}
            {editMode && (
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="notifications" className="ml-3 text-sm font-semibold text-gray-700 cursor-pointer">
                  Enable notifications for election events
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Management Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => navigate('/admin/management')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>
            <h3 className="heading-3 text-lg mb-2">Candidate Management</h3>
            <p className="text-gray-600 text-sm">Add, edit, and manage election candidates</p>
          </button>

          <button
            onClick={() => navigate('/admin/audit-logs')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="heading-3 text-lg mb-2">Audit Logs</h3>
            <p className="text-gray-600 text-sm">View system activity and compliance logs</p>
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
