import { useState, useEffect } from 'react'
import useJsonData from '../hooks/useJsonData'
import './DailyBrief.css'

const categoryIcons = { AI: '\uD83E\uDD16', SRE: '\uD83D\uDD27', React: '\u269B\uFE0F', Security: '\uD83D\uDD12', MSL: '\uD83C\uDFE5' }
const categoryOrder = ['AI', 'SRE', 'React', 'Security', 'MSL']

export default function DailyBrief() {
  const { data: briefs, error, loading } = useJsonData('/data/briefs.json')
  const [selectedDate, setSelectedDate] = useState(null)
  const [openDigests, setOpenDigests] = useState({})

  useEffect(() => {
    if (briefs && !selectedDate) {
      setSelectedDate(briefs[0].id)
    }
  }, [briefs, selectedDate])

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  const brief = briefs.find(b => b.id === selectedDate) || briefs[0]

  const toggleDigest = (cat) => {
    setOpenDigests(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  return (
    <div className="content">
      <h1 className="page-title">Daily Brief Dashboard</h1>
      <p className="subtitle">Your morning intelligence feed</p>

      <div className="date-selector">
        <label htmlFor="brief-date">Date:</label>
        <select id="brief-date" value={selectedDate || ''} onChange={e => { setSelectedDate(e.target.value); setOpenDigests({}) }}>
          {briefs.map(b => <option key={b.id} value={b.id}>{b.date}</option>)}
        </select>
      </div>

      <div className="db-section-label">POC Highlight</div>
      <div className="card poc-highlight">
        <div className="card-title">{brief.pocHighlight.title}</div>
        <div className="card-desc">{brief.pocHighlight.summary}</div>
        <span className="poc-category">{brief.pocHighlight.category}</span>
      </div>

      {categoryOrder.map(cat => {
        const data = brief.categories[cat]
        if (!data) return null
        const icon = categoryIcons[cat] || ''
        return (
          <div key={cat} className="category-section">
            <div className="db-section-label">{icon} {cat}</div>
            <div className="card">
              <div className="top-pick">{data.topPick}</div>
              <div className="db-summary">{data.summary}</div>
              <button
                className="digest-toggle"
                onClick={() => toggleDigest(cat)}
              >
                {openDigests[cat] ? 'Hide full digest \u25B2' : 'Show full digest \u25BC'}
              </button>
              {openDigests[cat] && (
                <div className="digest-content open">{data.digest}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
