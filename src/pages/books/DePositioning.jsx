import BackLink from './BackLink'

export default function DePositioning({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/de-positioning.jpg" alt="De-Positioning cover" />
        <div>
          <h2>De-Positioning</h2>
          <div className="meta"><strong>Author:</strong> Todd Irwin &nbsp;|&nbsp; <strong>Topic:</strong> B2B Brand Strategy &nbsp;|&nbsp; <strong>Researched by:</strong> Sage 🎯 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>Traditional brand positioning — trying to differentiate by claiming uniqueness — no longer works in saturated markets. Instead, brands should <strong>de-position competitors</strong> by identifying real customer pain points that rivals can't or won't solve, then aligning the entire organization around eliminating that pain.</p>
        <blockquote>Differentiation alone is not enough. Brands win not by shouting louder, but by solving the one problem competitors leave unresolved — making alternatives feel unnecessary.</blockquote>
      </div>

      <div className="section">
        <h3>The Six Key Principles</h3>
        <h4>1. Abandon the Search for "White Space"</h4>
        <div className="key-point">Every category is already occupied. Instead of inventing a new lane, <strong>redefine existing space</strong> by reframing how customers see current options. Identify a clear "enemy" — not a competitor, but a problem or outdated way of doing things.</div>
        <h4>2. Find the "Hero Pain Point"</h4>
        <div className="key-point">Not one of many problems — the <strong>single most emotionally charged and practically urgent issue</strong> customers want solved. Focus creates power. Trying to address too many needs weakens impact.</div>
        <h4>3. Make the Customer the Hero</h4>
        <div className="key-point">Customers don't wake up hoping to admire a brand. They wake up because <strong>something isn't working</strong>. Winning brands identify the obstacle and organize everything around removing it.</div>
        <h4>4. Study Competitors to Expose What They Can't Fix</h4>
        <div className="key-point">Study rivals deeply — not to copy, but to <strong>uncover what they cannot or will not fix</strong>. Every organization carries limitations. Those weaknesses are your strategic openings.</div>
        <h4>5. Own One Idea in the Customer's Mind</h4>
        <div className="key-point">Brands that try to stand for too many things end up standing for nothing. One strong concept creates a <strong>mental shortcut</strong> — easy to understand, easy to remember.</div>
        <h4>6. Integrate Across the Entire Organization</h4>
        <div className="key-point">If the external promise doesn't match the internal experience, <strong>trust collapses</strong>. Every part of the business must reinforce the same strategic idea.</div>
      </div>

      <div className="section">
        <h3>The De-Positioning Process</h3>
        <ol className="framework-steps">
          <li><strong>Research &amp; Observe</strong> — Deep customer research + competitor analysis</li>
          <li><strong>Identify the Hero Pain Point</strong> — The single most urgent, unresolved customer frustration</li>
          <li><strong>Map Competitor Weaknesses</strong> — Where do rivals fail to solve this pain?</li>
          <li><strong>Define Your One Idea</strong> — The clear, ownable solution that makes alternatives feel outdated</li>
          <li><strong>Align the Organization</strong> — Every touchpoint reinforces the one idea</li>
          <li><strong>Execute with Discipline</strong> — Say no to anything that dilutes focus</li>
        </ol>
      </div>

      <div className="section">
        <h3>The "Enemy" Framework</h3>
        <table>
          <thead><tr><th>Element</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><strong>The Enemy</strong></td><td>Not a competitor — a problem, inefficiency, or outdated approach</td></tr>
            <tr><td><strong>The Pain</strong></td><td>The hero pain point customers feel most urgently</td></tr>
            <tr><td><strong>The Solution</strong></td><td>Your brand's singular, clear answer</td></tr>
            <tr><td><strong>The Contrast</strong></td><td>How your solution makes the old way feel inadequate</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Case Studies</h3>
        <h4>Apple — The Second-Mover Masterclass</h4>
        <p>Didn't succeed by being first. Observed early players, let them introduce complexity and frustration, then entered with simplicity, integration, and design. De-positioned competitors as complicated and uninspiring.</p>
        <h4>Volvo — Owning One Idea for Decades</h4>
        <p>Owned <strong>safety</strong>. Didn't try to be fastest, most luxurious, or most affordable. Every decision reinforced one concept. Discipline in owning one idea creates lasting brand equity.</p>
      </div>

      <div className="section">
        <h3>B2B CX Applications (Sage's Analysis)</h3>
        <table>
          <thead><tr><th>Principle</th><th>Application</th></tr></thead>
          <tbody>
            <tr><td><strong>Hero Pain Point</strong></td><td>Map the #1 frustration for each audience segment. Own the one that matters most.</td></tr>
            <tr><td><strong>Customer as Hero</strong></td><td>Lead with their pain, not our capabilities. Center the customer's problem everywhere.</td></tr>
            <tr><td><strong>Competitor Weakness Mapping</strong></td><td>Audit competitor CX — slow onboarding? Opaque pricing? Bad support? Those gaps are our strategy.</td></tr>
            <tr><td><strong>Own One Idea</strong></td><td>One promise per audience. Brokers: speed. Employers: certainty. TPAs: integration.</td></tr>
            <tr><td><strong>Organizational Alignment</strong></td><td>CX promises mean nothing if sales, onboarding, and support don't deliver the same experience.</td></tr>
            <tr><td><strong>Second-Mover Advantage</strong></td><td>Study what incumbents get wrong. Build the experience that makes their way feel outdated.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"Brands win not by being different, but by being the clear antidote to an unresolved frustration."</blockquote>
        <blockquote>"Focus creates power. One strong concept creates a mental shortcut."</blockquote>
        <blockquote>"If the promise a brand makes externally does not match the experience delivered internally, trust collapses."</blockquote>
        <blockquote>"Customers don't wake up hoping to admire a brand's personality. They wake up because something isn't working."</blockquote>
      </div>

      <div className="section">
        <h3>Recommended Next Steps</h3>
        <div className="action-item">Run a Hero Pain Point exercise for each audience segment</div>
        <div className="action-item">Audit 3-5 competitor websites and CX flows</div>
        <div className="action-item">Define our "One Idea" per audience and pressure-test it</div>
        <div className="action-item">Align website copy, sales materials, and support scripts around that idea</div>
        <div className="action-item">Create an internal alignment check — does every team reinforce the promise?</div>
      </div>
    </div>
  )
}
