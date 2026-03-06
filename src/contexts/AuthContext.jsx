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
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [approved, setApproved] = useState(false)
  const [pending, setPending] = useState(false)
  const [loading, setLoading] = useState(true)

  // Auto-approved admin emails
  const ADMIN_EMAILS = [
    'belcaps094850@gmail.com',
    'belcapistrano@gmail.com',
  ]

  async function checkApproval(u) {
    if (!u) {
      setApproved(false)
      setPending(false)
      return
    }

    const isAdmin = ADMIN_EMAILS.includes(u.email?.toLowerCase())
    const userRef = doc(db, 'users', u.uid)
    const snap = await getDoc(userRef)

    if (snap.exists()) {
      const data = snap.data()
      // Auto-approve admins even if not yet approved in Firestore
      if (isAdmin && !data.approved) {
        await setDoc(userRef, { approved: true }, { merge: true })
        setApproved(true)
        setPending(false)
      } else {
        setApproved(data.approved === true)
        setPending(data.approved !== true)
      }
    } else {
      // New user — register in Firestore
      await setDoc(userRef, {
        email: u.email,
        displayName: u.displayName || '',
        photoURL: u.photoURL || '',
        approved: isAdmin,
        createdAt: serverTimestamp(),
      })
      setApproved(isAdmin)
      setPending(!isAdmin)
    }
  }

  useEffect(() => {
    getRedirectResult(auth).catch(() => {})
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      await checkApproval(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await checkApproval(cred.user)
    return cred
  }

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      await checkApproval(result.user)
      return result
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        return signInWithRedirect(auth, googleProvider)
      }
      throw err
    }
  }

  const register = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await checkApproval(cred.user)
    return cred
  }

  const logout = () => {
    setApproved(false)
    setPending(false)
    return signOut(auth)
  }

  const value = { user, approved, pending, loading, login, loginWithGoogle, register, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
