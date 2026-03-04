# Kubernetes Learning Path

**Student:** Bel | **Started:** 2026-03-04 | **Level:** Beginner

## Progress Tracker

| Day | Topic | Status | Date |
|-----|-------|--------|------|
| 1 | What is K8s & First Pod | ✅ Done | 2026-03-04 |
| 2 | Deployments & ReplicaSets | 🔲 Next | |
| 3 | Services & Networking | 🔲 | |
| 4 | ConfigMaps & Secrets | 🔲 | |
| 5 | Storage (PV & PVC) | 🔲 | |
| 6 | Namespaces & RBAC | 🔲 | |
| 7 | Helm & Package Management | 🔲 | |
| 8 | Health Checks & Resource Limits | 🔲 | |
| 9 | Ingress & Load Balancing | 🔲 | |
| 10 | Real-World Project | 🔲 | |

## Setup
- **Tool:** minikube (Docker driver) on Mac mini (arm64)
- **K8s version:** v1.35.1
- **Start cluster:** `minikube start`
- **Stop cluster:** `minikube stop`

---

## Day 1: What is Kubernetes & Your First Pod

### Why Kubernetes?
Containers (Docker) solve "it works on my machine." Kubernetes solves "how do I run 50 containers across 10 machines without losing my mind."

You tell K8s **what you want** (desired state), and it figures out **how to make it happen** (actual state). This is called the **declarative model**.

### Core Vocabulary

| Term | What it is |
|------|-----------|
| **Cluster** | The whole system — all machines managed together |
| **Node** | One machine in the cluster |
| **Pod** | Smallest deployable unit — wraps 1+ containers |
| **Container** | Your actual app (Docker image running) |
| **Namespace** | Logical grouping (like folders) |
| **Control Plane** | The brain — API Server, Scheduler, etcd, Controller Manager |
| **kubelet** | Agent on each node that runs pods |
| **kubectl** | CLI to talk to the cluster |

### Architecture

```
┌─────────────────────────────────────────┐
│              CONTROL PLANE              │
│  ┌───────────┐ ┌──────────┐ ┌────────┐ │
│  │ API Server│ │Scheduler │ │  etcd  │ │
│  └───────────┘ └──────────┘ └────────┘ │
│  ┌────────────────────┐                 │
│  │ Controller Manager │                 │
│  └────────────────────┘                 │
└─────────────────────────────────────────┘
          │
          ▼
┌──────────────┐  ┌──────────────┐
│   WORKER 1   │  │   WORKER 2   │
│  kubelet     │  │  kubelet     │
│  Pod A       │  │  Pod C       │
│  Pod B       │  │  Pod D       │
└──────────────┘  └──────────────┘
```

- **API Server** — front door; all commands go through it
- **etcd** — key-value store; holds all cluster state
- **Scheduler** — picks which node runs a new pod
- **Controller Manager** — watches cluster, fixes drift (self-healing)

### Essential Commands

```bash
minikube start                          # Start cluster
kubectl get nodes                       # Show nodes
kubectl get pods                        # List pods
kubectl get pods -A                     # All namespaces
kubectl run <name> --image=<img>        # Create a pod
kubectl describe pod <name>             # Pod details
kubectl logs <name>                     # View logs
kubectl exec <name> -- <cmd>            # Run cmd in pod
kubectl delete pod <name>               # Delete pod
kubectl cluster-info                    # Cluster endpoint info
```

### Key Takeaways
1. K8s is a **container orchestrator** — manages where containers run and keeps them healthy
2. You deploy **Pods**, not containers directly
3. The **control plane** makes decisions; **worker nodes** run your stuff
4. `kubectl` is your primary interface — learn it well
5. K8s uses a **declarative model**: you describe desired state, it converges

### What's Next (Day 2)
- **Deployments** — the real way to run apps (not bare pods)
- **ReplicaSets** — running multiple copies of your app
- **Rolling updates** — updating without downtime
- YAML manifests — defining resources as code
