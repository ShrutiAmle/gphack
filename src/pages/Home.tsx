import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import AnimatedCounter from '../components/AnimatedCounter'

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      // Scroll animations can be added here
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-blue-600 to-blue-700 text-white overflow-hidden flex items-center py-20">
        {/* Animated background circles */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="heading-1 text-white mb-6 glow-text text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Secure E-Voting Platform
          </h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            Transparent, secure, and accessible voting system for local body elections in India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
            <Link 
              to="/voter-login" 
              className="btn-outline-hero text-lg px-8 py-4"
            >
              Cast Your Vote
            </Link>
            <Link 
              to="/results" 
              className="btn-primary text-lg px-8 py-4"
            >
              View Results
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-20 text-4xl glow-text">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { feature: 'Security', title: 'Bank-Grade Security', desc: 'Military-grade encryption ensures your vote is completely secure and private', delay: '0s' },
              { feature: 'Verification', title: 'Verified Voting', desc: 'Multi-factor authentication and voter verification prevent fraud and ensure integrity', delay: '100ms' },
              { feature: 'Transparency', title: 'Real-Time Results', desc: 'Transparent, real-time vote counting with live result updates', delay: '200ms' },
              { feature: 'Accessibility', title: '24/7 Accessibility', desc: 'Vote anytime, anywhere from any device with internet connection', delay: '300ms' },
              { feature: 'Democracy', title: 'Inclusive Democracy', desc: 'Empowers every citizen to participate in local body elections with ease', delay: '400ms' },
              { feature: 'Performance', title: 'Fast & Reliable', desc: 'Lightning-fast voting process with 99.9% uptime guarantee', delay: '500ms' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card p-8 hover:shadow-3xl transition-all duration-500 group cursor-pointer hover:-translate-y-2 animate-in fade-in slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="text-3xl font-bold text-primary mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {feature.feature}
                </div>
                <h3 className="heading-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-600 line-clamp-3">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-white via-indigo-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-20 text-4xl glow-text">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" style={{ opacity: 0.3 }} />

            {[
              { num: 1, title: 'Register', desc: 'Sign up with your voter ID and email address' },
              { num: 2, title: 'Verify', desc: 'Verify your identity using OTP authentication' },
              { num: 3, title: 'Vote', desc: 'Select your preferred candidate and cast your vote' },
              { num: 4, title: 'Confirm', desc: 'Receive voting confirmation certificate' },
            ].map((step, idx) => (
              <div key={idx} className="text-center animate-in fade-in slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg transform hover:scale-125 transition-all duration-300 hover:rotate-360 relative z-10">
                  {step.num}
                </div>
                <h3 className="heading-3 hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Enhanced with Counters */}
      <section className="py-32 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-20 text-4xl glow-text">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Registered Voters', value: 2500000, suffix: '+' },
              { label: 'Votes Cast', value: 850000, suffix: '+' },
              { label: 'Election Bodies', value: 500, suffix: '+' },
              { label: 'Uptime', value: 99.9, suffix: '%' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="card p-8 text-center group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br hover:from-primary/5 hover:to-blue-500/5 animate-in fade-in slide-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="text-5xl font-bold text-primary mb-3 group-hover:text-primary">
                  <AnimatedCounter target={stat.value} duration={2000} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-32 bg-gradient-to-r from-primary via-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="heading-2 text-white mb-6 text-4xl glow-text animate-in fade-in slide-up duration-500">
            Ready to Vote?
          </h2>
          <p className="text-xl mb-8 font-light animate-in fade-in slide-up duration-500 delay-200">
            Your vote matters. Participate in shaping the future of your locality.
          </p>
          <Link
            to="/voter-login"
            className="inline-block btn-primary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 transform hover:scale-110 transition-all duration-300 animate-in fade-in slide-up duration-500 delay-400"
          >
            Cast Your Vote Now
          </Link>
        </div>
      </section>
    </div>
  )
}
