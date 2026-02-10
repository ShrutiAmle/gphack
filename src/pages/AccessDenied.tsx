import { useNavigate } from 'react-router-dom'

export default function AccessDenied() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h2.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2.586a1 1 0 01-.707-.293l-5.414-5.414a1 1 0 01-.293-.707V9a2 2 0 012-2h2.586a1 1 0 01.707.293l5.414 5.414z" />
            </svg>
          </div>
          <h1 className="heading-1 text-5xl font-bold text-red-600 mb-2">403</h1>
          <h2 className="heading-2 text-2xl mb-4">Access Denied</h2>
        </div>

        {/* Message */}
        <div className="card p-8 mb-8">
          <p className="text-gray-700 mb-4">
            You do not have permission to access this resource. This area is restricted to authorized users only.
          </p>
          <p className="text-gray-600 text-sm mb-4">
            If you believe this is an error, please contact the election administration support team.
          </p>

          {/* Reason List */}
          <div className="bg-red-50 rounded-lg p-4 text-left my-6">
            <p className="text-sm font-semibold text-red-800 mb-3">Common reasons for access denial:</p>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-start space-x-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span>Your account doesn't have the required permissions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span>You are not logged in as an administrator</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span>Your voting session has already been completed</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span>Your access credentials have expired</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 text-left mb-6">
            <p className="text-sm font-semibold text-blue-800 mb-2">Need Help?</p>
            <p className="text-sm text-blue-700">Support Hotline: 1800-EVOTE-1</p>
            <p className="text-sm text-blue-700">Email: support@evoting.gov</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" />
            </svg>
            Return to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn-outline px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-xs text-gray-600">
          <p className="font-semibold mb-1">Security Notice</p>
          <p>This access denial attempt has been logged and will be reviewed by administrators.</p>
        </div>
      </div>
    </div>
  )
}
