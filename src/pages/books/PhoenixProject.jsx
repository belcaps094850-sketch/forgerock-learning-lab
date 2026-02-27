import BackLink from './BackLink'

export default function PhoenixProject({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/phoenix-project.jpg" alt="The Phoenix Project cover" />
        <div>
          <h2>The Phoenix Project</h2>
          <div className="meta"><strong>Authors:</strong> Gene Kim, Kevin Behr, George Spafford &nbsp;|&nbsp; <strong>Published:</strong> 2013 &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>A business novel (think <em>The Goal</em> for IT) following Bill Palmer, a mid-level IT manager at Parts Unlimited, who gets promoted to VP of IT Operations during a crisis. The company's critical initiative — the Phoenix Project — is late, over budget, and threatening the company's survival. Bill must figure out how to fix IT operations before the board outsources the entire department.</p>
        <blockquote>"Until code is in production, no value is actually being generated."</blockquote>
      </div>

      <div className="section">
        <h3>Key Characters</h3>
        <table>
          <thead><tr><th>Character</th><th>Role</th></tr></thead>
          <tbody>
            <tr><td><strong>Bill Palmer</strong></td><td>VP of IT Operations — thrust into chaos, learns to lead</td></tr>
            <tr><td><strong>Erik Reid</strong></td><td>Eccentric board member and mentor — the "Yoda" figure who teaches Bill the Three Ways</td></tr>
            <tr><td><strong>Steve Masters</strong></td><td>CEO of Parts Unlimited — under pressure from the board</td></tr>
            <tr><td><strong>Wes Davis</strong></td><td>Director of Distributed Technology Operations — firefighter mentality</td></tr>
            <tr><td><strong>Patty McKee</strong></td><td>Director of IT Service Support — brings process and visibility</td></tr>
            <tr><td><strong>Brent Geller</strong></td><td>Lead engineer and critical bottleneck — everyone depends on him</td></tr>
            <tr><td><strong>Chris Allers</strong></td><td>VP of Application Development — responsible for Phoenix</td></tr>
            <tr><td><strong>Sarah Moulton</strong></td><td>SVP of Retail Operations — demanding business stakeholder</td></tr>
            <tr><td><strong>John Pesche</strong></td><td>CISO — constantly flagging audit findings</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Plot Summary</h3>
        <h4>Act 1: The Fire</h4>
        <p>Bill gets promoted to VP of IT Ops on a Tuesday. By Wednesday, everything is on fire — a payroll failure affects all employees, the Phoenix Project is months behind, and audit findings are piling up. Bill inherits a team drowning in unplanned work with zero visibility.</p>
        <h4>Act 2: The Education</h4>
        <p>Bill meets Erik, who challenges him to visit a manufacturing plant and see the parallels. Through Socratic conversations, Erik introduces the Theory of Constraints, the Four Types of Work, and the danger of single-person dependencies. Bill starts making work visible, limiting WIP, and protecting Brent from interrupts.</p>
        <h4>Act 3: The Transformation</h4>
        <p>The team implements change management, creates a deployment pipeline, automates testing, and breaks the cycle of heroics. Phoenix eventually launches, but the real win is cultural — IT becomes a competitive advantage. Bill is offered the CIO role.</p>
      </div>

      <div className="section">
        <h3>The Three Ways</h3>
        <h4>First Way: Flow (Systems Thinking)</h4>
        <div className="key-point">Optimize the <strong>entire system</strong>, not individual silos. Work flows left to right: Dev → Ops → Customer. Make work visible, reduce batch sizes, limit WIP, eliminate handoffs. Never pass a known defect downstream.</div>
        <h4>Second Way: Feedback</h4>
        <div className="key-point">Create <strong>fast feedback loops</strong> right to left. Shorten the time between doing work and knowing if it worked. Amplify feedback through monitoring, alerting, and telemetry. When something breaks, fix it immediately.</div>
        <h4>Third Way: Continual Learning and Experimentation</h4>
        <div className="key-point">Foster a culture of <strong>experimentation and risk-taking</strong>. Allocate time for improvement. Practice makes perfect — repetition creates mastery. Learn from failures through blameless postmortems.</div>
      </div>

      <div className="section">
        <h3>The Four Types of Work</h3>
        <p>One of the book's most actionable insights. Most IT orgs only track type 1:</p>
        <table>
          <thead><tr><th>Type</th><th>Description</th><th>Visibility</th></tr></thead>
          <tbody>
            <tr><td><strong>Business Projects</strong></td><td>Features, initiatives, revenue-generating work</td><td>Tracked, visible</td></tr>
            <tr><td><strong>Internal IT Projects</strong></td><td>Infrastructure upgrades, tooling, migrations</td><td>Often invisible</td></tr>
            <tr><td><strong>Changes</strong></td><td>Deployments, patches, config changes</td><td>Partially tracked</td></tr>
            <tr><td><strong>Unplanned Work</strong></td><td>Incidents, firefighting, recovery</td><td>The silent killer</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>Key insight:</strong> Unplanned work is the most destructive — it's anti-work that steals capacity from planned work. The only way to reduce it is to invest in reliability.</div>
      </div>

      <div className="section">
        <h3>Key Concepts</h3>
        <h4>Theory of Constraints (from Goldratt's <em>The Goal</em>)</h4>
        <div className="key-point">Every system has <strong>one constraint</strong> that limits throughput. Improving anything else is an illusion. <strong>Brent</strong> is Parts Unlimited's constraint — the only person who knows how everything works.</div>
        <ol className="framework-steps">
          <li><strong>Identify</strong> the constraint</li>
          <li><strong>Exploit</strong> it — maximize its output</li>
          <li><strong>Subordinate</strong> everything else to it</li>
          <li><strong>Elevate</strong> it — add capacity</li>
          <li><strong>Repeat</strong></li>
        </ol>

        <h4>WIP Limits</h4>
        <div className="key-point">Too much WIP = context switching = nothing gets done. Visualize WIP on a kanban board. <strong>Stop starting, start finishing.</strong> Bill literally freezes all new projects to clear the backlog.</div>

        <h4>The Danger of Heroes</h4>
        <div className="key-point">"Brent dependency" — when one person is in every critical path. Heroes create fragility, not resilience. Solution: document knowledge, automate, cross-train.</div>

        <h4>Wait Time Formula</h4>
        <div className="key-point">When a resource is 90% utilized, wait times explode. At 99% utilization, wait time is ~100x what it is at 50%. This is why <strong>protecting slack in the system</strong> matters.</div>

        <h4>Change Management</h4>
        <div className="key-point">Uncontrolled changes are the #1 source of outages. Categorize changes: standard (pre-approved), normal (review needed), emergency. Not bureaucracy — visibility and risk management.</div>

        <h4>Deployment Pipeline</h4>
        <div className="key-point">Automate build, test, deploy. Make deployments routine, not events. <strong>If it hurts, do it more often</strong> (continuous delivery).</div>
      </div>

      <div className="section">
        <h3>Lessons for Leaders</h3>
        <div className="action-item"><strong>Make work visible</strong> — kanban boards, not email threads</div>
        <div className="action-item"><strong>Protect your constraints</strong> — know your bottleneck and guard their time ruthlessly</div>
        <div className="action-item"><strong>Limit WIP</strong> — saying yes to everything means finishing nothing</div>
        <div className="action-item"><strong>Unplanned work is the enemy</strong> — track it, measure it, reduce it</div>
        <div className="action-item"><strong>IT is not a cost center</strong> — it's the factory floor</div>
        <div className="action-item"><strong>Break the hero cycle</strong> — if only one person can do it, that's a risk</div>
        <div className="action-item"><strong>Feedback loops matter</strong> — faster feedback = cheaper fixes</div>
        <div className="action-item"><strong>Improvement requires investment</strong> — you can't improve at 100% capacity</div>
        <div className="action-item"><strong>Align IT to business goals</strong> — every project ties to a business outcome</div>
        <div className="action-item"><strong>Culture eats process</strong> — trust and shared goals beat any framework</div>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"Improving daily work is even more important than doing daily work."</blockquote>
        <blockquote>"Any improvements made anywhere besides the bottleneck are an illusion."</blockquote>
        <blockquote>"Left unchecked, technical debt will ensure that the only work that gets done is unplanned work."</blockquote>
        <blockquote>"Features are always a gamble. If you're lucky, ten percent will get the desired benefits."</blockquote>
      </div>

      <div className="section">
        <h3>Connection to DevOps</h3>
        <div className="key-point">The Phoenix Project is the <strong>origin story</strong> of the DevOps movement in book form. It bridges Dev and Ops, borrows from Lean Manufacturing (Deming, Goldratt, Toyota Production System), and describes CI/CD, infrastructure as code, and automated testing before they were mainstream.</div>
        <table>
          <thead><tr><th>Related Reading</th><th>Connection</th></tr></thead>
          <tbody>
            <tr><td><strong>The Goal</strong> — Goldratt</td><td>The direct inspiration — same structure, manufacturing context</td></tr>
            <tr><td><strong>The Unicorn Project</strong> — Kim (2019)</td><td>Sequel — developer perspective, the Five Ideals</td></tr>
            <tr><td><strong>The DevOps Handbook</strong> — Kim et al. (2016)</td><td>Turns the novel's lessons into a practical guide</td></tr>
            <tr><td><strong>Deming's Journey</strong> — Willis</td><td>The quality movement roots that underpin the Three Ways</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
