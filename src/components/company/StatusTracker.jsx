import { STATUSES } from '../../utils/constants'

export default function StatusTracker({ status, onStatusChange }) {
  const info = STATUSES[status]
  if (!info) return null

  return (
    <button
      onClick={onStatusChange}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/30 ${info.color}`}
      title="点击切换状态"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {info.label}
    </button>
  )
}
