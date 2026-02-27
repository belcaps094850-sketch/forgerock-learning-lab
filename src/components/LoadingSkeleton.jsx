import './LoadingSkeleton.css'

export default function LoadingSkeleton() {
  return (
    <div className="content">
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-subtitle" />
      <div className="skeleton-block skeleton-card" />
      <div className="skeleton-block skeleton-card" />
      <div className="skeleton-block skeleton-card" />
    </div>
  )
}
