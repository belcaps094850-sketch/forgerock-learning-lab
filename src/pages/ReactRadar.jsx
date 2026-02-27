import useJsonData from '../hooks/useJsonData'
import './ReactRadar.css'

export default function ReactRadar() {
  const { data: days, error, loading } = useJsonData('/data/react-radar.json')

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  return (
    <div className="content">
      <h1 className="page-title">React Radar</h1>
      <p className="subtitle">Daily trending React topics from Reddit — updated every day at 4 AM ET</p>

      <div>
        {days.map((day, i) => (
          <div key={i} className="rr-date-section">
            <h2>{day.date}</h2>
            {day.topics.map((t, j) => (
              <div key={j} className="topic-card">
                <h3><a href={t.url} target="_blank" rel="noreferrer">{t.title}</a></h3>
                <div className="rr-meta">{t.meta}</div>
                <div className="rr-summary">{t.summary}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
