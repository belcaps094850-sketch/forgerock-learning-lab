# Sentinel Security Scan — 2026-02-20

**Host:** Bebel's Mac mini | **OS:** macOS (Darwin 25.3.0 arm64) | **Time:** 06:11 EST

## ✅ Firewall

- Firewall: **enabled**
- Stealth mode: **on**

## ⚠️ Brew Outdated (8 packages)

| Package | Note |
|---------|------|
| ffmpeg | media processing |
| gemini-cli | CLI tool |
| gh | GitHub CLI |
| libvpx | video codec (ffmpeg dep) |
| memo | tap package |
| pybind11 | Python/C++ bindings |
| summarize | tap package |
| uv | Python package manager |

**Action:** Run `brew upgrade` when convenient. `libvpx` and `ffmpeg` occasionally have CVE fixes — worth prioritizing.

## ✅ npm Audit

No `node_modules` directories found in workspace repos. Nothing to audit.

## ✅ Open Ports

All listening services are on **localhost only** — nothing exposed externally:

| Port | Service | Risk |
|------|---------|------|
| 18789, 18792 | OpenClaw (node) | localhost ✅ |
| 11434 | Ollama | localhost ✅ |
| 39207 | VS Code Helper | localhost ✅ |
| 8888 | SearXNG (Docker) | **all interfaces** ⚠️ |
| 3001 | Mission Control | localhost ✅ |
| 3000 | Dev server | localhost ✅ |

**Note:** SearXNG on port 8888 binds to `*` (all interfaces). If on a shared/public network, consider restricting to localhost via Docker port mapping (`127.0.0.1:8888:8888`).

## ✅ File Permissions

- `~/.openclaw/` — `drwx------` (700) ✅ owner-only
- `~/.openclaw/credentials/` — `drwx------` (700) ✅
- `~/.openclaw/agents/` — `drwx------` (700) ✅
- `~/.ssh/` — `drwx------` (700) ✅
- No SSH private keys found (only `known_hosts`)

## Summary

| Check | Status |
|-------|--------|
| Firewall | ✅ Enabled + stealth |
| Brew packages | ⚠️ 8 outdated |
| npm audit | ✅ Clean |
| Open ports | ⚠️ SearXNG on all interfaces |
| File permissions | ✅ Secure |

**Priority actions:**
1. `brew upgrade ffmpeg libvpx` — potential security-relevant updates
2. Consider binding SearXNG to localhost only
