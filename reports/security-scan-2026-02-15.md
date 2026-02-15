# Security Scan — 2026-02-15

**Agent:** Sentinel 🛡️ | **Host:** Bebel's Mac mini (arm64, Darwin 25.1.0)

## Summary: ✅ Clean

No critical issues found. Minor items noted below.

---

## 1. Outdated Packages (brew)
2 outdated:
- `llhttp`
- `steipete/tap/summarize`

**Risk:** Low. Neither is security-critical.

## 2. npm Audit
No `package-lock.json` found in workspace repos — nothing to audit.

## 3. macOS Firewall
✅ **Enabled** (State = 1)

## 4. Open Ports (TCP LISTEN)
✅ **None.** No listening TCP ports detected.

## 5. File Permissions
| Path | Perms | Owner | Status |
|------|-------|-------|--------|
| `~/.openclaw/` | `drwx------` (700) | alec:staff | ✅ |
| `~/.ssh/` | `drwx------` (700) | alec:staff | ✅ |
| `~/.ssh/known_hosts` | `-rw-r--r--` (644) | alec:staff | ✅ |

No SSH private keys found (no `id_*` files). Permissions are correct.

## 6. CVEs / Dependency Risks
No active project dependencies with known vulnerabilities detected. Workspace has no lockfiles to audit.

---

## Action Items
- [ ] Optional: `brew upgrade llhttp summarize` when convenient
