import { useState } from 'react'

export default function SignInPage({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('ÃÜÂëÖÁÉÙ 6 Î»')
      return
    }

    try {
      if (isSignUp) {
        await onSignUp(email, password)
        setMessage('×¢²á³É¹¦£¡Çë¼ì²éÓÊÏäÈ·ÈÏ£¬È»ºóµÇÂ¼¡£')
      } else {
        await onSignIn(email, password)
      }
    } catch (err) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('ÓÊÏä»òÃÜÂë´íÎó')
      } else if (err.message?.includes('User already registered')) {
        setError('¸ÃÓÊÏäÒÑ×¢²á£¬ÇëÖ±½ÓµÇÂ¼')
      } else {
        setError(err.message || '²Ù×÷Ê§°Ü£¬ÇëÖØÊÔ')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-wide text-primary">
        You deserve.
      </h1>
      <p className="mt-4 font-handwriting text-lg sm:text-xl text-secondary/60 max-w-md mx-auto leading-relaxed">
        {isSignUp ? 'Create your account.' : 'Welcome back.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl text-center text-lg
                     focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                     transition-all placeholder:text-gray-300/70"
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl text-center text-lg
                     focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                     transition-all placeholder:text-gray-300/70"
          required
          minLength={6}
        />

        {error && (
          <p className="text-sm text-rose-500 bg-rose-50/60 rounded-xl px-4 py-2">{error}</p>
        )}
        {message && (
          <p className="text-sm text-emerald-600 bg-emerald-50/60 rounded-xl px-4 py-2">{message}</p>
        )}

        <button type="submit" className="w-full btn-primary text-base sm:text-lg px-10 py-4">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <p className="text-sm text-secondary/50 mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage('') }}
            className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  )
}
