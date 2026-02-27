import useJsonData from '../hooks/useJsonData'
import './SreDigest.css'

export default function SreDigest() {
  const { data: days, error, loading } = useJsonData('/data/sre-digest.json')

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  return (
    <div className="content">
      <h1 className="page-title sre-centered">🔧 SRE Daily Digest</h1>
      <p className="subtitle sre-centered">Top trending SRE topics — updated weekdays at 3 AM ET</p>

      {days.map((day, i) => (
        <div key={i}>
          <h2 className="sre-date-heading">📅 {day.date}</h2>
          {day.entries.map((entry, j) => (
            <div key={j} className="u-card digest-entry">
              <div className="u-accent sre-topic">
                <h3>{entry.title}</h3>
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
