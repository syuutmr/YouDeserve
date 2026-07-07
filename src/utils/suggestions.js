export function getSuggestion(level) {
  const suggestions = {
    A: 'Go all in. Prep your resume and interview for this one.',
    B: 'Steady pace. Keep applying, this is your main pool.',
    C: 'Use for market feedback. Don\'t over-invest.',
  }
  return suggestions[level] || ''
}
