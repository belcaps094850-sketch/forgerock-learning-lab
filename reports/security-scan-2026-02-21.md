# Sentinel Security Scan — 2026-02-21

**Host:** Bebel's Mac mini (Darwin arm64)  
**Time:** 06:13 AM ET

## Summary

✅ **All clear** — no critical issues found.

## Checks

### 1. Brew Outdated Packages
9 outdated: `ffmpeg`, `gemini-cli`, `gh`, `libvpx`, `memo`, `ollama`, `pybind11`, `summarize`, `uv`

⚠️ **Note:** `gh` (GitHub CLI) should be updated when convenient — security-adjacent tooling.

### 2. npm Audit
No `package-lock.json` files found in workspace. Nothing to audit.

### 3. macOS Firewall
- **Firewall:** ✅ Enabled
- **Stealth mode:** ✅ On

### 4. Open Ports
✅ No TCP listening ports detected.

### 5. File Permissions
| Path | Perms | Status |
|------|-------|--------|
| `~/.ssh/` | `drwx------` | ✅ |
| `~/.openclaw/` | `drwx------` | ✅ |
| `~/.openclaw/credentials/` | `drwx------` | ✅ |
| `~/.ssh/known_hosts` | `-rw-r--r--` | ✅ (public data) |

### 6. CVE Check
No npm/node dependencies to scan. Key system tools (brew packages) are outdated but no critical CVEs flagged in current versions.

## Recommendations
- Run `brew upgrade` to catch up on 9 outdated packages (low priority, none critical).
