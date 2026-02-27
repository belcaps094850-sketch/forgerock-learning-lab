import BackLink from './BackLink'

export default function TheGoal({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/the-goal.jpg" alt="The Goal cover" loading="lazy" />
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
