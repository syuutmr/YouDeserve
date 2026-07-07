import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const AUTH_KEY = 'you-deserve-user'

export function useAuth() {
  const [user, setUser] = useLocalStorage(AUTH_KEY, null)

  const signIn = useCallback((name) => {
    setUser({
      name: name.trim(),
      signedInAt: new Date().toISOString(),
    })
  }, [setUser])

  const signOut = useCallback(() => {
    setUser(null)
  }, [setUser])

  return {
    user,
    isSignedIn: !!user,
    signIn,
    signOut,
  }
}
