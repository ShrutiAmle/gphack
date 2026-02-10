export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-white mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="heading-3 text-white mb-4">VotingHub</h4>
            <p className="text-white/80 text-sm">A secure, auditable, and accessible e-voting platform for local body elections.</p>
            <div className="mt-4">
              <a href="/voter-login" className="btn-outline-hero inline-block px-4 py-2 mr-2">Login</a>
              <a href="/results" className="btn-primary inline-block px-4 py-2">Results</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="heading-3 text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-white/80 hover:text-white transition">Home</a></li>
              <li><a href="/voter-login" className="text-white/80 hover:text-white transition">Voter Login</a></li>
              <li><a href="/voting-booth" className="text-white/80 hover:text-white transition">Voting Booth</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="heading-3 text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Security</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-3 text-white mb-4">Get Support</h4>
            <p className="text-white/80 text-sm mb-2">Email: <a href="mailto:support@evoting.in" className="underline">support@evoting.in</a></p>
            <p className="text-white/80 text-sm">Helpline: <a href="tel:1800-EVote-1" className="underline">1800-EVOTE-1</a></p>
            <div className="mt-4 text-sm text-white/80">&copy; {currentYear} VotingHub. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
