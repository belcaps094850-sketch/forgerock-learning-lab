#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchMultipleSubreddits } from './lib/reddit.mjs'
import { summarizeWithClaude } from './lib/claude.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = resolve(__dirname, '../public/data/sre-digest.json')
const MAX_ENTRIES = 30

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// Idempotent: skip if today's entry already exists
const data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
if (data[0]?.date === today) {
  console.log(`Already updated for ${today}`)
  process.exit(0)
}

console.log(`Fetching r/sre + r/devops posts...`)
const posts = await fetchMultipleSubreddits(['sre', 'devops'], { limit: 25 })
if (posts.length === 0) {
  console.error('No posts fetched — skipping update')
  process.exit(1)
}

const postSummary = posts
  .map((p, i) => `${i + 1}. [${p.score} pts, ${p.numComments} comments] ${p.title}\n   URL: ${p.url}\n   Permalink: ${p.permalink}\n   ${p.selftext ? `Text: ${p.selftext}` : ''}`)
  .join('\n\n')

console.log(`Summarizing ${posts.length} posts with Claude...`)
const entries = await summarizeWithClaude(
  `You curate an SRE/DevOps digest. Given Reddit posts from r/sre and r/devops, select the top 3 most noteworthy stories and produce a JSON array.

Each item: {"title": "N. Headline", "body": "...", "links": [{"label": "...", "url": "..."}]}

Rules:
- title: numbered ("1. Title", "2. Title", "3. Title") with a punchy headline
- body: 2-4 sentences explaining the significance for SRE/DevOps practitioners
- links: array with Reddit discussion link + any external article URLs mentioned
- Return ONLY the JSON array, no markdown fences or extra text`,
  `Today is ${today}. Here are the current hot posts from r/sre and r/devops:\n\n${postSummary}`,
)

if (!entries || !Array.isArray(entries)) {
  console.error('Claude returned invalid data — skipping update')
  process.exit(1)
}

data.unshift({ date: today, entries })
writeFileSync(DATA_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`SRE Digest updated for ${today} (${entries.length} stories)`)
