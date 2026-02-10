export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="heading-3 text-white mb-4">About Platform</h4>
            <p className="text-gray-400 text-sm">Secure and transparent e-voting platform for local body elections in India.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-3 text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="/results" className="text-gray-400 hover:text-white transition">Results</a></li>
              <li><a href="/voter-login" className="text-gray-400 hover:text-white transition">Login</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="heading-3 text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Secure Voting</span></li>
              <li><span className="text-gray-400">Transparent Results</span></li>
              <li><span className="text-gray-400">Real-time Updates</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-3 text-white mb-4">Support</h4>
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:support@evoting.in" className="hover:text-white transition">support@evoting.in</a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Helpline: <a href="tel:1800-EVote-1" className="hover:text-white transition">1800-EVOTE-1</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Secure E-Voting Platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
