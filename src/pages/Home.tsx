import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🗳️</div>
          <h1 className="heading-1 text-white mb-6">
            Secure E-Voting Platform
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transparent, secure, and accessible voting system for local body elections in India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/voter-login" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Cast Your Vote
            </Link>
            <Link to="/results" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              View Results
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="heading-3">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Military-grade encryption ensures your vote is completely secure and private
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="heading-3">Verified Voting</h3>
              <p className="text-gray-600">
                Multi-factor authentication and voter verification prevent fraud and ensure integrity
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="heading-3">Real-Time Results</h3>
              <p className="text-gray-600">
                Transparent, real-time vote counting with live result updates
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🕐</div>
              <h3 className="heading-3">24/7 Accessibility</h3>
              <p className="text-gray-600">
                Vote anytime, anywhere from any device with internet connection
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="heading-3">Inclusive Democracy</h3>
              <p className="text-gray-600">
                Empowers every citizen to participate in local body elections with ease
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="heading-3">Fast & Reliable</h3>
              <p className="text-gray-600">
                Lightning-fast voting process with 99.9% uptime guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="heading-3">Register</h3>
              <p className="text-gray-600">
                Sign up with your voter ID and email address
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="heading-3">Verify</h3>
              <p className="text-gray-600">
                Verify your identity using OTP authentication
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="heading-3">Vote</h3>
              <p className="text-gray-600">
                Select your preferred candidate and cast your vote
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="heading-3">Confirm</h3>
              <p className="text-gray-600">
                Receive voting confirmation certificate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-12">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="card p-8">
              <p className="text-4xl font-bold text-primary mb-2">2.5M+</p>
              <p className="text-gray-600">Registered Voters</p>
            </div>
            <div className="card p-8">
              <p className="text-4xl font-bold text-primary mb-2">850K+</p>
              <p className="text-gray-600">Votes Cast</p>
            </div>
            <div className="card p-8">
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-gray-600">Election Bodies</p>
            </div>
            <div className="card p-8">
              <p className="text-4xl font-bold text-primary mb-2">99.9%</p>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-white mb-6">Ready to Vote?</h2>
          <p className="text-lg mb-8">
            Your vote matters. Participate in shaping the future of your locality.
          </p>
          <Link to="/voter-login" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Cast Your Vote Now
          </Link>
        </div>
      </section>
    </div>
  )
}
