import useJsonData from '../hooks/useJsonData'
import './SreDigest.css'

export default function SreDigest() {
  const { data: days, error, loading } = useJsonData('/data/sre-digest.json')

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  return (
    <div className="content">
      <h1 className="page-title" style={{ textAlign: 'center' }}>🔧 SRE Daily Digest</h1>
      <p className="subtitle" style={{ textAlign: 'center' }}>Top trending SRE topics — updated weekdays at 3 AM ET</p>

      {days.map((day, i) => (
        <div key={i}>
          <h3 className="sre-date-heading">📅 {day.date}</h3>
          {day.entries.map((entry, j) => (
            <div key={j} className="digest-entry">
              <div className="sre-topic">
                <h4>{entry.title}</h4>
                <p>{entry.body}</p>
                <p>
                  🔗{' '}
                  {entry.links.map((link, k) => (
                    <span key={k}>
                      {k > 0 && ' · '}
                      <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
