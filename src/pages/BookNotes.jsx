import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './BookNotes.css'

const books = [
  {
    id: 'de-positioning',
    title: 'De-Positioning: The Secret Brand Strategy for Creating Competitive Advantage',
    meta: 'Todd Irwin \u00B7 B2B brand strategy \u00B7 Researched by Sage',
    thumb: 'https://m.media-amazon.com/images/I/81Aiu7XCKzL._SL1500_.jpg',
    thumbStyle: {},
  },
  {
    id: 'b2b-cx',
    title: 'B2B Customer Experience \u2014 Deep Dive Research',
    meta: 'Multi-source research \u00B7 B2B CX strategy & frameworks \u00B7 Researched by Sage',
    thumb: 'https://m.media-amazon.com/images/I/81Aiu7XCKzL._SL1500_.jpg',
    thumbStyle: { opacity: 0.4, filter: 'grayscale(1)' },
  },
  {
    id: 'digital-exhaustion',
    title: 'Digital Exhaustion: Simple Rules for Reclaiming Your Life',
    meta: 'Paul Leonardi \u00B7 Digital wellness & productivity \u00B7 Researched by Alec',
    thumb: 'https://images4.penguinrandomhouse.com/cover/9780593851234',
    thumbStyle: {},
  },
  {
    id: 'deming-profound-knowledge',
    title: "Deming's Journey to Profound Knowledge",
    meta: 'John Willis \u00B7 Quality, systems thinking, Lean/Agile/DevOps roots \u00B7 Researched by Alec',
    thumb: 'https://m.media-amazon.com/images/I/71avwVJhhxL.jpg',
    thumbStyle: {},
  },
  {
    id: 'the-goal',
    title: 'The Goal: A Process of Ongoing Improvement',
    meta: 'Eliyahu Goldratt \u00B7 Theory of Constraints, bottlenecks, systems thinking \u00B7 Researched by Alec',
    thumb: 'https://m.media-amazon.com/images/I/71uX71IlUiL._SL1308_.jpg',
    thumbStyle: {},
  },
]

export default function BookNotes() {
  const [activeBook, setActiveBook] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) setActiveBook(hash)
  }, [location.hash])

  const showIndex = () => setActiveBook(null)

  return (
    <div className="content">
      <h1 className="page-title">Book Notes</h1>
      <p className="subtitle">Key concepts, frameworks, and actionable takeaways</p>

      {!activeBook && (
        <div className="book-index">
          {books.map(book => (
            <a key={book.id} href="#" onClick={e => { e.preventDefault(); setActiveBook(book.id) }} className="book-index-link">
              <img className="book-thumb" src={book.thumb} alt={`${book.title} cover`} style={book.thumbStyle} />
              <div>
                {book.title}
                <div className="book-meta">{book.meta}</div>
              </div>
            </a>
          ))}
        </div>
      )}

      {activeBook === 'de-positioning' && <DePositioning onBack={showIndex} />}
      {activeBook === 'b2b-cx' && <B2BCX onBack={showIndex} />}
      {activeBook === 'digital-exhaustion' && <DigitalExhaustion onBack={showIndex} />}
      {activeBook === 'deming-profound-knowledge' && <DemingProfoundKnowledge onBack={showIndex} />}
      {activeBook === 'the-goal' && <TheGoal onBack={showIndex} />}
    </div>
  )
}

function BackLink({ onBack }) {
  return <a className="back-to-list" onClick={onBack}>&larr; All Books</a>
}

function DePositioning({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="https://m.media-amazon.com/images/I/81Aiu7XCKzL._SL1500_.jpg" alt="De-Positioning cover" />
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

function B2BCX({ onBack }) {
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

function DigitalExhaustion({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="https://images4.penguinrandomhouse.com/cover/9780593851234" alt="Digital Exhaustion cover" />
        <div>
          <h2>Digital Exhaustion: Simple Rules for Reclaiming Your Life</h2>
          <div className="meta"><strong>Author:</strong> Paul Leonardi &nbsp;|&nbsp; <strong>Publisher:</strong> Penguin Random House &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>Named a <strong>Best Management Book of 2025</strong> by the Globe and Mail. Leonardi argues that unplugging isn't a realistic long-term solution — if you want to keep your job, participate in society, and maintain relationships, you can't escape your devices. Instead, he maps out achievable, research-backed strategies for using technology in healthier ways.</p>
        <blockquote>"Unplugging is not a long-term solution for the stress caused by technology."</blockquote>
      </div>

      <div className="section">
        <h3>Key Principles</h3>
        <h4>1. Delay Your Responses</h4>
        <div className="key-point">Not everything needs an instant reply. The sense of urgency is mostly in our heads. Waiting longer to respond reduces pressure without real consequences.</div>
        <h4>2. Match the Tool to the Task</h4>
        <div className="key-point">We default to the wrong communication channel constantly — Slack when it should be email, email when it should be a call. <strong>Using the right tool for each task</strong> reduces friction and cognitive load.</div>
        <h4>3. Recognize Emotional Traps</h4>
        <div className="key-point">FOMO, performative availability, and dopamine loops keep us locked into dysfunctional relationships with technology. Awareness is the first step to breaking free.</div>
        <h4>4. Be Intentional with Attention</h4>
        <div className="key-point">Consciously allocate time and energy to devices instead of letting them dictate your schedule. <strong>Mental space</strong> is a finite resource — protect it.</div>
      </div>

      <div className="section">
        <h3>About the Author</h3>
        <p><strong>Paul Leonardi, PhD</strong> is the Duca Family Professor of Technology Management at UC Santa Barbara. He consults for Google, Microsoft, YouTube, GM, McKinsey, and Fidelity — helping organizations leverage technology while defeating digital exhaustion. He's a Harvard Business Review contributor and coauthor of <em>The Digital Mindset</em>.</p>
      </div>

      <div className="section">
        <h3>Why This Matters</h3>
        <div className="key-point">This isn't anti-tech. It's <strong>pragmatic tech</strong> — written by someone embedded in the industry. The message: you can be productive and connected without feeling drained, if you're deliberate about how you engage.</div>
      </div>

      <div className="section">
        <h3>Actionable Takeaways</h3>
        <div className="action-item">Audit your response habits — where are you replying instantly out of habit, not necessity?</div>
        <div className="action-item">Map your communication channels to tasks — are you using the right tool for each type of work?</div>
        <div className="action-item">Identify your emotional triggers — what keeps pulling you back to your phone?</div>
        <div className="action-item">Block intentional device-free time — not to "unplug" but to create space for deeper work</div>
      </div>
    </div>
  )
}

function DemingProfoundKnowledge({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="https://m.media-amazon.com/images/I/71avwVJhhxL.jpg" alt="Deming's Journey cover" />
        <div>
          <h2>Deming's Journey to Profound Knowledge</h2>
          <div className="meta"><strong>Author:</strong> John Willis (with Derek Lewis) &nbsp;|&nbsp; <strong>Publisher:</strong> IT Revolution Press (2023) &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>The story of how W. Edwards Deming developed his <strong>System of Profound Knowledge</strong> — told through the historical events, people, and serendipities that shaped his thinking. Not a biography; it's the origin story of the ideas that became the foundation of Lean, Agile, and DevOps.</p>
        <blockquote>"I hope what you have heard here today will haunt you for the rest of your life. Then I have done my best." — Dr. W.E. Deming</blockquote>
      </div>

      <div className="section">
        <h3>The System of Profound Knowledge</h3>
        <p>Deming's four interconnected domains for understanding and improving any system:</p>
        <ol className="framework-steps">
          <li><strong>Appreciation of Systems</strong> — See the bigger picture, not just individual parts. The opposite of analytic thinking is systems thinking.</li>
          <li><strong>Theory of Variation</strong> — Understand how processes behave. Track variation to find defects early and distinguish signal from noise.</li>
          <li><strong>Theory of Knowledge</strong> — How do we know what we think we know? Rooted in pragmatism and the scientific method: observe → hypothesize → test.</li>
          <li><strong>Theory of Psychology</strong> — How do people behave in systems? Workers aren't cogs — treat them as partners.</li>
        </ol>
      </div>

      <div className="section">
        <h3>Key Concepts</h3>
        <h4>The 94/6 Rule</h4>
        <div className="key-point">Only <strong>6% of problems are human error</strong>. 94% are system error. Since the system is management's responsibility, 94% of problems are caused by bad management. Stop blaming workers — fix the system.</div>
        <h4>Common vs. Special Cause Variation</h4>
        <table>
          <thead><tr><th>Type</th><th>Description</th><th>Response</th></tr></thead>
          <tbody>
            <tr><td><strong>Common Cause</strong></td><td>Inherent to the process, predictable</td><td>Plan for it — it's normal</td></tr>
            <tr><td><strong>Special Cause</strong></td><td>External, unpredictable</td><td>Investigate it — something changed</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>"The root of all evil"</strong> = misidentifying which type of variation you're dealing with. Treating common cause as special (or vice versa) leads to worse outcomes.</div>
        <h4>Quality Is About Process, Not Product</h4>
        <div className="key-point">"Quality is not so much about improving the product as it is about improving the process." Defects are a result of the process, not the workers. Less waste = doing more with less.</div>
        <h4>Management by Means (MBM)</h4>
        <div className="key-point">If you don't know <strong>how</strong> you achieved your objective, you don't know if you can do it again. Focus on the method, not just the outcome.</div>
        <h4>Cooperation Over Competition</h4>
        <div className="key-point">Even competitors working together benefits everyone — especially customers. "Strive to be better than yourself — that is true competition." Deming's real legacy: preaching cooperation over rivalry.</div>
      </div>

      <div className="section">
        <h3>On People &amp; Management</h3>
        <div className="key-point"><strong>Ford</strong> saw workers as interchangeable cogs. <strong>Taylor</strong> saw them as machines to optimize. Both assumed workers don't want to work → adversarial relationships.</div>
        <div className="key-point">The <strong>Hawthorne Works</strong> treated workers as partners — and it worked. Japanese workers believed they were doing something that mattered.</div>
        <div className="key-point"><strong>Piecework</strong> incentivizes quantity over quality — "man's lowest degradation."</div>
        <div className="key-point">Organizations need to be <strong>places where people can teach themselves</strong>.</div>
        <div className="key-point">"Our problems are different" is a common management disease — the principles that help are universal.</div>
        <div className="key-point">To change a system, you need knowledge from <strong>outside</strong> that system. If the system had the knowledge, it would change itself.</div>
      </div>

      <div className="section">
        <h3>Statistical Process Control (SPC)</h3>
        <div className="key-point">SPC lets you observe variation and distinguish <strong>random patterns</strong> (stable, "under control") from <strong>non-random patterns</strong> (unstable, potential defects ahead).</div>
        <div className="key-point">Shewhart's method enabled management to see defects as a result of <strong>process</strong> instead of blaming workers.</div>
        <div className="key-point">SPC allows you to statistically <strong>predict defects before they occur</strong>.</div>
      </div>

      <div className="section">
        <h3>Historical Arc</h3>
        <table>
          <thead><tr><th>Era</th><th>What Happened</th></tr></thead>
          <tbody>
            <tr><td><strong>WWII</strong></td><td>US outproduced the world using statistical process control — even with millions of skilled workers absent</td></tr>
            <tr><td><strong>Post-war Japan</strong></td><td>Deming taught SPC and quality to Japanese industry → the "Japanese Miracle"</td></tr>
            <tr><td><strong>1970s–80s</strong></td><td>Japan dominated manufacturing; US rediscovered Deming ("Demingmania")</td></tr>
            <tr><td><strong>Modern era</strong></td><td>Deming's ideas became the foundation of Lean, Agile, and DevOps</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Deming's 14 Points for Management (Highlights)</h3>
        <ul className="plain">
          <li>Improve constantly and forever the system of production and service</li>
          <li>Drive out fear so everyone can work effectively</li>
          <li>Break down barriers between departments</li>
          <li>Eliminate slogans, exhortations, and arbitrary targets — they create adversarial relationships</li>
          <li>Institute training and self-improvement for everyone</li>
        </ul>
        <p><a href="https://deming.org/explore/fourteen-points/" target="_blank" rel="noreferrer">Full 14 Points →</a></p>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"In God we trust. All others must bring data." — Deming</blockquote>
        <blockquote>"I will never apologize for learning." — Deming</blockquote>
        <blockquote>"Perfection is not for this world; it is for some other world."</blockquote>
        <blockquote>"We really didn't believe. We did what we were told and it worked."</blockquote>
      </div>

      <div className="section">
        <h3>Connected Reading</h3>
        <table>
          <thead><tr><th>Book</th><th>Connection</th></tr></thead>
          <tbody>
            <tr><td><strong>The Goal</strong> — Eliyahu Goldratt</td><td>Theory of Constraints — complementary systems thinking</td></tr>
            <tr><td><strong>The High Velocity Edge</strong> — Steven Spear</td><td>Similar narrative style; organizations that outcompete through systems</td></tr>
            <tr><td><strong>The DevOps Handbook</strong> — Kim, Willis, et al.</td><td>Direct application of Deming's principles to software</td></tr>
            <tr><td><strong>Out of the Crisis</strong> — W.E. Deming</td><td>Deming's own primary source</td></tr>
            <tr><td><strong>The Lean Startup</strong> — Eric Ries</td><td>Build-measure-learn rooted in Deming's PDCA cycle</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Takeaways</h3>
        <div className="action-item"><strong>Fix the system, not the people</strong> — 94% of problems are systemic</div>
        <div className="action-item"><strong>Know your variation</strong> — misidentifying common vs special cause is the root of bad decisions</div>
        <div className="action-item"><strong>Focus on how, not just what</strong> — Management by Means over Management by Objectives</div>
        <div className="action-item"><strong>Cooperation beats competition</strong> — even between competitors</div>
        <div className="action-item"><strong>Workers aren't the problem</strong> — create environments where people can teach themselves</div>
        <div className="action-item"><strong>Improve the process</strong> — quality comes from process improvement, not inspection</div>
      </div>
    </div>
  )
}

function TheGoal({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="https://m.media-amazon.com/images/I/71uX71IlUiL._SL1308_.jpg" alt="The Goal cover" />
        <div>
          <h2>The Goal: A Process of Ongoing Improvement</h2>
          <div className="meta"><strong>Author:</strong> Eliyahu M. Goldratt &amp; Jeff Cox &nbsp;|&nbsp; <strong>First published:</strong> 1984 &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>Written as a business novel, <strong>The Goal</strong> follows Alex Rogo, a plant manager given three months to turn around a failing factory or it gets shut down. Guided by his former physics professor Jonah, Alex discovers that doing work and making money are not the same thing — and that the key to improvement lies in understanding <strong>constraints</strong>.</p>
        <p>One of <a href="https://www.businessinsider.com/jeff-bezos-favorite-business-books-2013-9" target="_blank" rel="noreferrer">three books Jeff Bezos requires his top management team to read</a>. A perennial bestseller since 1984, it introduced the <strong>Theory of Constraints</strong> and remains foundational to Lean, DevOps, and operations management.</p>
        <blockquote>"Every action that brings a company closer to its goal is productive. Every action that does not bring a company closer to its goal is not productive." — Jonah</blockquote>
      </div>

      <div className="section">
        <h3>The Goal of Any Business</h3>
        <div className="key-point">The goal is not quality. Not efficiency. Not customer satisfaction. Not technology. The goal is to <strong>make money</strong>. Everything else is a means to that end. If an action doesn't increase throughput, reduce inventory, or reduce operating expense — it's not productive.</div>
      </div>

      <div className="section">
        <h3>Three Operational Measurements</h3>
        <table>
          <thead><tr><th>Metric</th><th>Definition</th><th>Think of it as...</th></tr></thead>
          <tbody>
            <tr><td><strong>Throughput</strong></td><td>The rate at which the system generates money through sales</td><td>Money coming in</td></tr>
            <tr><td><strong>Inventory</strong></td><td>All the money invested in purchasing things the system intends to sell</td><td>Money stuck in the system</td></tr>
            <tr><td><strong>Operating Expense</strong></td><td>All the money spent to turn inventory into throughput</td><td>Money going out</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>The Goal reframed:</strong> Increase throughput while simultaneously reducing both inventory and operating expense. Not in isolation — all three together.</div>
      </div>

      <div className="section">
        <h3>The Theory of Constraints</h3>
        <div className="key-point"><strong>A bottleneck</strong> is any resource whose capacity is equal to or less than the demand placed on it. A <strong>non-bottleneck</strong> is any resource whose capacity is greater than the demand placed on it.</div>
        <div className="key-point">The whole system only moves as fast as the bottleneck. Like the slowest kid on a hike — everyone behind him can only go as fast as he does. <strong>Put the slow kid at the front and lighten his backpack.</strong></div>
        <div className="key-point">An easy way to find a bottleneck: <strong>look for the biggest pile of work-in-progress</strong>. That's where flow is getting stuck.</div>
      </div>

      <div className="section">
        <h3>Five Focusing Steps (POOGI)</h3>
        <p>The Process of Ongoing Improvement:</p>
        <ol className="framework-steps">
          <li><strong>IDENTIFY</strong> the system's constraint — find the bottleneck</li>
          <li><strong>EXPLOIT</strong> the constraint — squeeze maximum output from its current resources. Don't let it sit idle, process defective parts, or work on things you don't need.</li>
          <li><strong>SUBORDINATE</strong> everything else — don't produce more than the bottleneck can handle. Match the flow of the entire system to the bottleneck's pace.</li>
          <li><strong>ELEVATE</strong> the constraint — only after you've squeezed everything from it, invest in increasing its capacity (hire, buy equipment, etc.)</li>
          <li><strong>REPEAT</strong> — if the constraint moves (it will), go back to step 1. Don't let inertia keep you optimizing the old bottleneck.</li>
        </ol>
      </div>

      <div className="section">
        <h3>Key Concepts</h3>

        <h4>Dependent Events &amp; Statistical Fluctuations</h4>
        <div className="key-point">Most processes are a series of <strong>dependent events</strong> — each step depends on the one before it. Combined with <strong>statistical fluctuations</strong> (natural variation), the downstream steps can never fully catch up. Negative deviations accumulate; positive ones are capped by the step ahead. This is why balanced plants don't work.</div>

        <h4>The Balanced Plant Myth</h4>
        <div className="key-point">"The closer you come to a balanced plant, the closer you are to bankruptcy." If every resource runs at 100% capacity, you build excess inventory everywhere. <strong>A plant where everyone is working all the time is very inefficient.</strong></div>

        <h4>Bottleneck Time Is Sacred</h4>
        <div className="key-point">An hour lost at the bottleneck is an hour lost for the <strong>entire system</strong>. If your plant earns $1,000/hour, an idle hour at the bottleneck costs $1,000. Never let the bottleneck:
          <br/>• Sit idle during breaks
          <br/>• Process already-defective parts (do QC before the bottleneck)
          <br/>• Work on things you don't need right now
        </div>

        <h4>Non-Bottleneck Utilization</h4>
        <div className="key-point">Making a non-bottleneck do more work than the bottleneck creates <strong>excess inventory</strong> and costs money. Activating a resource and utilizing a resource are not the same thing. Keeping people busy doesn't mean you're making money.</div>

        <h4>Batch Size Reduction</h4>
        <div className="key-point">Smaller batches = faster throughput. You reduce inventory held, reduce cash tied up, shrink gaps between steps, and condense total lead time. <strong>Move smaller, move faster.</strong></div>
      </div>

      <div className="section">
        <h3>The Herbie Analogy</h3>
        <p>On a Boy Scout hike, the troop keeps spreading out. The slowest kid — Herbie — determines the pace of the whole group. Alex's solution:</p>
        <ol className="framework-steps">
          <li><strong>Put Herbie at the front</strong> — the constraint sets the pace, everyone else follows</li>
          <li><strong>Lighten his backpack</strong> — remove non-essential load from the bottleneck</li>
          <li><strong>Everyone stays together</strong> — throughput stabilizes, "inventory" (gaps) shrinks</li>
        </ol>
        <div className="key-point">This simple analogy maps perfectly to any production system. Find your Herbie. Put him at the front. Lighten his load.</div>
      </div>

      <div className="section">
        <h3>Three Questions for Any Problem</h3>
        <table>
          <thead><tr><th>Question</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><strong>What to change?</strong></td><td>Identify the core constraint or wrong assumption</td></tr>
            <tr><td><strong>What to change to?</strong></td><td>Design the solution</td></tr>
            <tr><td><strong>How to cause the change?</strong></td><td>Implement without creating new problems</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Common Traps</h3>
        <div className="key-point"><strong>Local optimization:</strong> Maximizing the efficiency of every individual step creates a globally inefficient system. Optimize the whole, not the parts.</div>
        <div className="key-point"><strong>Cost-first thinking:</strong> The goal is not to reduce cost — it's to increase throughput. Nearly everyone gets this backwards.</div>
        <div className="key-point"><strong>Efficiency metrics:</strong> "Keeping everyone busy" feels productive but produces excess inventory. Doing work and making money are two different things.</div>
        <div className="key-point"><strong>Ignoring the constraint shift:</strong> Once you fix one bottleneck, another emerges. If you don't go back to step 1, inertia keeps you optimizing the wrong thing.</div>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"The goal is not to reduce cost. The goal is to increase throughput."</blockquote>
        <blockquote>"A plant in which everyone is working all the time is very inefficient."</blockquote>
        <blockquote>"Making an employee work and profiting from that work are two different things."</blockquote>
        <blockquote>"Tell me how you measure me, and I will tell you how I will behave."</blockquote>
        <blockquote>"The closer you come to a balanced plant, the closer you are to bankruptcy."</blockquote>
      </div>

      <div className="section">
        <h3>Connected Reading</h3>
        <table>
          <thead><tr><th>Book</th><th>Connection</th></tr></thead>
          <tbody>
            <tr><td><strong>Deming's Journey to Profound Knowledge</strong> — John Willis</td><td>Complementary systems thinking — Deming's variation + Goldratt's constraints</td></tr>
            <tr><td><strong>The Phoenix Project</strong> — Kim, Behr, Spafford</td><td>The Goal retold for IT/DevOps — same structure, software context</td></tr>
            <tr><td><strong>The DevOps Handbook</strong> — Kim, Willis, et al.</td><td>Theory of Constraints applied to software delivery pipelines</td></tr>
            <tr><td><strong>It's Not Luck</strong> — Eliyahu Goldratt</td><td>Sequel to The Goal — applying TOC to marketing, distribution, and strategy</td></tr>
            <tr><td><strong>Critical Chain</strong> — Eliyahu Goldratt</td><td>TOC applied to project management</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Takeaways</h3>
        <div className="action-item"><strong>Find your bottleneck</strong> — look for the biggest pile of WIP. That's your constraint.</div>
        <div className="action-item"><strong>Protect bottleneck time</strong> — every minute lost there is lost for the whole system</div>
        <div className="action-item"><strong>Stop chasing local efficiency</strong> — busy ≠ productive. Optimize the system, not the parts.</div>
        <div className="action-item"><strong>Reduce batch sizes</strong> — smaller batches = faster flow = less inventory</div>
        <div className="action-item"><strong>Subordinate to the constraint</strong> — don't produce more than the bottleneck can handle</div>
        <div className="action-item"><strong>Increase throughput, not just cut costs</strong> — the goal is making money, not saving it</div>
        <div className="action-item"><strong>Constraints move</strong> — when you fix one, find the next. Never stop improving.</div>
      </div>
    </div>
  )
}
