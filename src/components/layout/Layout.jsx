export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-page relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        {children}
      </div>
    </div>
  )
}
