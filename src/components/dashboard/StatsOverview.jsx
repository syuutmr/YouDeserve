import { LEVELS } from '../../utils/constants'

function StatCard({ label, count, icon, badgeClass, isOffer }) {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-2 mb-3">
        {isOffer ? (
          <span className="text-lg" role="img" aria-label="envelope">💌</span>
        ) : (
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${badgeClass}`}>
            {label}
          </span>
        )}
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-primary">{count}</p>
    </div>
  )
}

export default function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {Object.entries(LEVELS).map(([key, info]) => (
        <StatCard
          key={key}
          label={info.label}
          count={stats[key]}
          badgeClass={info.badgeClass}
        />
      ))}
      <StatCard
        label=""
        count={stats.offer}
        icon="💌"
        badgeClass="bg-rose-200/60 text-rose-700"
        isOffer
      />
    </div>
  )
}
