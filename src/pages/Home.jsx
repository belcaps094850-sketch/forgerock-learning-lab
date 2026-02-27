import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import './Home.css'

export default function Home() {
  usePageMeta(null, 'Personal knowledge hub for POC experiments, daily briefs, and research notes')
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <div className="hero-tag">Personal Knowledge Hub</div>
          <h1><span>Learning</span> Is the Best Investment You Can Make</h1>
          <p className="hero-desc">POC experiments, daily intelligence briefs, and research notes — exploring IAM, SRE, React, AI, and B2B strategy all in one place.</p>
          <div className="hero-actions">
            <div className="btn-pill-group">
              <Link to="/poc-playground" className="btn-ghost">Explore POCs</Link>
              <Link to="/daily-brief" className="btn-solid">Daily Brief</Link>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <Link to="/poc-playground" className="mosaic-card tall">
            <span className="mosaic-icon">🔬</span>
            <div className="mosaic-title">POC Playground</div>
            <div className="mosaic-desc">Proof-of-concept experiments from the Ideas Backlog</div>
          </Link>
          <Link to="/books" className="mosaic-card">
            <span className="mosaic-icon">📚</span>
            <div className="mosaic-title">Book Notes</div>
            <div className="mosaic-desc">Key concepts &amp; takeaways</div>
          </Link>
          <Link to="/iam-demo" className="mosaic-card">
            <span className="mosaic-icon">🔐</span>
            <div className="mosaic-title">IAM Demo</div>
            <div className="mosaic-desc">Interactive ForgeRock simulation</div>
          </Link>
          <Link to="/auth-flows" className="mosaic-card">
            <span className="mosaic-icon">🔑</span>
            <div className="mosaic-title">Auth Flows</div>
            <div className="mosaic-desc">Registration &amp; recovery patterns</div>
          </Link>
          <Link to="/daily-brief" className="mosaic-card">
            <span className="mosaic-icon">📊</span>
            <div className="mosaic-title">Daily Brief</div>
            <div className="mosaic-desc">Morning intelligence feed</div>
          </Link>
        </div>
      </div>

      <div className="sections">
        <div className="section-label">Daily Digests</div>
        <div className="link-grid">
          <Link to="/react-radar" className="link-card">
            <span className="lc-icon">⚛️</span>
            <div>
              <div className="lc-title">React Radar</div>
              <div className="lc-desc">Trending React topics, updated daily</div>
            </div>
          </Link>
          <Link to="/sre-digest" className="link-card">
            <span className="lc-icon">🔧</span>
            <div>
              <div className="lc-title">SRE Digest</div>
              <div className="lc-desc">Top SRE &amp; DevOps topics, weekdays</div>
            </div>
          </Link>
          <Link to="/daily-brief" className="link-card">
            <span className="lc-icon">📊</span>
            <div>
              <div className="lc-title">Daily Brief Dashboard</div>
              <div className="lc-desc">AI, SRE, React, Security &amp; MSL</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
