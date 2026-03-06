import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

/**
 * Track learning progress — Firestore when signed in, localStorage fallback.
 * @param {string} pathId - e.g. 'k8s', 'react', 'docker'
 */
export default function useProgress(pathId) {
  const { user } = useAuth()
  const [completed, setCompleted] = useState({})
  const [loading, setLoading] = useState(true)
  const saveTimer = useRef(null)

  const localKey = `${pathId}-progress`

  // Load progress
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)

      if (user) {
        try {
          const ref = doc(db, 'users', user.uid, 'progress', pathId)
          const snap = await getDoc(ref)
          if (!cancelled) {
            if (snap.exists()) {
              const firestoreData = snap.data().completed || {}
              // Merge with any localStorage data (in case they used it before signing in)
              const localData = readLocal()
              const merged = { ...localData, ...firestoreData }
              setCompleted(merged)
              // If we merged new items from local, save back to Firestore
              if (Object.keys(localData).length > 0 && JSON.stringify(merged) !== JSON.stringify(firestoreData)) {
                await setDoc(ref, { completed: merged, updatedAt: new Date().toISOString() }, { merge: true })
                // Clear localStorage since it's now in Firestore
                localStorage.removeItem(localKey)
              }
            } else {
              // No Firestore data yet — migrate from localStorage
              const localData = readLocal()
              setCompleted(localData)
              if (Object.keys(localData).length > 0) {
                await setDoc(ref, { completed: localData, updatedAt: new Date().toISOString() })
                localStorage.removeItem(localKey)
              }
            }
          }
        } catch (err) {
          console.warn('Failed to load progress from Firestore, using localStorage', err)
          if (!cancelled) setCompleted(readLocal())
        }
      } else {
        if (!cancelled) setCompleted(readLocal())
      }

      if (!cancelled) setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [user, pathId])

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(localKey) || '{}')
    } catch {
      return {}
    }
  }

  // Debounced save to Firestore
  function saveToFirestore(data) {
    if (!user) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      try {
        const ref = doc(db, 'users', user.uid, 'progress', pathId)
        await setDoc(ref, { completed: data, updatedAt: new Date().toISOString() }, { merge: true })
      } catch (err) {
        console.warn('Failed to save progress to Firestore', err)
      }
    }, 1000) // debounce 1s
  }

  const toggle = useCallback((topicId) => {
    setCompleted(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] }
      // Clean up false entries
      Object.keys(next).forEach(k => { if (!next[k]) delete next[k] })

      if (user) {
        saveToFirestore(next)
      } else {
        localStorage.setItem(localKey, JSON.stringify(next))
      }

      return next
    })
  }, [user, pathId])

  return { completed, toggle, loading }
}
