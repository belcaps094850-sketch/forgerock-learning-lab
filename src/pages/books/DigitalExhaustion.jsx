import BackLink from './BackLink'

export default function DigitalExhaustion({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/digital-exhaustion.jpg" alt="Digital Exhaustion cover" loading="lazy" />
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
