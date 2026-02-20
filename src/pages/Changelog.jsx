import './Changelog.css'

const versions = [
  {
    number: 'v1.2.0',
    date: 'February 11, 2026',
    type: 'minor',
    categories: [
      {
        icon: '✨',
        title: 'New Features',
        items: [
          'AI Study Buddy "Alex" with personalized learning guidance',
          'Interactive chat interface with pre-defined Q&A',
          'Beautiful landing page with glassmorphism design',
          'Navigation system connecting all platform features',
          'Coming soon previews for upcoming features',
        ],
      },
      {
        icon: '🎨',
        title: 'Design Improvements',
        items: [
          'Enhanced UI with glowing animations and effects',
          'Improved mobile responsiveness across all pages',
          'Added floating logo animation on landing page',
          'Professional gradient backgrounds and card layouts',
        ],
      },
      {
        icon: '🔧',
        title: 'Technical',
        items: [
          'Preserved original ForgeRock demo as separate page',
          'Improved file organization and navigation structure',
          'Enhanced localStorage persistence for user data',
        ],
      },
    ],
  },
  {
    number: 'v1.1.0',
    date: 'February 11, 2026',
    type: 'minor',
    categories: [
      {
        icon: '✨',
        title: 'New Features',
        items: [
          'Comprehensive learning hub with 6 learning paths',
          'Interactive daily challenges and quiz system',
          'Personal notes system with tagging',
          'Achievement and streak tracking',
          'Progress analytics with visual charts',
        ],
      },
      {
        icon: '🎨',
        title: 'Design',
        items: [
          'Salesforce Lightning Design System implementation',
          'Modern card-based layouts',
          'Professional color scheme and typography',
        ],
      },
    ],
  },
  {
    number: 'v1.0.0',
    date: 'February 11, 2026',
    type: 'major',
    categories: [
      {
        icon: '🚀',
        title: 'Initial Release',
        items: [
          'ForgeRock IAM learning simulation',
          'Interactive authentication chain demos',
          'Multi-factor authentication scenarios',
          'Educational concepts and tutorials',
          'Responsive web design',
        ],
      },
    ],
  },
]

const typeClass = { major: 'type-major', minor: 'type-minor', patch: 'type-patch' }
const typeLabel = { major: 'Major Release', minor: 'Minor Release', patch: 'Patch' }

export default function Changelog() {
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
