export const LEVELS = {
  A: {
    label: 'A',
    title: "Fine, this one is actually worthy of you.",
    description: '值得投入更多准备时间，是你的目标机会。',
    color: 'teal',
    badgeClass: 'bg-jelly-teal text-jelly-teal border border-white/40',
    dotClass: 'bg-teal-400',
  },
  B: {
    label: 'B',
    title: "Not bad... worth a look.",
    description: '符合预期，是主要投递池。',
    color: 'amber',
    badgeClass: 'bg-jelly-amber text-jelly-amber border border-white/40',
    dotClass: 'bg-amber-400',
  },
  C: {
    label: 'C',
    title: "Think twice. Don't settle.",
    description: '用于测试市场或获取反馈。',
    color: 'violet',
    badgeClass: 'bg-jelly-violet text-jelly-violet border border-white/40',
    dotClass: 'bg-violet-400',
  },
}

export const STATUSES = {
  not_applied: { label: '未投递', next: 'applied', color: 'text-gray-400 bg-gray-100/60' },
  applied: { label: '已投递', next: 'interviewing', color: 'text-blue-600 bg-blue-50/60' },
  interviewing: { label: '进入面试', next: 'get_offer', color: 'text-purple-600 bg-purple-50/60' },
  get_offer: { label: 'Get Offer', next: 'interview_ended', color: 'text-emerald-600 bg-emerald-50/60' },
  interview_ended: { label: '面试结束', next: 'not_applied', color: 'text-gray-500 bg-gray-100/60' },
}

export const LEVEL_ORDER = ['A', 'B', 'C']
