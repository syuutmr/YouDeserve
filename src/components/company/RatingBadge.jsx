import { LEVELS } from '../../utils/constants'

export default function RatingBadge({ level }) {
  const info = LEVELS[level]
  if (!info) return null

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${info.badgeClass}`}>
      {info.label}
    </span>
  )
}
