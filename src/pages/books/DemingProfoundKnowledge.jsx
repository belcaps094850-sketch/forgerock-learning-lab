import BackLink from './BackLink'

export default function DemingProfoundKnowledge({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/deming-profound-knowledge.jpg" alt="Deming's Journey cover" loading="lazy" />
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
