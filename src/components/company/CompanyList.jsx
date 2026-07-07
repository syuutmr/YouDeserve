import { LEVEL_ORDER } from '../../utils/constants'
import { getSuggestion } from '../../utils/suggestions'
import CompanyCard from './CompanyCard'

const GROUP_CONFIG = {
  A: { bar: 'bg-teal-400/40' },
  B: { bar: 'bg-amber-400/40' },
  C: { bar: 'bg-violet-400/40' },
}

export default function CompanyList({ companies, onStatusChange, onDelete, onDoubleClick }) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🌱</p>
        <p className="text-secondary/60">还没有公司，点击右上角按钮添加你的第一家公司吧</p>
      </div>
    )
  }

  const grouped = {}
  LEVEL_ORDER.forEach((level) => {
    grouped[level] = companies.filter((c) => c.level === level)
  })

  return (
    <div className="space-y-10">
      {LEVEL_ORDER.map((level) => {
        const items = grouped[level]
        if (items.length === 0) return null
        const config = GROUP_CONFIG[level]
        const suggestion = getSuggestion(level)

        return (
          <div key={level}>
            <div className="flex items-center gap-4 mb-5">
              <div className={`h-px flex-1 ${config.bar}`} />
              <h2 className="text-sm font-medium text-secondary/50 flex-shrink-0 tracking-wide text-center max-w-xl leading-snug">
                {level} — {suggestion}
              </h2>
              <div className={`h-px flex-1 ${config.bar}`} />
            </div>
            <div className="space-y-4">
              {items.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onStatusChange={() => onStatusChange(company.id)}
                  onDelete={() => onDelete(company.id)}
                  onDoubleClick={onDoubleClick}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
