import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Reports.css'

export default function Reports() {
  const { user } = useAuth()
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/reports.json')
      .then((r) => r.json())
      .then((data) => {
        setReports(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function loadReport(report) {
    setSelectedReport(report)
    setContent('Loading...')
    try {
      const res = await fetch(`/data/${report.file}`)
      const text = await res.text()
      setContent(text)
    } catch {
      setContent('Failed to load report.')
    }
  }

  if (loading) return <div className="reports-loading">Loading reports...</div>

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>Research Reports</h1>
        <p className="reports-user">
          Signed in as <strong>{user?.displayName || user?.email}</strong>
        </p>
      </div>

      {!selectedReport ? (
        <div className="reports-grid">
          {reports.length === 0 && (
            <p className="reports-empty">No reports available yet.</p>
          )}
          {reports.map((r) => (
            <button
              key={r.id}
              className="report-card"
              onClick={() => loadReport(r)}
            >
              <div className="report-card-icon">{r.icon || '📄'}</div>
              <h3>{r.title}</h3>
              <p className="report-card-date">{r.date}</p>
              <p className="report-card-desc">{r.description}</p>
              <span className="report-card-tag">{r.category}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="report-viewer">
          <button className="report-back" onClick={() => { setSelectedReport(null); setContent('') }}>
            ← Back to Reports
          </button>
          <div className="report-meta">
            <span className="report-meta-icon">{selectedReport.icon || '📄'}</span>
            <div>
              <h2>{selectedReport.title}</h2>
              <p>{selectedReport.date} · {selectedReport.category}</p>
            </div>
          </div>
          <pre className="report-content">{content}</pre>
        </div>
      )}
    </div>
  )
}
