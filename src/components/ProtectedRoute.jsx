import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, approved, pending, loading } = useAuth()

  if (loading) {
    return <div className="loading-auth">Checking authentication...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (pending && !approved) {
    return (
      <div className="pending-approval">
        <div className="pending-card">
          <div className="pending-icon">⏳</div>
          <h2>Access Pending</h2>
          <p>Your account <strong>{user.email}</strong> is awaiting approval.</p>
          <p className="pending-detail">
            You'll receive access once an administrator reviews your request.
            This usually happens within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return children
}
