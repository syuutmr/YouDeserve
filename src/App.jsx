import { useState, useMemo, useRef, useEffect } from "react";
import Layout from "./components/layout/Layout";
import Hero from "./components/dashboard/Hero";
import StatsOverview from "./components/dashboard/StatsOverview";
import CompanyList from "./components/company/CompanyList";
import SearchBar from "./components/filters/SearchBar";
import FilterBar from "./components/filters/FilterBar";
import AddCompanyModal from "./components/modal/AddCompanyModal";
import SignInPage from "./components/auth/SignInPage";
import { useAuth } from "./hooks/useAuth";
import { useCompanies } from "./hooks/useCompanies";

function ProfileCard({ user, nickname, onUpdateNickname, onClose }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(nickname);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = async () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== nickname) {
      await onUpdateNickname(trimmed);
    }
    setEditing(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-10 z-50 w-64 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-5 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-400/30 flex items-center justify-center text-emerald-600 font-bold text-lg">
            {(nickname || user.email)[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") {
                    setEditValue(nickname);
                    setEditing(false);
                  }
                }}
                className="w-full px-2 py-1 bg-white/80 border border-emerald-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            ) : (
              <p
                className="text-sm font-medium text-primary truncate cursor-pointer hover:text-emerald-600 transition-colors"
                title="Double-click to edit nickname"
                onDoubleClick={() => {
                  setEditValue(nickname);
                  setEditing(true);
                }}
              >
                {nickname || "Set a nickname"}
              </p>
            )}
          </div>
        </div>
        <div className="text-xs text-secondary/50 truncate">{user.email}</div>
        <div className="mt-3 pt-3 border-t border-white/50 text-[11px] text-secondary/40">
          {editing ? "Press Enter to save" : "Double-click nickname to edit"}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const {
    user,
    loading,
    isSignedIn,
    nickname,
    signIn,
    signUp,
    signOut,
    updateNickname,
  } = useAuth();
  const {
    companies,
    loading: companiesLoading,
    addCompany,
    updateCompany,
    changeStatus,
    deleteCompany,
  } = useCompanies(user);

  const [showDashboard, setShowDashboard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (search && !c.company_name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (levelFilter && c.level !== levelFilter) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });
  }, [companies, search, levelFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      A: companies.filter((c) => c.level === "A").length,
      B: companies.filter((c) => c.level === "B").length,
      C: companies.filter((c) => c.level === "C").length,
      offer: companies.filter((c) => c.status === "get_offer").length,
    }),
    [companies]
  );

  const openAddModal = () => {
    setEditingCompany(null);
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  const handleAddCompany = async (data) => {
    const result = await addCompany(data);
    if (!result) return;
    closeModal();
    setShowDashboard(true);
  };

  const handleEditCompany = (data) => {
    if (data.id) {
      updateCompany(data.id, {
        company_name: data.companyName,
        position: data.position,
        industry: data.industry,
        salary: data.salary,
        level: data.level,
        note: data.note,
      });
    }
    closeModal();
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-secondary/50">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <Layout>
        <SignInPage onSignIn={signIn} onSignUp={signUp} />
      </Layout>
    );
  }

  // User bar with profile card
  const userBar = (
    <div className="flex items-center justify-end gap-4 mb-4 relative">
      <div className="relative">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 group cursor-pointer"
          title="Click to view profile | Double-click nickname to edit"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-400/30 flex items-center justify-center text-emerald-600 font-bold text-xs">
            {(nickname || user.email)[0].toUpperCase()}
          </div>
          <span className="text-sm text-secondary/60 group-hover:text-emerald-600 transition-colors">
            {nickname || user.email.split("@")[0]}
          </span>
        </button>

        {showProfile && (
          <ProfileCard
            user={user}
            nickname={nickname}
            onUpdateNickname={updateNickname}
            onClose={() => setShowProfile(false)}
          />
        )}
      </div>

      <button
        onClick={signOut}
        className="text-xs text-secondary/30 hover:text-rose-400/70 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );

  // Signed in, no companies yet
  if (!showDashboard && !companiesLoading && companies.length === 0) {
    return (
      <Layout>
        {userBar}
        <Hero onStart={() => setShowDashboard(true)} />
      </Layout>
    );
  }

  return (
    <Layout>
      {userBar}

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
  );
}
