import { useState, useMemo } from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/dashboard/Hero'
import SignInPage from './components/auth/SignInPage'
import StatsOverview from './components/dashboard/StatsOverview'
import CompanyList from './components/company/CompanyList'
import SearchBar from './components/filters/SearchBar'
import FilterBar from './components/filters/FilterBar'
import AddCompanyModal from './components/modal/AddCompanyModal'
import { useCompanies } from './hooks/useCompanies'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { user, isSignedIn, signIn, signOut } = useAuth()
  const { companies, addCompany, updateCompany, changeStatus, deleteCompany } = useCompanies()
  const [page, setPage] = useState(() => isSignedIn ? 'dashboard' : 'hero')
  const [showModal, setShowModal] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (search && !c.companyName.toLowerCase().includes(search.toLowerCase())) return false
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
  }

  const handleEditCompany = (data) => {
    if (data.id) {
      updateCompany(data.id, {
        companyName: data.companyName,
        position: data.position,
        industry: data.industry,
        salary: data.salary,
        level: data.level,
        note: data.note,
      })
    }
    closeModal()
  }

  const handleSignIn = (name) => {
    signIn(name)
    setPage('dashboard')
  }

  const handleSignOut = () => {
    signOut()
    setPage('hero')
  }

  // ── Hero ──
  if (page === 'hero') {
    return (
      <Layout>
        <Hero onStart={() => setPage('signin')} />
      </Layout>
    )
  }

  // ── Sign In ──
  if (page === 'signin') {
    return (
      <Layout>
        <div className="animate-slide-up-fade">
          <SignInPage onSignIn={handleSignIn} />
        </div>
      </Layout>
    )
  }

  // ── Dashboard ──
  return (
    <Layout>
      <div className="animate-slide-up-fade">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-primary">
              You deserve.
            </h1>
            <p className="text-sm text-secondary/50 mt-0.5 font-handwriting">
              ✦ {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="text-xs text-secondary/30 hover:text-rose-400/70 transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={openAddModal}
              className="btn-primary text-sm px-6 py-2.5"
            >
              + Add Company
            </button>
          </div>
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

        <CompanyList
          companies={filteredCompanies}
          onStatusChange={changeStatus}
          onDelete={deleteCompany}
          onDoubleClick={openEditModal}
        />
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
