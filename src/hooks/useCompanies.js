import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { generateId } from '../utils/helpers'

const STORAGE_KEY = 'you-deserve-companies'

const STATUS_FLOW = {
  not_applied: 'applied',
  applied: 'interviewing',
  interviewing: 'get_offer',
  get_offer: 'interview_ended',
  interview_ended: 'not_applied',
}

export function useCompanies() {
  const [companies, setCompanies] = useLocalStorage(STORAGE_KEY, [])

  const addCompany = useCallback((companyData) => {
    const now = new Date().toISOString()
    const newCompany = {
      id: generateId(),
      companyName: companyData.companyName,
      position: companyData.position || '',
      industry: companyData.industry || '',
      salary: companyData.salary || '',
      level: companyData.level || 'B',
      status: 'not_applied',
      note: companyData.note || '',
      createdAt: now,
      score: {
        salaryScore: null,
        growthScore: null,
        industryScore: null,
        riskScore: null,
        totalScore: null,
      },
      history: [],
      actionSuggestion: '',
    }
    setCompanies((prev) => [newCompany, ...prev])
    return newCompany
  }, [setCompanies])

  const updateCompany = useCallback((id, updates) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const updated = { ...c, ...updates }
        if (updates.level && updates.level !== c.level) {
          const historyEntry = {
            date: new Date().toISOString(),
            oldLevel: c.level,
            newLevel: updates.level,
            reason: '用户手动调整',
          }
          updated.history = [...(c.history || []), historyEntry]
        }
        return updated
      })
    )
  }, [setCompanies])

  const changeStatus = useCallback((id) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        return { ...c, status: STATUS_FLOW[c.status] || c.status }
      })
    )
  }, [setCompanies])

  const deleteCompany = useCallback((id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id))
  }, [setCompanies])

  return {
    companies,
    addCompany,
    updateCompany,
    changeStatus,
    deleteCompany,
  }
}
