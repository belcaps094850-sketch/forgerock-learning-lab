import './SreDigest.css'

const days = [
  {
    date: 'February 18, 2026',
    entries: [
      {
        title: '1. Azure Outage \u2014 Automated Remediation Triggers Cascading Failure',
        body: 'A February 2 Azure misconfiguration escalated into a cloud-wide cascading outage. The twist: the automated remediation system itself amplified the blast radius through hidden service dependencies. A textbook case of why you test your safety nets and map dependency chains.',
        links: [
          { label: 'Windows News AI', url: 'https://windowsnews.ai/article/azure-outage-2026-how-automated-remediation-triggered-a-cloud-wide-cascade.401474' },
          { label: 'InfoWorld', url: 'https://www.infoworld.com/article/4132902/why-cloud-outages-are-becoming-normal.html' },
        ],
      },
      {
        title: '2. Agentic AI in SRE & DevOps \u2014 From Alerts to Actions',
        body: 'AI agents are entering on-call workflows. Macquarie Bank deployed "agentic SRE" for its digital bank, a practitioner blog details how context-rich incident summaries replace raw alerts, and GitHub previewed Agentic Workflows for CI/CD. The ops role is shifting from "respond to pages" to "supervise the bots that respond."',
        links: [
          { label: 'Bajonczak Blog', url: 'https://blog.bajonczak.com/from-alerts-to-actions-how-agentic-ai-is-changing-devops-in-2026/' },
          { label: 'ITnews', url: 'https://www.itnews.com.au/news/macquarie-brings-agentic-sre-to-its-digital-bank-623685' },
          { label: 'The Register', url: 'https://www.theregister.com/2026/02/17/github_previews_agentic_workflows/' },
        ],
      },
      {
        title: '3. Chaos Engineering on GKE + Proactive Kubernetes Autoscaling',
        body: 'Two practitioner guides dropped: running Chaos Mesh experiments on GKE, and proactive (predictive) autoscaling for edge Kubernetes workloads. Both push "shift-left on reliability" \u2014 break things intentionally and scale before traffic spikes hit.',
        links: [
          { label: 'OneUptime', url: 'https://oneuptime.com/blog/post/2026-02-17-how-to-run-chaos-engineering-experiments-on-gke-using-chaos-mesh-on-google-cloud/view' },
          { label: 'InfoQ', url: 'https://www.infoq.com/articles/proactive-autoscaling-edge-kubernetes/' },
        ],
      },
    ],
  },
  {
    date: 'February 17, 2026',
    entries: [
      {
        title: '1. Gas Town \u2014 Kubernetes for AI Coding Agent Swarms',
        body: 'Steve Yegge (ex-Amazon/Google/Sourcegraph) open-sourced Gas Town \u2014 an orchestration system that coordinates 20-30 Claude Code instances working in parallel on the same codebase using Kubernetes-style patterns (control plane, ephemeral workers, persistent goals). The first serious answer to "what does SRE look like when your workers are AI agents?"',
        links: [
          { label: 'Cloud Native Now', url: 'https://cloudnativenow.com/features/gas-town-what-kubernetes-for-ai-coding-agents-actually-looks-like/' },
        ],
      },
      {
        title: '2. X (Twitter) Global Timeline Outage',
        body: 'X went down on Feb 16 \u2014 timelines failed to load for users worldwide. Classic platform reliability failure and a ready-made incident case study in capacity planning and what happens when engineering culture erodes.',
        links: [
          { label: 'The Register', url: 'https://www.theregister.com/2026/02/16/x_timeline_outage/' },
        ],
      },
      {
        title: '3. AI Will Automate 80% of Telemetry Pipeline Work',
        body: 'New analysis predicts AI agents will handle the bulk of observability pipeline configuration \u2014 auto-scanning Kubernetes environments, identifying services, recognizing deployment patterns, and configuring telemetry. Major implications for SRE toil reduction and the future of observability engineering.',
        links: [
          { label: 'CPO Magazine', url: 'https://www.cpomagazine.com/cyber-security/ai-will-automate-80-of-telemetry-pipeline-work-by-2026-heres-what-that-means-for-devops-teams/' },
        ],
      },
    ],
  },
  {
    date: 'February 16, 2026',
    entries: [
      {
        title: '1. Google SREs Using Gemini CLI for Outage Response',
        body: "Google published how their SREs use the AI-powered Gemini CLI to reduce MTTM during real incidents \u2014 log analysis, generating fixes, and auto-creating postmortems by scraping incident conversation history. The most concrete example yet of AI in production SRE workflows.",
        links: [
          { label: 'InfoQ coverage', url: 'https://www.infoq.com/news/2026/02/google-sre-gemini-cli-outage/' },
          { label: 'WebProNews', url: 'https://www.webpronews.com/google-sres-use-ai-gemini-cli-to-combat-cloud-outages-effectively/' },
        ],
      },
      {
        title: '2. Resolve AI Hits $1B Valuation with $125M Series A',
        body: 'AI SRE startup Resolve AI raised $125M at unicorn valuation. Their agents autonomously debug and operate production systems at major tech and financial companies. Big signal: serious capital betting on AI replacing on-call toil.',
        links: [
          { label: 'Resolve AI blog', url: 'https://resolve.ai/blog/series-a-funding' },
          { label: 'PYMNTS', url: 'https://www.pymnts.com/news/investment-tracker/2026/resolve-ai-raises-125-million-for-ai-agents-that-maintain-software/' },
        ],
      },
      {
        title: '3. 2026 SRE Report: Reliability as a Business Function',
        body: 'After 8 years of data, the 2026 SRE Report shows reliability has outgrown engineering \u2014 it now shapes business operations. Agentic SRE and self-healing infrastructure are moving from buzzword to production reality.',
        links: [
          { label: 'Observability.com', url: 'https://observability.com/what-the-2026-sre-report-reveals-about-business-ai-and-risk/' },
          { label: 'Unite.AI', url: 'https://www.unite.ai/agentic-sre-how-self-healing-infrastructure-is-redefining-enterprise-aiops-in-2026/' },
        ],
      },
    ],
  },
  {
    date: 'February 13, 2026',
    entries: [
      {
        title: '1. AI for Incident Response: Hype vs. Reality',
        body: 'Hot r/sre discussion evaluating Resolve.ai and Traversal \u2014 AI platforms claiming to reduce MTTR and automate incident investigations. The community is split on whether these are genuinely useful or just "LLM-wrapped runbooks" that add noise. Key concerns: signal-to-noise ratio, integration with existing observability stacks, and real differentiation.',
        links: [
          { label: 'r/sre discussion', url: 'https://reddit.com/r/sre/comments/1r2zm8x/resolveai_traversal/' },
        ],
      },
      {
        title: '2. Big Tech DevOps/SRE Interview Questions (Amazon, Google, Apple)',
        body: 'Massive 179-upvote post \u2014 an engineer compiled real interview questions from FAANG companies into a free GitHub repo with video walkthroughs. Covers system design, infrastructure, and operational scenarios. Solid prep resource.',
        links: [
          { label: 'r/devops discussion', url: 'https://reddit.com/r/devops/comments/1r31kvd/' },
          { label: 'GitHub repo', url: 'https://github.com/devops-interviews/devops-interviews' },
        ],
      },
      {
        title: '3. Databases In vs. Out of Kubernetes',
        body: 'Active r/kubernetes debate on the classic architecture question: run stateful services (Postgres via Crunchy operator, Redis) inside the cluster, or use managed cloud services? Discussion covers HA tradeoffs, cost implications on Azure node tiers, and operational complexity. No consensus \u2014 which is itself the answer.',
        links: [
          { label: 'r/kubernetes discussion', url: 'https://reddit.com/r/kubernetes/comments/1r2zabx/do_you_run_everything_in_your_cluster/' },
        ],
      },
    ],
  },
]

export default function SreDigest() {
  return (
    <div className="content">
      <h1 className="page-title" style={{ textAlign: 'center' }}>🔧 SRE Daily Digest</h1>
      <p className="subtitle" style={{ textAlign: 'center' }}>Top trending SRE topics — updated weekdays at 3 AM ET</p>

      {days.map((day, i) => (
        <div key={i}>
          <h3 className="sre-date-heading">📅 {day.date}</h3>
          {day.entries.map((entry, j) => (
            <div key={j} className="digest-entry">
              <div className="sre-topic">
                <h4>{entry.title}</h4>
                <p>{entry.body}</p>
                <p>
                  🔗{' '}
                  {entry.links.map((link, k) => (
                    <span key={k}>
                      {k > 0 && ' \u00B7 '}
                      <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
