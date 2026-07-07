import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const STATUS_FLOW = {
  not_applied: 'applied',
  applied: 'interviewing',
  interviewing: 'get_offer',
  get_offer: 'interview_ended',
  interview_ended: 'not_applied',
}

export function useCompanies(user) {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  // 加载用户的公司列表
  useEffect(() => {
    if (!user) {
      setCompanies([])
      setLoading(false)
      return
    }

    setLoading(true)
    supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('加载数据失败:', error)
        else setCompanies(data || [])
        setLoading(false)
      })
  }, [user])

  const addCompany = useCallback(async (companyData) => {
    const newCompany = {
      company_name: companyData.companyName,
      position: companyData.position || '',
      industry: companyData.industry || '',
      salary: companyData.salary || '',
      level: companyData.level || 'B',
      status: 'not_applied',
      note: companyData.note || '',
      score: {
        salaryScore: null,
        growthScore: null,
        industryScore: null,
        riskScore: null,
        totalScore: null,
      },
      history: [],
    }

    const { data, error } = await supabase
      .from('companies')
      .insert(newCompany)
      .select()
      .single()

    if (error) {
      console.error('添加失败:', error)
      return null
    }

    setCompanies((prev) => [data, ...prev])
    return data
  }, [])

  const updateCompany = useCallback(async (id, updates) => {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('更新失败:', error)
      return
    }

    setCompanies((prev) => prev.map((c) => (c.id === id ? data : c)))
  }, [])

  const changeStatus = useCallback(async (id) => {
    const company = companies.find((c) => c.id === id)
    if (!company) return

    const newStatus = STATUS_FLOW[company.status] || company.status

    const { error } = await supabase
      .from('companies')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('状态更新失败:', error)
      return
    }

    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
  }, [companies])

  const deleteCompany = useCallback(async (id) => {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('删除失败:', error)
      return
    }

    setCompanies((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return {
    companies,
    loading,
    addCompany,
    updateCompany,
    changeStatus,
    deleteCompany,
  }
}
