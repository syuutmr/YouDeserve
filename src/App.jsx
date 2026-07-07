import { useState, useMemo } from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/dashboard/Hero'
import StatsOverview from './components/dashboard/StatsOverview'
import CompanyList from './components/company/CompanyList'
import SearchBar from './components/filters/SearchBar'
import FilterBar from './components/filters/FilterBar'
import AddCompanyModal from './components/modal/AddCompanyModal'
import SignInPage from './components/auth/SignInPage'
import { useAuth } from './hooks/useAuth'
import { useCompanies } from './hooks/useCompanies'

export default function App() {
  const { user, loading, isSignedIn, signIn, signUp, signOut } = useAuth()
  const { companies, loading: companiesLoading, addCompany, updateCompany, changeStatus, deleteCompany } = useCompanies(user)

  const [showDashboard, setShowDashboard] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (search && !c.company_name.toLowerCase().includes(search.toLowerCase())) return false
      if (levelFilter && c.level !== levelFilter) return false
      if (statusFilter && c.status !== statusFilter) return false
      return true
    })
  }, [companies, search, levelFilter, statusFilter])

  const stats = useMemo(() => ({
    A: companies.filter((c) => c.level === 'A').length,
    B: companies.filter((c) => c.level === 'B').length,
    C: companies.filter((c) => c.level === 'C').length,
    offer: companies.filter((c) => c.status === 'get_offer').length,
  }), [companies])

  const openAddModal = () => {
    setEditingCompany(null)
    setShowModal(true)
  }

  const openEditModal = (company) => {
    setEditingCompany(company)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCompany(null)
  }

  const handleAddCompany = (data) => {
    addCompany(data)
    closeModal()
    setShowDashboard(true)
  }

  const handleEditCompany = (data) => {
    if (data.id) {
      updateCompany(data.id, {
        company_name: data.companyName,
        position: data.position,
        industry: data.industry,
        salary: data.salary,
        level: data.level,
        note: data.note,
      })
    }
    closeModal()
  }

  // 加载中
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-secondary/50">Loading...</div>
        </div>
      </Layout>
    )
  }

  // 未登录
  if (!isSignedIn) {
    return (
      <Layout>
        <SignInPage onSignIn={signIn} onSignUp={signUp} />
      </Layout>
    )
  }

  // 已登录但没有公司
  if (!showDashboard && companies.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-end gap-4 mb-4">
          <span className="text-sm text-secondary/50">{user.email}</span>
          <button onClick={signOut} className="text-xs text-secondary/30 hover:text-rose-400/70 transition-colors">
            Sign Out
          </button>
        </div>
        <Hero onStart={() => setShowDashboard(true)} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex items-center justify-end gap-4 mb-4">
        <span className="text-sm text-secondary/50">{user.email}</span>
        <button onClick={signOut} className="text-xs text-secondary/30 hover:text-rose-400/70 transition-colors">
          Sign Out
        </button>
      </div>

      <div className="animate-slide-up-fade">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-primary">
              You deserve.
            </h1>
            <p className="text-sm text-secondary/60 mt-0.5 font-handwriting">
              Filter out the noise. Find what you deserve.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="btn-primary text-sm px-6 py-2.5"
          >
            + Add Company
          </button>
        </div>

        <StatsOverview stats={stats} />

        <div className="space-y-3 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            levelFilter={levelFilter}
            statusFilter={statusFilter}
            onLevelFilter={setLevelFilter}
            onStatusFilter={setStatusFilter}
          />
        </div>

        {companiesLoading ? (
          <div className="text-center py-20 text-secondary/50">Loading...</div>
        ) : (
          <CompanyList
            companies={filteredCompanies}
            onStatusChange={changeStatus}
            onDelete={deleteCompany}
            onDoubleClick={openEditModal}
          />
        )}
      </div>

      {showModal && (
        <AddCompanyModal
          onClose={closeModal}
          onSave={editingCompany ? handleEditCompany : handleAddCompany}
          editCompany={editingCompany}
        />
      )}
    </Layout>
  )
}
