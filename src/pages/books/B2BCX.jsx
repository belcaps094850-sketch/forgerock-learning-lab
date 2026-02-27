import BackLink from './BackLink'

export default function B2BCX({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <div>
          <h2>B2B Customer Experience — Deep Dive</h2>
          <div className="meta"><strong>Type:</strong> Multi-source research &nbsp;|&nbsp; <strong>Topic:</strong> B2B CX Strategy &nbsp;|&nbsp; <strong>Researched by:</strong> Sage 🎯 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>What Is B2B Customer Experience?</h3>
        <p>B2B CX is how a business customer <strong>perceives your brand across every interaction</strong> — from first research to onboarding, ongoing service, and renewal. Unlike B2C, it involves multiple stakeholders, longer sales cycles, higher stakes, and ongoing relationships.</p>
        <blockquote>B2B buyers are still humans. They bring the same expectations from their B2C experiences into professional purchasing. The gap between B2C ease and B2B friction is where trust breaks.</blockquote>
      </div>

      <div className="section">
        <h3>Why B2B CX Matters Now</h3>
        <table>
          <thead><tr><th>Insight</th><th>Source</th></tr></thead>
          <tbody>
            <tr><td><strong>80%+</strong> of organizations expect to compete mainly on CX</td><td>Gartner</td></tr>
            <tr><td><strong>81%</strong> of B2B pros prefer vendors offering self-service tools</td><td>HubSpot 2024</td></tr>
            <tr><td><strong>57%</strong> of B2B buyers purchased without a single sales meeting</td><td>HubSpot 2024</td></tr>
            <tr><td><strong>67%</strong> of customers expect ticket resolution within 3 hours</td><td>HubSpot</td></tr>
            <tr><td><strong>50%</strong> of B2B buyers say the buying experience is outdated</td><td>HubSpot 2024</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>B2B vs. B2C — Key Differences</h3>
        <table>
          <thead><tr><th>Dimension</th><th>B2C</th><th>B2B</th></tr></thead>
          <tbody>
            <tr><td>Buyer</td><td>Individual</td><td>Buying committee (3–10 people)</td></tr>
            <tr><td>Decision cycle</td><td>Minutes to days</td><td>Weeks to months</td></tr>
            <tr><td>Stakes</td><td>Personal money</td><td>Company budget + career risk</td></tr>
            <tr><td>Emotion</td><td>Desire, convenience</td><td>Anxiety, risk mitigation, trust</td></tr>
            <tr><td>Post-purchase</td><td>Optional engagement</td><td>Critical — onboarding, support, renewal</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>Key takeaway:</strong> B2B buyers carry more anxiety than B2C. They're spending someone else's money and their reputation is on the line. CX must reduce anxiety at every stage.</div>
      </div>

      <div className="section">
        <h3>Key Frameworks</h3>
        <h4>The Trust Equation</h4>
        <div className="key-point"><strong>Trust = (Credibility + Reliability + Intimacy) ÷ Self-Orientation</strong><br/>Every touchpoint builds or erodes trust. The biggest killer is self-orientation — talking about your features instead of the customer's problem.</div>
        <h4>Jobs to Be Done (JTBD) for B2B</h4>
        <table>
          <thead><tr><th>Job Type</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Functional</strong></td><td>"Help me process claims faster"</td></tr>
            <tr><td><strong>Emotional</strong></td><td>"Help me feel confident I made the right choice"</td></tr>
            <tr><td><strong>Social</strong></td><td>"Help me look competent to my leadership"</td></tr>
          </tbody>
        </table>
        <div className="key-point">The emotional and social jobs are often <strong>more important</strong> than the functional job — but most B2B companies only address functional needs.</div>
        <h4>Effort-Value Matrix</h4>
        <table>
          <thead><tr><th></th><th>Low Value</th><th>High Value</th></tr></thead>
          <tbody>
            <tr><td><strong>High Effort</strong></td><td>Frustration (churn risk)</td><td>Tolerance (vulnerable)</td></tr>
            <tr><td><strong>Low Effort</strong></td><td>Indifference (commodity)</td><td><strong>Loyalty (the goal)</strong></td></tr>
          </tbody>
        </table>
        <h4>Buyer Anxiety Model</h4>
        <ol className="framework-steps">
          <li><strong>Pre-purchase anxiety:</strong> "Am I choosing the right vendor? Will I look bad if this fails?"</li>
          <li><strong>Purchase anxiety:</strong> "Is this contract fair? Am I missing something?"</li>
          <li><strong>Post-purchase anxiety:</strong> "Did I make the right call? Is this working?"</li>
        </ol>
        <div className="key-point">CX must address all three phases. Most companies only focus on pre-purchase and ignore post-purchase — where churn happens.</div>
      </div>

      <div className="section">
        <h3>Six Key Themes Across B2B CX Research</h3>
        <h4>1. Reduce Effort, Don't Delight</h4>
        <div className="key-point">Loyalty comes from reducing effort, not exceeding expectations. Customers don't reward you for going above and beyond — they <strong>punish you for making things hard</strong>.</div>
        <h4>2. Self-Service Is the New Default</h4>
        <div className="key-point">65–81% of B2B buyers prefer to research and solve problems independently. Winning companies build better <strong>self-service tools</strong>, not bigger sales teams.</div>
        <h4>3. The Buying Committee Challenge</h4>
        <table>
          <thead><tr><th>Role</th><th>Priority</th></tr></thead>
          <tbody>
            <tr><td>Economic buyer (CFO)</td><td>Cost, ROI, risk</td></tr>
            <tr><td>Technical buyer (IT/Ops)</td><td>Integration, security, reliability</td></tr>
            <tr><td>User buyer (End user)</td><td>Ease of use, daily workflow</td></tr>
            <tr><td>Champion</td><td>Looking good, career advancement</td></tr>
            <tr><td>Blocker (Skeptic)</td><td>Risk avoidance, status quo</td></tr>
          </tbody>
        </table>
        <h4>4. Post-Purchase Is Where the Money Is</h4>
        <div className="key-point">In recurring revenue models, <strong>80%+ of revenue comes after the initial sale</strong>. Yet most companies spend 80%+ of CX effort on acquisition.</div>
        <h4>5. Internal Alignment Is Non-Negotiable</h4>
        <div className="key-point">Only 24% of service leaders have full-funnel visibility. The biggest CX failures aren't bad interactions — they're <strong>disconnected interactions</strong>.</div>
        <h4>6. Emotional Experience Matters More Than You Think</h4>
        <div className="key-point">Anxiety drives B2B decisions more than logic. Buyers choose vendors who make them <strong>feel safe and confident</strong>. Trust is the currency.</div>
      </div>

      <div className="section">
        <h3>B2B CX Metrics That Matter</h3>
        <table>
          <thead><tr><th>Metric</th><th>Why It Matters</th></tr></thead>
          <tbody>
            <tr><td><strong>CES (Customer Effort Score)</strong></td><td>#1 predictor of loyalty</td></tr>
            <tr><td><strong>NPS</strong></td><td>Overall relationship health</td></tr>
            <tr><td><strong>Time to Value</strong></td><td>Onboarding effectiveness</td></tr>
            <tr><td><strong>Customer Health Score</strong></td><td>Churn prediction</td></tr>
            <tr><td><strong>First Contact Resolution</strong></td><td>Support efficiency + satisfaction</td></tr>
            <tr><td><strong>Expansion Revenue</strong></td><td>CX-driven growth from existing customers</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Recommended Reading</h3>
        <table>
          <thead><tr><th>Book</th><th>Key Insight</th></tr></thead>
          <tbody>
            <tr><td><strong>The Effortless Experience</strong> — Dixon et al.</td><td>Loyalty = reducing effort, not delighting</td></tr>
            <tr><td><strong>The Challenger Sale</strong> — Dixon &amp; Adamson</td><td>Best B2B sales teaches, tailors, and takes control</td></tr>
            <tr><td><strong>Customer Success</strong> — Mehta et al.</td><td>Proactive success &gt; reactive support</td></tr>
            <tr><td><strong>Obviously Awesome</strong> — April Dunford</td><td>Positioning from customer context, not features</td></tr>
            <tr><td><strong>De-Positioning</strong> — Todd Irwin</td><td>Solve the pain competitors leave unresolved</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Key Takeaways for the Team</h3>
        <div className="action-item"><strong>CX is the differentiator</strong> — not price, not features</div>
        <div className="action-item"><strong>Reduce effort, don't delight</strong> — make it easy, not impressive</div>
        <div className="action-item"><strong>B2B buyers are anxious humans</strong> — address the emotional job</div>
        <div className="action-item"><strong>Self-service is expected</strong> — build for independence first</div>
        <div className="action-item"><strong>Post-purchase is where revenue lives</strong> — invest in retention</div>
        <div className="action-item"><strong>Align internally or fail externally</strong> — disconnected teams = disconnected CX</div>
        <div className="action-item"><strong>Own one idea per audience</strong> — clarity beats comprehensiveness</div>
        <div className="action-item"><strong>Measure effort, not just satisfaction</strong> — CES is the strongest predictor</div>
        <div className="action-item"><strong>Speed is a CX strategy</strong> — fast everything = trust</div>
        <div className="action-item"><strong>Every interaction is a trust transaction</strong> — deposits or withdrawals</div>
      </div>
    </div>
  )
}
