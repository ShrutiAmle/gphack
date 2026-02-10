import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuditLog {
  id: number
  timestamp: string
  user: string
  action: string
  module: string
  details: string
  status: 'success' | 'warning' | 'error' | 'info'
}

export default function AuditLogs() {
  const navigate = useNavigate()
  const [filterAction, setFilterAction] = useState('')
  const [filterModule, setFilterModule] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const auditLogs: AuditLog[] = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:45',
      user: 'admin@evoting.gov',
      action: 'Election Status Changed',
      module: 'Election Management',
      details: 'Election status changed from scheduled to ongoing',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:15:23',
      user: 'superadmin@evoting.gov',
      action: 'Candidate Added',
      module: 'Candidate Management',
      details: 'New candidate "Indian National Congress (INC)" registered',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-15 13:45:12',
      user: 'admin@evoting.gov',
      action: 'Failed Login Attempt',
      module: 'Authentication',
      details: 'Failed login attempt from IP 192.168.1.100',
      status: 'warning'
    },
    {
      id: 4,
      timestamp: '2024-01-15 12:30:56',
      user: 'voter-system@evoting.gov',
      action: 'Vote Cast',
      module: 'Voting',
      details: 'Voter V-2026001001 cast vote successfully',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-01-15 11:22:34',
      user: 'superadmin@evoting.gov',
      action: 'Database Backup',
      module: 'System',
      details: 'Automated backup of voting database completed',
      status: 'success'
    },
    {
      id: 6,
      timestamp: '2024-01-15 10:15:09',
      user: 'admin@evoting.gov',
      action: 'Permission Changed',
      module: 'Access Control',
      details: 'User permissions updated for election officer role',
      status: 'info'
    },
    {
      id: 7,
      timestamp: '2024-01-15 09:45:23',
      user: 'voter-system@evoting.gov',
      action: 'Vote Cast',
      module: 'Voting',
      details: 'Voter V-2026001003 cast vote successfully',
      status: 'success'
    },
    {
      id: 8,
      timestamp: '2024-01-15 09:20:15',
      user: 'admin@evoting.gov',
      action: 'Configuration Updated',
      module: 'System Settings',
      details: 'Election voting window extended to 6:00 PM',
      status: 'success'
    },
    {
      id: 9,
      timestamp: '2024-01-15 08:30:42',
      user: 'admin@evoting.gov',
      action: 'System Started',
      module: 'System',
      details: 'Election system initialized and all checks passed',
      status: 'success'
    },
    {
      id: 10,
      timestamp: '2024-01-14 17:45:22',
      user: 'admin@evoting.gov',
      action: 'Voter Cancelled',
      module: 'Voter Management',
      details: 'Voter registration V-2026001005 marked as cancelled',
      status: 'warning'
    }
  ]

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      if (filterAction && !log.action.toLowerCase().includes(filterAction.toLowerCase())) return false
      if (filterModule && log.module !== filterModule) return false
      if (filterStatus && log.status !== filterStatus) return false
      return true
    })
  }, [filterAction, filterModule, filterStatus])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
      case 'warning':
        return <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      case 'error':
        return <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
      default:
        return <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zm2 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" /></svg>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1 text-4xl mb-2">Audit Logs</h1>
          <p className="text-gray-600">System activity and compliance tracking</p>
        </div>

        {/* Filter Card */}
        <div className="card p-6 mb-8">
          <h3 className="heading-3 mb-4 text-lg">Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Action
              </label>
              <input
                type="text"
                placeholder="Search by action..."
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Module
              </label>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="">All Modules</option>
                <option value="Authentication">Authentication</option>
                <option value="Voting">Voting</option>
                <option value="Election Management">Election Management</option>
                <option value="Candidate Management">Candidate Management</option>
                <option value="Voter Management">Voter Management</option>
                <option value="System">System</option>
                <option value="Access Control">Access Control</option>
                <option value="System Settings">System Settings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>
          {(filterAction || filterModule || filterStatus) && (
            <button
              onClick={() => {
                setFilterAction('')
                setFilterModule('')
                setFilterStatus('')
              }}
              className="mt-4 text-primary hover:text-primary/80 font-semibold text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 font-semibold">
            Showing {filteredLogs.length} of {auditLogs.length} entries
          </p>
          <button className="btn-outline px-4 py-2 inline-flex items-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Logs Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Timestamp</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">User</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Module</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-xs font-mono text-gray-600">{log.timestamp}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{log.user}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{log.action}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                          {log.module}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="font-semibold text-gray-700 text-xs uppercase">
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{log.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                      No audit logs match the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
          <div className="card p-6 text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Entries</p>
            <p className="text-3xl font-bold text-primary">{auditLogs.length}</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">Success</p>
            <p className="text-3xl font-bold text-green-600">
              {auditLogs.filter(l => l.status === 'success').length}
            </p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">Warnings</p>
            <p className="text-3xl font-bold text-yellow-600">
              {auditLogs.filter(l => l.status === 'warning').length}
            </p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">Errors</p>
            <p className="text-3xl font-bold text-red-600">
              {auditLogs.filter(l => l.status === 'error').length}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/election-management')}
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Election Management
          </button>
        </div>
      </div>
    </div>
  )
}
