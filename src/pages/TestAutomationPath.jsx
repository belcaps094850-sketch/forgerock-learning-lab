import { useState, useEffect } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import useProgress from '../hooks/useProgress'
import './K8sLearningPath.css'

export default function TestAutomationPath() {
  usePageMeta('Test Automation with AI (Claude) Learning Path', 'From manual testing to AI-powered automation with Playwright, Jest, and Claude')
  const [data, setData] = useState(null)
  const { completed, toggle: toggleTopic, loading: progressLoading } = useProgress('test-automation')
  const [expandedPhase, setExpandedPhase] = useState(null)
  const [expandedPrompt, setExpandedPrompt] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/testing-automation-path.json`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data || progressLoading) return <div className="k8s-loading">Loading learning path...</div>

  const totalTopics = data.phases.reduce((sum, p) => sum + p.topics.length, 0)
  const completedCount = Object.values(completed).filter(Boolean).length
  const progressPct = Math.round((completedCount / totalTopics) * 100)

  const phaseProgress = (phase) => {
    const done = phase.topics.filter(t => completed[t.id]).length
    return { done, total: phase.topics.length, pct: Math.round((done / phase.topics.length) * 100) }
  }

  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="k8s-page">
      <div className="k8s-header">
        <h1>🧪 {data.title}</h1>
        <p className="k8s-desc">{data.description}</p>
        <div className="k8s-progress-bar">
          <div className="k8s-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="k8s-progress-text">
          {completedCount} / {totalTopics} topics completed ({progressPct}%)
        </div>
      </div>

      <div className="k8s-phases">
        {data.phases.map((phase) => {
          const prog = phaseProgress(phase)
          const isExpanded = expandedPhase === phase.id
          return (
            <div key={phase.id} className={`k8s-phase ${prog.pct === 100 ? 'complete' : ''}`}>
              <button
                className="k8s-phase-header"
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                aria-expanded={isExpanded}
              >
                <div className="k8s-phase-left">
                  <span className="k8s-phase-icon">{phase.icon}</span>
                  <div>
                    <h2>{phase.title}</h2>
                    <span className="k8s-phase-duration">{phase.duration}</span>
                  </div>
                </div>
                <div className="k8s-phase-right">
                  <span className="k8s-phase-count">{prog.done}/{prog.total}</span>
                  <span className={`k8s-chevron ${isExpanded ? 'open' : ''}`}>▾</span>
                </div>
              </button>

              {isExpanded && (
                <div className="k8s-phase-body">
                  <p className="k8s-phase-desc">{phase.description}</p>

                  <div className="k8s-topics">
                    {phase.topics.map((topic) => (
                      <div key={topic.id} className={`k8s-topic ${completed[topic.id] ? 'done' : ''}`}>
                        <div className="k8s-topic-header">
                          <label className="k8s-checkbox">
                            <input
                              type="checkbox"
                              checked={!!completed[topic.id]}
                              onChange={() => toggleTopic(topic.id)}
                            />
                            <span className="k8s-checkmark" />
                          </label>
                          <div className="k8s-topic-info">
                            <div className="k8s-topic-title">
                              <span className={`k8s-topic-badge ${topic.type}`}>
                                {topic.type === 'exercise' ? '🛠️ Hands-on' : '📖 Learn'}
                              </span>
                              {topic.title}
                            </div>
                            <p className="k8s-topic-desc">{topic.description}</p>
                          </div>
                        </div>

                        {topic.claudePrompt && (
                          <div style={{
                            margin: '0.75rem 0 0 2rem',
                            border: '1px solid #e8e0f0',
                            borderRadius: 6,
                            overflow: 'hidden',
                          }}>
                            <button
                              onClick={() => setExpandedPrompt(expandedPrompt === topic.id ? null : topic.id)}
                              style={{
                                width: '100%', display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', padding: '0.5rem 0.75rem',
                                background: '#f9f7fc', border: 'none', cursor: 'pointer',
                                fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, color: '#666'
                              }}
                            >
                              <span>🧠 Claude Prompt</span>
                              <span>{expandedPrompt === topic.id ? '▲' : '▼'}</span>
                            </button>
                            {expandedPrompt === topic.id && (
                              <div style={{ padding: '0.75rem', position: 'relative' }}>
                                <pre style={{
                                  background: '#f5f5f5', padding: '0.75rem', borderRadius: 4,
                                  fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                  lineHeight: 1.5, maxHeight: 300, overflow: 'auto'
                                }}>
                                  {topic.claudePrompt}
                                </pre>
                                <button
                                  onClick={() => copyPrompt(topic.claudePrompt)}
                                  style={{
                                    position: 'absolute', top: 12, right: 12,
                                    background: '#fff', border: '1px solid #ddd', borderRadius: 4,
                                    padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer'
                                  }}
                                >
                                  Copy
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {topic.steps && (
                          <div className="k8s-steps">
                            <strong>Steps:</strong>
                            <ol>
                              {topic.steps.map((step, i) => (
                                <li key={i}><code>{step}</code></li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {topic.resources && (
                          <div className="k8s-resources">
                            {topic.resources.map((res, i) => (
                              <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="k8s-resource-link">
                                <span className="k8s-res-type">
                                  {res.type === 'video' ? '🎬' : res.type === 'lab' ? '🧪' : '📄'}
                                </span>
                                {res.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="k8s-checkpoint">
                    <strong>✅ Checkpoint:</strong> {phase.checkpoint}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="k8s-sidebar">
        <div className="k8s-sidebar-section">
          <h3>🛠️ Tools You'll Need</h3>
          {data.tools.map((tool, i) => (
            <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" className="k8s-tool">
              <strong>{tool.name}</strong>
              <span>{tool.description}</span>
            </a>
          ))}
        </div>

        <div className="k8s-sidebar-section">
          <h3>📚 Recommended Books</h3>
          {data.books.map((book, i) => (
            <div key={i} className="k8s-book">
              <strong>{book.title}</strong>
              <span className="k8s-book-author">by {book.author}</span>
              <span className="k8s-book-desc">{book.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
