import useJsonData from '../hooks/useJsonData'
import './Changelog.css'

const typeClass = { major: 'type-major', minor: 'type-minor', patch: 'type-patch' }
const typeLabel = { major: 'Major Release', minor: 'Minor Release', patch: 'Patch' }

export default function Changelog() {
  const { data: versions, error, loading } = useJsonData('/data/changelog.json')

  if (loading) return <div className="content"><p>Loading...</p></div>
  if (error) return <div className="content"><p>Error: {error}</p></div>

  return (
    <div className="content">
      <h1 className="page-title">Changelog</h1>
      <p className="subtitle">Track every update, improvement, and new feature as we build the ultimate learning platform.</p>

      {versions.map((v, i) => (
        <div key={i} className="version">
          <div className="version-header">
            <div>
              <div className="version-number">{v.number}</div>
              <div className="version-date">{v.date}</div>
            </div>
            <div className={`version-type ${typeClass[v.type]}`}>{typeLabel[v.type]}</div>
          </div>

          {v.categories.map((cat, j) => (
            <div key={j} className="change-category">
              <div className="cl-category-title">
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </div>
              <ul className="change-list">
                {cat.items.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      <div className="stay-updated">
        <h3>Stay Updated</h3>
        <p>Follow our GitHub repository to get notified of new releases and features.</p>
        <a href="https://github.com/belcaps094850-sketch/forgerock-learning-lab" target="_blank" rel="noreferrer">Watch on GitHub</a>
      </div>
    </div>
  )
}
