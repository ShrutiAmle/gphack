interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100'
  }[type]

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[type]

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }[type]

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded-lg flex items-center justify-between mb-4`}>
      <span className="flex items-center space-x-3">
        <span className="text-xl font-bold">{icon}</span>
        <span>{message}</span>
      </span>
      {onClose && (
        <button
          onClick={onClose}
          className={`text-xl font-bold cursor-pointer hover:opacity-70`}
        >
          ×
        </button>
      )}
    </div>
  )
}
