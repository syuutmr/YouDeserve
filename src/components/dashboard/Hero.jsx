export default function Hero({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="font-display text-6xl sm:text-8xl font-medium tracking-wide text-primary">
        You deserve.
      </h1>
      <p className="mt-5 font-handwriting text-xl sm:text-2xl text-secondary/70 max-w-lg mx-auto leading-relaxed">
        Filter out the noise. Find what you deserve.
      </p>
      <button
        onClick={onStart}
        className="mt-12 btn-primary text-base sm:text-lg px-10 py-4"
      >
        Start My Match
      </button>
    </div>
  )
}
