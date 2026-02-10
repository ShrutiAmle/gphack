import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-red-500 mb-6">404</div>
        <h1 className="heading-1 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/results" className="btn-outline">
            View Results
          </Link>
        </div>
      </div>
    </div>
  )
}
