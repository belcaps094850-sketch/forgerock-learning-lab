import BackLink from './BackLink'

export default function Accelerate({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/accelerate.jpg" alt="Accelerate cover" loading="lazy" />
        <div>
          <h2>Accelerate: The Science of Lean Software and DevOps</h2>
          <div className="meta"><strong>Authors:</strong> Nicole Forsgren, Jez Humble, Gene Kim &nbsp;|&nbsp; <strong>Publisher:</strong> IT Revolution Press (2018) &nbsp;|&nbsp; <strong>Award:</strong> Shingo Publication Award &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> March 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>The research behind the DevOps movement. Through four years of rigorous statistical analysis — including data from the annual State of DevOps reports conducted with Puppet — Forsgren, Humble, and Kim proved what high-performing teams do differently. This isn't opinion. It's <strong>science</strong>.</p>
        <p>The book introduced the <strong>DORA metrics</strong> (now part of Google Cloud), which became the industry standard for measuring software delivery performance. Winner of the Shingo Publication Award for advancing understanding of lean and operational excellence.</p>
        <blockquote>"Our research has found that neither the technology nor the people are the key differentiators. It's the practices and capabilities that matter."</blockquote>
      </div>

      <div className="section">
        <h3>The DORA Four Key Metrics</h3>
        <p>The foundation of the book. Four metrics that predict both software delivery performance and organizational performance:</p>
        <table>
          <thead><tr><th>Metric</th><th>What It Measures</th><th>Elite Teams</th><th>Low Performers</th></tr></thead>
          <tbody>
            <tr><td><strong>Deployment Frequency</strong></td><td>How often you deploy to production</td><td>On demand (multiple/day)</td><td>Once per month to once per 6 months</td></tr>
            <tr><td><strong>Lead Time for Changes</strong></td><td>Time from commit to production</td><td>Less than 1 hour</td><td>1 to 6 months</td></tr>
            <tr><td><strong>Change Failure Rate</strong></td><td>% of deployments that cause failure</td><td>0–15%</td><td>46–60%</td></tr>
            <tr><td><strong>Mean Time to Recovery</strong></td><td>Time to restore service after failure</td><td>Less than 1 hour</td><td>1 week to 1 month</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>Key insight:</strong> Speed and stability are NOT tradeoffs. Elite teams deploy faster AND have fewer failures AND recover faster. The data is unambiguous.</div>
      </div>

      <div className="section">
        <h3>The 24 Key Capabilities</h3>
        <p>The research identified 24 capabilities that drive software delivery performance, grouped into five categories:</p>

        <h4>Continuous Delivery (8 capabilities)</h4>
        <div className="key-point"><strong>Version control:</strong> All production artifacts in version control — not just code, but configs, scripts, and infrastructure definitions.</div>
        <div className="key-point"><strong>Deployment automation:</strong> Deployments are fully automated. No manual steps, no heroics.</div>
        <div className="key-point"><strong>Continuous integration:</strong> Code is merged to trunk daily. Branches are short-lived. Broken builds are fixed immediately.</div>
        <div className="key-point"><strong>Trunk-based development:</strong> Fewer than 3 active branches. Branches live less than a day. No code freezes.</div>
        <div className="key-point"><strong>Test automation:</strong> Reliable automated tests that developers trust and run constantly.</div>
        <div className="key-point"><strong>Test data management:</strong> Adequate test data available on demand without bottlenecks.</div>
        <div className="key-point"><strong>Shift left on security:</strong> Security integrated into development, not bolted on at the end.</div>
        <div className="key-point"><strong>Continuous delivery:</strong> Software is always in a deployable state. Deploying is a business decision, not a technical event.</div>

        <h4>Architecture (2 capabilities)</h4>
        <div className="key-point"><strong>Loosely coupled architecture:</strong> Teams can test and deploy independently without coordinating with other teams.</div>
        <div className="key-point"><strong>Empowered teams:</strong> Teams choose their own tools and technologies based on what works best.</div>

        <h4>Product &amp; Process (4 capabilities)</h4>
        <div className="key-point"><strong>Customer feedback:</strong> Teams actively seek and incorporate customer feedback into design.</div>
        <div className="key-point"><strong>Value stream visibility:</strong> Teams understand the flow of work from business to customer.</div>
        <div className="key-point"><strong>Working in small batches:</strong> Features are sliced thin enough to be completed in less than a week.</div>
        <div className="key-point"><strong>Team experimentation:</strong> Teams can try new ideas without external approval.</div>

        <h4>Lean Management &amp; Monitoring (5 capabilities)</h4>
        <div className="key-point"><strong>Change approval processes:</strong> Lightweight, peer-reviewed — NOT a heavyweight change advisory board (CAB). CABs actually slow things down without improving stability.</div>
        <div className="key-point"><strong>Monitoring &amp; observability:</strong> Teams use monitoring to make business decisions, not just fight fires.</div>
        <div className="key-point"><strong>Proactive notification:</strong> Teams are alerted to problems before customers notice.</div>
        <div className="key-point"><strong>WIP limits:</strong> Work in progress is limited. Fewer things in flight = more things finished.</div>
        <div className="key-point"><strong>Visual management:</strong> Work is visible to the team and stakeholders (kanban boards, dashboards).</div>

        <h4>Culture (5 capabilities)</h4>
        <div className="key-point"><strong>Westrum organizational culture:</strong> Generative culture (high cooperation, messengers trained, failures lead to inquiry) predicts both delivery performance and organizational performance.</div>
        <div className="key-point"><strong>Learning culture:</strong> Learning is encouraged. Failure is treated as an opportunity to improve, not punish.</div>
        <div className="key-point"><strong>Collaboration among teams:</strong> Cross-functional collaboration, not siloed handoffs.</div>
        <div className="key-point"><strong>Job satisfaction:</strong> People who are satisfied with their work perform better. This isn't soft — it's measurable.</div>
        <div className="key-point"><strong>Transformational leadership:</strong> Leaders with vision, intellectual stimulation, inspirational communication, and supportive leadership drive performance.</div>
      </div>

      <div className="section">
        <h3>Westrum Organizational Culture</h3>
        <p>One of the book's most powerful findings. Ron Westrum's typology of organizational cultures:</p>
        <table>
          <thead><tr><th></th><th>Pathological (Power)</th><th>Bureaucratic (Rules)</th><th>Generative (Performance)</th></tr></thead>
          <tbody>
            <tr><td><strong>Information</strong></td><td>Hidden</td><td>Ignored</td><td>Actively sought</td></tr>
            <tr><td><strong>Messengers</strong></td><td>Shot</td><td>Neglected</td><td>Trained</td></tr>
            <tr><td><strong>Responsibilities</strong></td><td>Shirked</td><td>Narrow</td><td>Shared</td></tr>
            <tr><td><strong>Bridging</strong></td><td>Discouraged</td><td>Tolerated</td><td>Encouraged</td></tr>
            <tr><td><strong>Failure</strong></td><td>Leads to scapegoating</td><td>Leads to justice</td><td>Leads to inquiry</td></tr>
            <tr><td><strong>Novelty</strong></td><td>Crushed</td><td>Creates problems</td><td>Implemented</td></tr>
          </tbody>
        </table>
        <div className="key-point"><strong>Key finding:</strong> Culture is not just "nice to have." Generative culture predicts software delivery performance, organizational performance, AND employee satisfaction. It's the strongest predictor of all.</div>
      </div>

      <div className="section">
        <h3>What Doesn't Work (Myths Busted)</h3>
        <div className="key-point"><strong>Myth: You must choose speed or stability.</strong> Reality: High performers have BOTH. There is no tradeoff.</div>
        <div className="key-point"><strong>Myth: Change Advisory Boards improve stability.</strong> Reality: Heavyweight change approval processes slow delivery WITHOUT improving change failure rates. Peer review works better.</div>
        <div className="key-point"><strong>Myth: Maturity models work.</strong> Reality: Maturity models are flawed — they assume a linear progression and a fixed end state. Use capability models instead — they're dynamic and context-specific.</div>
        <div className="key-point"><strong>Myth: More senior engineers = better performance.</strong> Reality: Practices and capabilities matter more than tenure or individual talent.</div>
        <div className="key-point"><strong>Myth: You can't measure software development.</strong> Reality: You can. The DORA metrics do it rigorously.</div>
      </div>

      <div className="section">
        <h3>The Business Case</h3>
        <div className="key-point">High-performing teams are <strong>2x more likely to exceed profitability, market share, and productivity goals</strong>. This isn't just about tech — it predicts business outcomes.</div>
        <div className="key-point"><strong>Burnout is preventable.</strong> Deployment pain, rework, and lack of autonomy predict burnout. The same practices that improve delivery performance also reduce burnout.</div>
        <div className="key-point"><strong>Diversity matters.</strong> Teams with more diverse representation are better at building for diverse users and making better decisions.</div>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"Throughput and stability move together. High performers do better on all four metrics."</blockquote>
        <blockquote>"If it hurts, do it more often, and bring the pain forward."</blockquote>
        <blockquote>"The technology we build mirrors our communication structures." — Conway's Law, validated by DORA research</blockquote>
        <blockquote>"Burnout can be prevented or reversed. It is not the price you pay for high performance — it is the consequence of bad practices."</blockquote>
        <blockquote>"There is no tradeoff between speed and stability. None."</blockquote>
      </div>

      <div className="section">
        <h3>How to Apply DORA Metrics</h3>
        <ol className="framework-steps">
          <li><strong>Measure your four metrics</strong> — deployment frequency, lead time, change failure rate, MTTR. Be honest.</li>
          <li><strong>Identify your weakest metric</strong> — that's your constraint (Theory of Constraints applies here).</li>
          <li><strong>Pick 2-3 capabilities to invest in</strong> — from the 24 capabilities, choose the ones most likely to move your weakest metric.</li>
          <li><strong>Improve in small batches</strong> — don't transform everything at once. Iterate.</li>
          <li><strong>Measure again</strong> — track progress quarterly. The metrics will tell you if you're improving.</li>
        </ol>
        <div className="key-point"><strong>Warning from DORA:</strong> Don't use these metrics to compare teams against each other. Use them for teams to measure their own improvement over time. Using them as targets creates gaming and destroys trust.</div>
      </div>

      <div className="section">
        <h3>Connected Reading</h3>
        <table>
          <thead><tr><th>Book</th><th>Connection</th></tr></thead>
          <tbody>
            <tr><td><strong>The Phoenix Project</strong> — Kim, Behr, Spafford</td><td>The novel that brought DevOps to life — Accelerate provides the science behind it</td></tr>
            <tr><td><strong>The DevOps Handbook</strong> — Kim, Humble, Debois, Willis</td><td>The practical how-to guide; Accelerate is the research proving it works</td></tr>
            <tr><td><strong>Deming's Journey to Profound Knowledge</strong> — John Willis</td><td>The quality movement roots — Deming's systems thinking → DORA metrics</td></tr>
            <tr><td><strong>The Goal</strong> — Eliyahu Goldratt</td><td>Theory of Constraints — the same thinking applies to software delivery bottlenecks</td></tr>
            <tr><td><strong>Vibe Coding</strong> — Gene Kim, Steve Yegge</td><td>Kim's latest — AI-assisted dev as the next evolution after DevOps</td></tr>
            <tr><td><strong>Lean Enterprise</strong> — Humble, Molesky, O'Reilly</td><td>Applying lean principles at enterprise scale</td></tr>
            <tr><td><strong>Team Topologies</strong> — Skelton, Pais</td><td>The architecture and team structure findings validated by DORA research</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Action Items</h3>
        <div className="action-item"><strong>Measure your DORA metrics</strong> — start with deployment frequency and lead time (easiest to track)</div>
        <div className="action-item"><strong>Assess your culture</strong> — use the Westrum typology. Are messengers shot, neglected, or trained?</div>
        <div className="action-item"><strong>Automate your deployment pipeline</strong> — if deploying is painful, do it more often until it's boring</div>
        <div className="action-item"><strong>Kill your CAB</strong> — replace heavyweight change approval with peer review</div>
        <div className="action-item"><strong>Limit WIP</strong> — fewer things in flight means more things finished</div>
        <div className="action-item"><strong>Invest in trunk-based development</strong> — short-lived branches, merge daily</div>
        <div className="action-item"><strong>Shift security left</strong> — integrate security scanning into CI/CD, not a gate at the end</div>
        <div className="action-item"><strong>Build a learning culture</strong> — blameless postmortems, time for experimentation, psychological safety</div>
      </div>
    </div>
  )
}
