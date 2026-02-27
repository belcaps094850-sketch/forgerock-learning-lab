import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const [learningOpen, setLearningOpen] = useState(false)
  const [briefsOpen, setBriefsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const learningRef = useRef(null)
  const briefsRef = useRef(null)

  const isActive = (path) => location.pathname === path

  const learningPaths = ['/poc-playground', '/iam-demo', '/auth-flows', '/books']
  const briefsPaths = ['/daily-brief', '/react-radar', '/sre-digest']
  const isLearningActive = learningPaths.some(p => location.pathname.startsWith(p))
  const isBriefsActive = briefsPaths.some(p => location.pathname.startsWith(p))

  useEffect(() => {
    setMobileOpen(false)
    setLearningOpen(false)
    setBriefsOpen(false)
  }, [location])

  useEffect(() => {
    function handleClick(e) {
      if (learningRef.current && !learningRef.current.contains(e.target)) setLearningOpen(false)
      if (briefsRef.current && !briefsRef.current.contains(e.target)) setBriefsOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="card-wrapper">
      <nav>
        <Link to="/" className="logo"><span>Bel</span> Learning Lab</Link>
        <ul className="nav-center">
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li ref={learningRef}>
            <button
              className={`nav-dropdown-trigger ${learningOpen ? 'open' : ''} ${isLearningActive ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setLearningOpen(!learningOpen); setBriefsOpen(false) }}
              style={isLearningActive ? { color: '#2B5F4E' } : undefined}
            >
              Learning <span className="arrow">&#9662;</span>
            </button>
            <div className={`nav-dropdown ${learningOpen ? 'open' : ''}`}>
              <Link to="/poc-playground">POC Playground</Link>
              <Link to="/iam-demo">IAM Demo</Link>
              <Link to="/auth-flows">Auth Flows</Link>
              <Link to="/books">Book Notes</Link>
            </div>
          </li>
          <li ref={briefsRef}>
            <button
              className={`nav-dropdown-trigger ${briefsOpen ? 'open' : ''} ${isBriefsActive ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setBriefsOpen(!briefsOpen); setLearningOpen(false) }}
              style={isBriefsActive ? { color: '#2B5F4E' } : undefined}
            >
              Briefs <span className="arrow">&#9662;</span>
            </button>
            <div className={`nav-dropdown ${briefsOpen ? 'open' : ''}`}>
              <Link to="/daily-brief">Daily Brief</Link>
              <Link to="/react-radar">React Radar</Link>
              <Link to="/sre-digest">SRE Digest</Link>
            </div>
          </li>
        </ul>
        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <div className="mobile-section-label">Learning</div>
          <Link to="/poc-playground" className={isActive('/poc-playground') ? 'active' : ''}>POC Playground</Link>
          <Link to="/iam-demo" className={isActive('/iam-demo') ? 'active' : ''}>IAM Demo</Link>
          <Link to="/auth-flows" className={isActive('/auth-flows') ? 'active' : ''}>Auth Flows</Link>
          <Link to="/books" className={isActive('/books') ? 'active' : ''}>Book Notes</Link>
          <div className="mobile-section-label">Briefs</div>
          <Link to="/daily-brief" className={isActive('/daily-brief') ? 'active' : ''}>Daily Brief</Link>
          <Link to="/react-radar" className={isActive('/react-radar') ? 'active' : ''}>React Radar</Link>
          <Link to="/sre-digest" className={isActive('/sre-digest') ? 'active' : ''}>SRE Digest</Link>
        </div>
      </nav>

      {children}

      <footer>
        Built by Bel
      </footer>
    </div>
  )
}
