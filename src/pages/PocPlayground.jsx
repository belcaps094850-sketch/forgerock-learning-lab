import { useState } from 'react'
import './PocPlayground.css'

const pocs = [
  {
    status: 'poc',
    title: 'Interactive Learning Paths Engine',
    category: 'React',
    desc: 'A guided learning path system that adapts to progress, serves quizzes, and tracks completion across IAM, SRE, and cloud topics.',
    notes: 'Early prototype built. Exploring spaced-repetition integration and per-module scoring.',
  },
  {
    status: 'poc',
    title: 'Mission Control Command Center',
    category: 'React',
    desc: 'A NASA-style dark command center dashboard for real-time agent monitoring — radar sweep, orbital rings, and glowing status nodes.',
    notes: 'Card view and command center view working. DiceBear Personas avatars integrated.',
  },
  {
    status: 'researching',
    title: 'Self-Funded Health Plan Cost Simulator',
    category: 'MSL',
    desc: 'A calculator comparing fully-insured vs self-funded + stop loss costs for mid-market employers, surfacing break-even points and risk profiles.',
    notes: 'Market primer complete ($30B+ market). Gathering carrier rate structures and claim distribution data.',
  },
  {
    status: 'researching',
    title: 'Real-Time Agent Monitoring Dashboard',
    category: 'AI',
    desc: 'Live dashboard showing agent heartbeat, task queue depth, token usage, and error rates across the OpenClaw agent fleet.',
    notes: 'Evaluating data sources — agent logs, cron output, and system metrics.',
  },
  {
    status: 'spark',
    title: 'Multi-Model Agent Benchmark',
    category: 'AI',
    desc: 'Compare agent task completion rates, latency, and cost across Claude Opus 4.6, Sonnet 4.5, and open-source models on standardized coding tasks.',
    notes: 'Inspired by Opus 4.6 launch benchmarks. Need to define task suite and evaluation criteria.',
  },
]

const badgeClass = {
  spark: 'badge-spark',
  researching: 'badge-researching',
  poc: 'badge-poc',
  completed: 'badge-completed',
}

export default function PocPlayground() {
  const [filter, setFilter] = useState('all')

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
