import BackLink from './BackLink'

export default function VibeCoding({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/vibe-coding.jpg" alt="Vibe Coding cover" />
        <div>
          <h2>Vibe Coding: Building Production-Grade Software With GenAI</h2>
          <div className="meta"><strong>Authors:</strong> Gene Kim &amp; Steve Yegge &nbsp;|&nbsp; <strong>Foreword:</strong> Dario Amodei &nbsp;|&nbsp; <strong>Published:</strong> October 2025 &nbsp;|&nbsp; <strong>Researched by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> February 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>By the authors of <em>The Phoenix Project</em> / <em>The DevOps Handbook</em> (Kim) and a veteran of Google, Amazon, and Sourcegraph (Yegge). Explores how <strong>vibe coding</strong> — using GenAI to generate code from natural language descriptions — is transforming software development. Covers practical strategies from small projects to enterprise-scale applications, with real-world case studies showing dramatic productivity gains while maintaining engineering excellence.</p>
        <blockquote>"Science fiction is now reality. Programmers no longer need to toil over code and syntax. They can now describe what they want and watch it materialize instantly."</blockquote>
      </div>

      <div className="section">
        <h3>Key Takeaways</h3>
        <div className="key-point">Vibe coding transforms complex programming into <strong>fluid conversations</strong> with GenAI</div>
        <div className="key-point">Developers shift from writing code to <strong>directing AI agents</strong> — intent and flow over syntax</div>
        <div className="key-point">One person with AI can achieve what previously required <strong>a team</strong></div>
        <div className="key-point">Build confidently in <strong>languages and frameworks you've never used</strong> before</div>
        <div className="key-point">Quality, security, and architecture judgment remain <strong>human responsibilities</strong></div>
        <div className="key-point">AI coding is not just faster — it <strong>fundamentally changes</strong> how we approach development</div>
        <div className="key-point">Patience and iteration matter — <strong>AI doesn't get it right in one shot</strong></div>
      </div>

      <div className="section">
        <h3>Core Principles</h3>

        <h4>From Writing to Directing</h4>
        <div className="key-point">Developers shift from manual coding to directing AI coding agents. The skill becomes knowing <strong>what to ask for</strong>, how to evaluate results, and when to intervene.</div>

        <h4>FAAFO — Transformative Potential at Scale</h4>
        <div className="key-point">Real-world case studies show extraordinary results. A developer built 2,600 lines of Python with docs and CLI flags in 2 hours while multitasking. A person who hadn't coded in 20 years built working tools.</div>

        <h4>Lowered Barriers, Raised Stakes</h4>
        <div className="key-point">More people can create software than ever before, but responsibility for <strong>quality, security, and architecture</strong> becomes more critical — not less.</div>

        <h4>Patience and Iteration</h4>
        <div className="key-point">AI doesn't produce perfect code in one pass. Success comes from <strong>iterating, guiding, and refining</strong> — treating AI as a collaborator, not a magic wand.</div>

        <h4>Co-Creation Over Automation</h4>
        <div className="key-point">The best results come from mastering the art of <strong>co-creating</strong> with your AI companion — it's a conversation, not a command.</div>

        <h4>Break Free From Traditional Constraints</h4>
        <div className="key-point">Syntax, setup, and unfamiliar frameworks no longer block progress. Developers can <strong>build in languages they've never used</strong> before.</div>
      </div>

      <div className="section">
        <h3>Case Study: Luke Burton's CNC Firmware</h3>
        <p>Luke Burton (nearly two decades at Apple, including technical readiness for Swift's 2014 WWDC launch) used Claude Code to build a Python program automating CNC firmware uploads — <strong>2,600 lines with documentation and proper CLI flags in 2 hours</strong>. His collaborator in Germany was amazed.</p>
        <blockquote>"You ain't seen nothing yet — give me 15 minutes, and this thing will have an interactive mode with GNU readline support."</blockquote>
        <div className="key-point">"2600 lines of Python with documentation and proper CLI flags. It cost me $50 in Claude Code tokens, but I'm not complaining!"</div>
      </div>

      <div className="section">
        <h3>Key Quotes</h3>
        <blockquote>"Science fiction is now reality. Programmers no longer need to toil over code and syntax. They can now describe what they want and watch it materialize instantly."</blockquote>
        <blockquote>"Don't get left behind in the biggest transformation our industry has seen since the internet revolution."</blockquote>
      </div>

      <div className="section">
        <h3>Action Items</h3>
        <div className="action-item"><strong>Experiment with AI coding tools</strong> (Claude Code, Codex, Copilot) in your daily workflow</div>
        <div className="action-item"><strong>Practice prompt engineering</strong> for code generation — specificity and iteration matter</div>
        <div className="action-item"><strong>Build review and testing skills</strong> — AI-generated code still needs human judgment</div>
        <div className="action-item"><strong>Try building something</strong> in a language or framework you've never used</div>
        <div className="action-item"><strong>Start small</strong> — automate a tedious task with AI-assisted coding to build confidence</div>
        <div className="action-item"><strong>Shift mindset</strong> from "writing code" to "directing and reviewing AI output"</div>
      </div>

      <div className="section">
        <h3>Connected Reading</h3>
        <table>
          <thead><tr><th>Book</th><th>Connection</th></tr></thead>
          <tbody>
            <tr><td><strong>The Phoenix Project</strong> — Kim, Behr, Spafford</td><td>Kim's foundational DevOps novel — the origin of the Three Ways</td></tr>
            <tr><td><strong>The Unicorn Project</strong> — Gene Kim</td><td>Developer perspective on DevOps, the Five Ideals</td></tr>
            <tr><td><strong>The DevOps Handbook</strong> — Kim, Humble, Debois, Willis</td><td>Practical guide to the principles behind Phoenix Project</td></tr>
            <tr><td><strong>Accelerate</strong> — Forsgren, Humble, Kim</td><td>Research-backed metrics for software delivery performance</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
