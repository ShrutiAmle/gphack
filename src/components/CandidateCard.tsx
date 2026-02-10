interface CandidateCardProps {
  id: string
  name: string
  party: string
  symbol: string
  votes?: number
  isSelected?: boolean
  onClick?: () => void
}

export default function CandidateCard({
  id,
  name,
  party,
  symbol,
  votes = 0,
  isSelected = false,
  onClick
}: CandidateCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isSelected
          ? 'ring-4 ring-green-500 bg-green-50'
          : 'hover:shadow-2xl'
      }`}
    >
      <div className="text-5xl text-center mb-4">{symbol}</div>
      <h3 className="heading-3 text-center">{name}</h3>
      <p className="text-center text-gray-600 mb-4 font-semibold">{party}</p>
      
      {votes !== undefined && votes > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">Votes Received</p>
          <p className="text-center text-2xl font-bold text-primary">{votes.toLocaleString()}</p>
        </div>
      )}

      {isSelected && (
        <div className="mt-4 pt-4 border-t border-green-200 text-center">
          <span className="badge-success">✓ Selected</span>
        </div>
      )}
    </div>
  )
}
