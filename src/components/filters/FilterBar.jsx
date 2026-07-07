import { LEVELS } from '../../utils/constants'
import { STATUSES } from '../../utils/constants'

export default function FilterBar({ levelFilter, statusFilter, onLevelFilter, onStatusFilter }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onLevelFilter(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          !levelFilter
            ? 'bg-gray-800/70 text-white backdrop-blur-sm border border-white/20'
            : 'bg-white/40 text-gray-500 border border-white/50 backdrop-blur-sm hover:bg-white/60'
        }`}
      >
        全部
      </button>
      {Object.entries(LEVELS).map(([key, info]) => (
        <button
          key={key}
          onClick={() => onLevelFilter(key)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            levelFilter === key
              ? info.badgeClass
              : 'bg-white/40 text-gray-500 border border-white/50 backdrop-blur-sm hover:bg-white/60'
          }`}
        >
          {info.label}
        </button>
      ))}

      <span className="w-px h-5 bg-gray-300/30 mx-1" />

      {Object.entries(STATUSES).map(([key, info]) => (
        <button
          key={key}
          onClick={() => onStatusFilter(statusFilter === key ? null : key)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-sm border border-white/30 ${
            statusFilter === key
              ? info.color
              : 'bg-white/40 text-gray-400 border border-white/50 hover:bg-white/60'
          }`}
        >
          {info.label}
        </button>
      ))}
    </div>
  )
}
