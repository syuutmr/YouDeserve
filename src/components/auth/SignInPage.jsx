import { useState } from "react";

export default function SignInPage({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (isSignUp && !nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      if (isSignUp) {
        await onSignUp(email, password, nickname.trim());
        setMessage("Account created! Please sign in.");
        setIsSignUp(false);
      } else {
        await onSignIn(email, password);
      }
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("Invalid login credentials")) {
        setError("Invalid email or password");
      } else if (msg.includes("User already registered")) {
        setError("Email already registered. Please sign in.");
      } else {
        setError(msg);
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4">
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="text-center mb-10">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-wide text-primary">
          You deserve.
        </h1>
        <p className="mt-4 font-handwriting text-lg sm:text-xl text-secondary/50 max-w-md mx-auto leading-relaxed">
          {isSignUp ? "Start tracking your journey." : "Welcome back."}
        </p>
      </div>

      <div className="card w-full max-w-sm !p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm text-center
                         focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                         transition-all placeholder:text-gray-300 backdrop-blur-sm"
              autoFocus
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm text-center
                       focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                       transition-all placeholder:text-gray-300 backdrop-blur-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm text-center
                       focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                       transition-all placeholder:text-gray-300 backdrop-blur-sm"
            required
            minLength={6}
          />

          {error && (
            <p className="text-sm text-rose-500 bg-rose-50/60 rounded-xl px-4 py-2">{error}</p>
          )}
          {message && (
            <p className="text-sm text-emerald-600 bg-emerald-50/60 rounded-xl px-4 py-2">{message}</p>
          )}

          <button type="submit" className="w-full btn-primary text-base py-3.5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-sm text-secondary/50 text-center">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setMessage("");
              }}
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
