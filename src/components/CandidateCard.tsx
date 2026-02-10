import { useState } from 'react'

interface CandidateCardProps {
  name: string
  party: string
  symbol: string
  votes?: number
  isSelected?: boolean
  onClick?: () => void
}

export default function CandidateCard({
  name,
  party,
  symbol,
  votes = 0,
  isSelected = false,
  onClick
}: CandidateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative card p-6 cursor-pointer overflow-hidden ${
        isSelected ? 'ring-4 ring-green-500 bg-gradient-to-br from-green-50 to-green-100' : ''
      }`}
    >
      

      <div className="relative z-10">
        <div className="text-center mb-4">
          <span className="inline-block bg-primary text-white px-4 py-2 rounded-full font-bold text-sm">{symbol}</span>
        </div>
        <h3 className="heading-3 text-center font-bold text-gray-800">{name}</h3>
        <p className="text-center text-gray-600 mb-4 font-semibold text-sm">{party}</p>

        {votes !== undefined && votes > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600 text-xs font-semibold">VOTES</p>
            <p className="text-center text-2xl font-bold text-primary">
              {votes.toLocaleString()}
            </p>
          </div>
        )}

        {isSelected && (
          <div className="mt-4 pt-4 border-t border-green-300 text-center">
            <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold">
              SELECTED
            </span>
          </div>
        )}
      </div>

      {isHovered && <div className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none" />}
    </div>
  )
}
