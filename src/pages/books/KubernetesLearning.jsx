import BackLink from './BackLink'

export default function KubernetesLearning({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/kubernetes-learning.jpg" alt="Kubernetes logo" loading="lazy" />
        <div>
          <h2>Kubernetes Learning Path</h2>
          <div className="meta"><strong>Type:</strong> Hands-on Learning Plan &nbsp;|&nbsp; <strong>Topic:</strong> Container Orchestration &nbsp;|&nbsp; <strong>Created by:</strong> Alec 🦞 &nbsp;|&nbsp; <strong>Date:</strong> March 2026</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>A 4-week hands-on plan to learn Kubernetes from scratch. Each week builds on the previous one — concepts through practice, not just reading. Uses <strong>minikube</strong> for a local cluster on your Mac.</p>
        <blockquote>"K8s is the Three Ways in infrastructure form — flow (deployments), feedback (health checks), continual learning (rolling updates)."</blockquote>
      </div>

      <div className="section">
        <h3>Quick Reference</h3>
        <table>
          <thead><tr><th>Concept</th><th>What It Does</th><th>Analogy</th></tr></thead>
          <tbody>
            <tr><td><strong>Pod</strong></td><td>Runs containers</td><td>A single server process</td></tr>
            <tr><td><strong>Deployment</strong></td><td>Manages pod replicas</td><td>An auto-scaling group</td></tr>
            <tr><td><strong>Service</strong></td><td>Stable network endpoint</td><td>A load balancer</td></tr>
            <tr><td><strong>ConfigMap</strong></td><td>External config</td><td>Environment variables file</td></tr>
            <tr><td><strong>Secret</strong></td><td>Sensitive config</td><td>Encrypted env vars</td></tr>
            <tr><td><strong>PVC</strong></td><td>Persistent storage</td><td>An external hard drive</td></tr>
            <tr><td><strong>Namespace</strong></td><td>Isolation boundary</td><td>Separate environments</td></tr>
            <tr><td><strong>Ingress</strong></td><td>HTTP routing</td><td>Reverse proxy (nginx)</td></tr>
            <tr><td><strong>Helm</strong></td><td>Package manager</td><td>npm/brew for K8s</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Week 1: Foundations</h3>
        <div className="key-point"><strong>Goal:</strong> Understand what K8s is, run your first cluster, create your first pod.</div>
        <h4>Concepts</h4>
        <ul className="plain">
          <li>Containers vs VMs — why containers exist</li>
          <li>K8s architecture — control plane vs worker nodes</li>
          <li>Key objects — Pods, Nodes, Namespaces</li>
        </ul>
        <h4>Labs</h4>
        <div className="action-item"><strong>Lab 1:</strong> Install minikube, start a cluster, explore with kubectl</div>
        <div className="action-item"><strong>Lab 2:</strong> Run an nginx pod, view logs, exec into it</div>
        <div className="action-item"><strong>Lab 3:</strong> Write your first YAML pod spec, apply and delete it</div>
        <div className="key-point"><strong>Key takeaway:</strong> A Pod wraps containers. You describe what you want in YAML, K8s makes it happen.</div>
      </div>

      <div className="section">
        <h3>Week 2: Deployments, Services &amp; Networking</h3>
        <div className="key-point"><strong>Goal:</strong> Scale apps, expose them to the network, do rolling updates.</div>
        <h4>Concepts</h4>
        <ul className="plain">
          <li>Deployments &amp; ReplicaSets — manage replicas and updates</li>
          <li>Services — ClusterIP, NodePort, LoadBalancer</li>
          <li>Labels &amp; Selectors — how K8s connects things</li>
        </ul>
        <h4>Labs</h4>
        <div className="action-item"><strong>Lab 4:</strong> Create a deployment with 3 replicas, scale up and down</div>
        <div className="action-item"><strong>Lab 5:</strong> Expose your app with a NodePort service, access in browser</div>
        <div className="action-item"><strong>Lab 6:</strong> Rolling update to a new image, then rollback</div>
        <div className="key-point"><strong>Key takeaway:</strong> Deployments manage lifecycle. Services give stable networking. Never talk to pods directly.</div>
      </div>

      <div className="section">
        <h3>Week 3: Configuration, Storage &amp; Secrets</h3>
        <div className="key-point"><strong>Goal:</strong> Externalize config, manage secrets, persist data.</div>
        <h4>Concepts</h4>
        <ul className="plain">
          <li>ConfigMaps &amp; Secrets — separate config from code</li>
          <li>Volumes, PersistentVolumes, PersistentVolumeClaims</li>
          <li>Environment variable injection</li>
        </ul>
        <h4>Labs</h4>
        <div className="action-item"><strong>Lab 7:</strong> Create ConfigMaps and Secrets, inject into a pod</div>
        <div className="action-item"><strong>Lab 8:</strong> Create persistent storage, write data, delete pod, verify data survives</div>
        <div className="key-point"><strong>Key takeaway:</strong> Config and secrets separate app from environment. Volumes make data survive pod deaths.</div>
      </div>

      <div className="section">
        <h3>Week 4: Real-World Patterns</h3>
        <div className="key-point"><strong>Goal:</strong> Production patterns — health checks, resource limits, Helm.</div>
        <h4>Concepts</h4>
        <ul className="plain">
          <li>Liveness &amp; readiness probes</li>
          <li>Resource requests &amp; limits (CPU, memory)</li>
          <li>Namespaces for multi-environment</li>
          <li>Helm — package management for K8s</li>
        </ul>
        <h4>Labs</h4>
        <div className="action-item"><strong>Lab 9:</strong> Add health checks and resource limits, watch self-healing</div>
        <div className="action-item"><strong>Lab 10:</strong> Create dev/staging/prod namespaces, deploy to each</div>
        <div className="action-item"><strong>Lab 11:</strong> Install WordPress with Helm (real app with database)</div>
        <div className="key-point"><strong>Key takeaway:</strong> Health checks, limits, namespaces, and Helm keep apps reliable and clusters organized.</div>
      </div>

      <div className="section">
        <h3>Resources</h3>
        <table>
          <thead><tr><th>Resource</th><th>What</th></tr></thead>
          <tbody>
            <tr><td><a href="https://kubernetes.io/docs/tutorials/" target="_blank" rel="noreferrer"><strong>kubernetes.io tutorials</strong></a></td><td>Official interactive tutorials</td></tr>
            <tr><td><a href="https://labs.play-with-k8s.com/" target="_blank" rel="noreferrer"><strong>Play with K8s</strong></a></td><td>Free browser-based cluster</td></tr>
            <tr><td><strong>Kubernetes the Hard Way</strong></td><td>Deep understanding (advanced)</td></tr>
            <tr><td><strong>The Phoenix Project</strong></td><td>The Three Ways → K8s connection</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
