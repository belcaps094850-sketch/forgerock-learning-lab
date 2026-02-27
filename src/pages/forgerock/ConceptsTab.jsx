import { concepts } from './concepts'

export default function ConceptsTab() {
  return (
    <div className="concept-grid">
      {concepts.map((concept, idx) => (
        <div key={idx} className="slds-section">
          <div className="slds-section-header">
            {concept.title}
          </div>
          <div className="slds-section-content">
            <p style={{ marginBottom: 16, color: 'var(--slds-text-weak)' }}>{concept.description}</p>
            <ul className="step-list">
              {concept.steps.map((step, stepIdx) => (
                <li key={stepIdx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
