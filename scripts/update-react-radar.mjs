#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchSubredditPosts } from './lib/reddit.mjs'
import { summarizeWithClaude } from './lib/claude.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = resolve(__dirname, '../public/data/react-radar.json')
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

console.log(`Fetching r/reactjs posts...`)
const posts = await fetchSubredditPosts('reactjs', { limit: 25 })
if (posts.length === 0) {
  console.error('No posts fetched — skipping update')
  process.exit(1)
}

const postSummary = posts
  .map((p, i) => `${i + 1}. [${p.score} pts, ${p.numComments} comments] ${p.title}\n   URL: ${p.url}\n   Flair: ${p.flair || 'none'}\n   ${p.selftext ? `Text: ${p.selftext}` : ''}`)
  .join('\n\n')

console.log(`Summarizing ${posts.length} posts with Claude...`)
const topics = await summarizeWithClaude(
  `You curate a daily React ecosystem radar. Given Reddit posts from r/reactjs, select the 5-6 most interesting/impactful topics and produce a JSON array.

Each item: {"title": "...", "url": "...", "meta": "r/reactjs · [score] pts · [Category]", "summary": "..."}

Rules:
- title: catchy headline (not the raw Reddit title)
- url: the actual link (external article or Reddit permalink)
- meta: include the score and a short category tag (Discussion, Security, Tool, Resource, etc.)
- summary: 2-3 sentences explaining why this matters
- Return ONLY the JSON array, no markdown fences or extra text`,
  `Today is ${today}. Here are the current hot posts from r/reactjs:\n\n${postSummary}`,
)

if (!topics || !Array.isArray(topics)) {
  console.error('Claude returned invalid data — skipping update')
  process.exit(1)
}

data.unshift({ date: today, topics })
writeFileSync(DATA_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`React Radar updated for ${today} (${topics.length} topics)`)
