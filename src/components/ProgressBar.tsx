interface ProgressBarProps {
  label: string
  votes: number
  percentage: number
  color?: string
}

export default function ProgressBar({
  label,
  votes,
  percentage,
  color = 'bg-blue-500'
}: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{votes.toLocaleString()} votes ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          {percentage > 5 && (
            <span className="text-white text-sm font-bold">{percentage.toFixed(0)}%</span>
          )}
        </div>
      </div>
    </div>
  )
}
