import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="content">
      <h1 className="page-title">404 — Page Not Found</h1>
      <p className="subtitle">The page you're looking for doesn't exist.</p>
      <p><Link to="/">Back to Home</Link></p>
    </div>
  )
}
