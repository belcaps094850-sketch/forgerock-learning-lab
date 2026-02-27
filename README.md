# ForgeRock Learning Lab

A React SPA for daily engineering digests, book notes, and interactive IAM learning. Deployed on AWS Amplify — push to `main` triggers a rebuild.

## Pages

| Route | Description | Data source |
|-------|-------------|-------------|
| `/` | Home dashboard | — |
| `/daily-brief` | Daily brief across AI, SRE, React, Security, MSL | `public/data/briefs.json` |
| `/react-radar` | Curated React ecosystem news | `public/data/react-radar.json` |
| `/sre-digest` | SRE & DevOps digest | `public/data/sre-digest.json` |
| `/books` | Book notes with full write-ups | `public/data/books.json` |
| `/poc-playground` | POC project tracker | `public/data/pocs.json` |
| `/auth-flows` | Interactive ForgeRock auth chain visualizer | — |
| `/iam-demo` | ForgeRock IAM simulation | — |

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Tech Stack

- **React 19** + React Router 7
- **Vite 7** — build and dev server
- **ESLint** + **Prettier** — code quality
- **Vitest** — tests
- **AWS Amplify** — hosting (auto-deploy on push to main)

## Project Structure

```
public/data/          JSON data files (digests, books, POCs)
public/images/books/  Book cover images
src/
  components/         Shared components (Layout, ErrorBoundary, LoadingSkeleton)
  hooks/              Custom hooks (useJsonData, usePageMeta)
  pages/              Page components
  pages/books/        Individual book note components
scripts/              Data update automation (separate package.json)
  lib/                Shared utilities (Reddit fetch, Claude summarization)
.github/workflows/    GitHub Actions (daily digest cron)
```

---

## Automated Data Updates

Page data is stored as static JSON in `public/data/`. Node scripts in `scripts/` fetch Reddit posts, summarize them with Claude, and update the JSON files. Pushing the changes to `main` triggers an Amplify rebuild.

### How It Works

```
Reddit API (r/reactjs, r/sre, r/devops, etc.)
        |
  Node.js scripts (scripts/)
        |
  Claude API (Sonnet) — summarize posts into structured JSON
        |
  Prepend entry to public/data/*.json (idempotent, capped at 30)
        |
  git commit + push (GitHub Actions cron or manual)
        |
  Amplify auto-rebuilds
```

### Setup

1. Install script dependencies (separate from the frontend):
   ```bash
   cd scripts && npm install
   ```

2. Set your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

3. For GitHub Actions, add `ANTHROPIC_API_KEY` as a repository secret.

### Running Locally

```bash
# Individual digests
npm run update:radar     # React Radar — r/reactjs
npm run update:sre       # SRE Digest — r/sre + r/devops
npm run update:brief     # Daily Brief — 5 categories, 7 subreddits

# All three
npm run update:all
```

Each script is **idempotent** — if today's entry already exists, it exits with "Already updated." Safe to re-run.

### GitHub Actions (Automated)

The workflow at `.github/workflows/update-digests.yml` runs on weekdays at 8:00 UTC (~3 AM ET). It:

1. Checks out the repo
2. Installs script deps (`cd scripts && npm ci`)
3. Runs all three update scripts
4. Commits and pushes any changes to `public/data/`

You can also trigger it manually from the Actions tab with a target selector (`all`, `sre`, `radar`, or `brief`).

### Adding a New Book

```bash
npm run add:book -- \
  --id "clean-code" \
  --title "Clean Code" \
  --author "Robert Martin" \
  --topic "Code quality" \
  --cover "https://covers.openlibrary.org/b/id/8225261-L.jpg"
```

This will:
1. Download and resize the cover image to `public/images/books/{id}.jpg`
2. Add an entry to `public/data/books.json`
3. Scaffold a component at `src/pages/books/{PascalCase}.jsx` with TODO sections
4. Register the import and mapping in `src/pages/BookNotes.jsx`

Edit the generated component to fill in the book content, then `npm run build` to verify.

### Script Details

| Script | Subreddits | Output | Claude prompt |
|--------|-----------|--------|---------------|
| `update-react-radar.mjs` | `r/reactjs` | 5-6 topics with title, URL, meta, summary | Select most interesting posts |
| `update-sre-digest.mjs` | `r/sre`, `r/devops` | 3 numbered stories with links | Select top SRE/DevOps stories |
| `update-daily-brief.mjs` | 7 subs across 5 categories | topPick, summary, digest per category | Summarize category trends |
| `add-book.mjs` | — | Book entry, component, image | — (no AI, CLI tool) |

### Design Decisions

- **Separate `scripts/package.json`** — keeps `@anthropic-ai/sdk` out of frontend deps and Amplify builds
- **Sequential Reddit fetches** with 2-3s gaps — avoids 429 rate limits on unauthenticated Reddit API
- **Sonnet model** — ~$0.10-0.30/day for all 3 digests
- **Idempotent by date** — checks if `data[0].date` matches today before doing anything
- **Cap at 30 entries** — keeps each JSON file under ~50KB
- **POC highlight rotation** — `dayOfYear % pocs.length` for stable daily rotation in briefs

---

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Vitest |
| `npm run preview` | Preview production build |
| `npm run update:radar` | Update React Radar |
| `npm run update:sre` | Update SRE Digest |
| `npm run update:brief` | Update Daily Brief |
| `npm run update:all` | Update all digests |
| `npm run add:book` | Add a new book |
