import { useState } from 'react'
import useJsonData from '../hooks/useJsonData'
import './PocPlayground.css'

const badgeClass = {
  spark: 'badge-spark',
  researching: 'badge-researching',
  poc: 'badge-poc',
  completed: 'badge-completed',
}

export default function PocPlayground() {
  const [filter, setFilter] = useState('all')
  const { data: pocs, error, loading } = useJsonData('/data/pocs.json')

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  const filtered = filter === 'all' ? pocs : pocs.filter(p => p.status === filter)

  return (
    <div className="content">
      <h1 className="page-title">POC Playground</h1>
      <p className="subtitle">Proof-of-concept experiments from the Ideas Backlog</p>

      <div className="filters">
        {['all', 'spark', 'researching', 'poc', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((poc, i) => (
          <div key={i} className="poc-card">
            <div className="poc-header">
              <span className="poc-title">{poc.title}</span>
              <span className={`badge ${badgeClass[poc.status]}`}>{poc.status.toUpperCase()}</span>
              <span className="category-tag">{poc.category}</span>
            </div>
            <div className="poc-desc">{poc.desc}</div>
            <div className="poc-notes"><strong>Notes:</strong> {poc.notes}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
