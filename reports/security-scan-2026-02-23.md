# Sentinel Security Scan — 2026-02-23

## Summary

| Area | Status |
|------|--------|
| macOS Firewall | ✅ Enabled |
| Open Ports | ✅ None listening |
| File Permissions | ✅ Good (no SSH keys on disk; ~/.ssh and ~/.openclaw owner-only) |
| npm Audits (workspace) | ⚠️ 1 repo with issues |
| Brew Outdated | ℹ️ 9 packages outdated |

## Findings

### ⚠️ forgerock-learning: 4 high-severity npm vulnerabilities

All from **minimatch < 10.2.1** (ReDoS via repeated wildcards). Affects eslint dependency chain.

- `minimatch` → `@eslint/config-array` → `eslint`
- `minimatch` → `@eslint/eslintrc` → `eslint`

**Fix:** `npm audit fix --force` (upgrades eslint to v10, breaking change) or pin minimatch ≥10.2.1.

**Risk:** Low in practice — eslint is a dev tool, not runtime. ReDoS only exploitable if processing untrusted glob patterns.

### ✅ Other repos — clean

- medstoploss: 0 vulnerabilities
- mission-control: 0 vulnerabilities  
- morning-brief: 0 vulnerabilities

### ℹ️ Brew Outdated Packages

ffmpeg, gemini-cli, gh, libvpx, memo, ollama, pybind11, summarize, uv

No known critical CVEs in these versions. Routine updates recommended.

### ✅ File Permissions

- `~/.ssh/` — 700 (owner-only), no private keys stored
- `~/.openclaw/` — 700 (owner-only), credentials dir 700
- `known_hosts` is world-readable (harmless)

### ✅ Network

- Firewall: enabled
- No TCP ports listening externally
