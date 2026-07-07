import { useState } from 'react'

export default function SignInPage({ onSignIn }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSignIn(name.trim())
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-wide text-primary">
        You deserve.
      </h1>
      <p className="mt-4 font-handwriting text-lg sm:text-xl text-secondary/60 max-w-md mx-auto leading-relaxed">
        Ready to find what you deserve.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm space-y-5">
        <div className="relative">
          <input
            type="text"
            placeholder="What's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl text-center text-lg
                       focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                       transition-all placeholder:text-gray-300/70"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full btn-primary text-base sm:text-lg px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Begin
        </button>
      </form>
    </div>
  )
}
