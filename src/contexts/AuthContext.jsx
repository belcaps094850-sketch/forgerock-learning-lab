import { createContext, useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRedirectResult(auth).catch(() => {})
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const loginWithGoogle = async () => {
    try {
      // Try popup first (works on desktop, some mobile)
      return await signInWithPopup(auth, googleProvider)
    } catch (err) {
      // Fallback to redirect (mobile browsers that block popups)
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        return signInWithRedirect(auth, googleProvider)
      }
      throw err
    }
  }
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  const value = { user, loading, login, loginWithGoogle, register, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
