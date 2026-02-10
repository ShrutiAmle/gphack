import { Link } from 'react-router-dom'
 
import AnimatedCounter from '../components/AnimatedCounter'
import HomeHero from '../assets/home-hero.svg'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2 items-center">
          <div className="text-left space-y-6">
            <h1 className="heading-1 text-4xl md:text-5xl lg:text-6xl">
              Secure E‑Voting for India
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Cast your vote digitally with bank‑grade security, transparent counting and a smooth experience designed for Indian local body elections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/voter-login" className="btn-primary text-lg px-8 py-3">
                Cast Your Vote
              </Link>
              <Link to="/results" className="btn-outline text-lg px-8 py-3">
                View Results
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-xl">
            <img
              src={HomeHero}
              alt="Voting illustration"
              className="w-full h-auto rounded-2xl shadow-xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-16 text-4xl">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { feature: 'Security', title: 'Bank-Grade Security', desc: 'Military-grade encryption ensures your vote is secure and private' },
              { feature: 'Verification', title: 'Verified Voting', desc: 'Multi-factor authentication and voter verification prevent fraud' },
              { feature: 'Transparency', title: 'Real-Time Results', desc: 'Transparent counting with live result updates' },
              { feature: 'Accessibility', title: '24/7 Accessibility', desc: 'Vote anytime, anywhere from any device' },
              { feature: 'Democracy', title: 'Inclusive Democracy', desc: 'Empowers every citizen to participate with ease' },
              { feature: 'Performance', title: 'Fast & Reliable', desc: 'Lightning-fast process with 99.9% uptime' },
            ].map((feature, idx) => (
              <div key={idx} className="card p-8">
                <div className="text-3xl font-bold text-primary mb-4">{feature.feature}</div>
                <h3 className="heading-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-16 text-4xl">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Register', desc: 'Sign up with your voter ID and email address' },
              { num: 2, title: 'Verify', desc: 'Verify your identity using OTP authentication' },
              { num: 3, title: 'Vote', desc: 'Select your preferred candidate and cast your vote' },
              { num: 4, title: 'Confirm', desc: 'Receive voting confirmation certificate' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  {step.num}
                </div>
                <h3 className="heading-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-16 text-4xl">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Registered Voters', value: 2500000, suffix: '+' },
              { label: 'Votes Cast', value: 850000, suffix: '+' },
              { label: 'Election Bodies', value: 500, suffix: '+' },
              { label: 'Uptime', value: 99.9, suffix: '%' },
            ].map((stat, idx) => (
              <div key={idx} className="card p-8 text-center">
                <div className="text-5xl font-bold text-primary mb-3">
                  <AnimatedCounter target={stat.value} duration={2000} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary via-blue-600 to-blue-700 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-white mb-6 text-4xl">Ready to Vote?</h2>
          <p className="text-xl mb-8">Your vote matters. Participate in shaping the future of your locality.</p>
          <Link to="/voter-login" className="inline-block btn-outline-hero text-lg px-8 py-4">
            Cast Your Vote Now
          </Link>
        </div>
      </section>

     
    </div>
  )
}
