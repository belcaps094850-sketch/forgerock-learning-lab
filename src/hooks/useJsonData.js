import { useState, useEffect } from 'react'

const cache = new Map()

export default function useJsonData(url) {
  const [data, setData] = useState(() => cache.get(url) || null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(() => !cache.has(url))

  useEffect(() => {
    if (cache.has(url)) return

    let cancelled = false

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`)
        return res.json()
      })
      .then(json => {
        cache.set(url, json)
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, error, loading }
}
