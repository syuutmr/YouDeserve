import { formatDate } from '../../utils/helpers'
import RatingBadge from './RatingBadge'
import StatusTracker from './StatusTracker'

export default function CompanyCard({ company, onStatusChange, onDelete, onDoubleClick }) {
  return (
    <div className="card group" onDoubleClick={() => onDoubleClick?.(company)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-primary truncate">
            {company.company_name}
          </h3>
          {company.position && (
            <p className="text-sm text-secondary/70 mt-0.5">{company.position}</p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <RatingBadge level={company.level} />
          <StatusTracker status={company.status} onStatusChange={onStatusChange} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary/50 mb-3">
        <span>Ìí¼ÓÓÚ {formatDate(company.created_at)}</span>
        {company.industry && <span>¡¤ {company.industry}</span>}
        {company.salary && <span>¡¤ {company.salary}</span>}
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(company.id) }}
          className="text-xs text-secondary/30 hover:text-rose-400/70 transition-colors opacity-0 group-hover:opacity-100"
        >
          É¾³ý
        </button>
      </div>

      {company.note && (
        <p className="mt-3 text-xs text-secondary/50 bg-white/40 rounded-xl px-4 py-2.5 border border-white/40">
          {company.note}
        </p>
      )}
    </div>
  )
}
