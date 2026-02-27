import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('404 — Not Found')
  return (
    <div className="content">
      <h1 className="page-title">404 — Page Not Found</h1>
      <p className="subtitle">The page you're looking for doesn't exist.</p>
      <p><Link to="/">Back to Home</Link></p>
    </div>
  )
}
