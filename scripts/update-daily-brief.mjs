#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchMultipleSubreddits } from './lib/reddit.mjs'
import { summarizeWithClaude } from './lib/claude.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '../public/data')
const BRIEFS_PATH = resolve(DATA_DIR, 'briefs.json')
const POCS_PATH = resolve(DATA_DIR, 'pocs.json')
const MAX_ENTRIES = 30

const now = new Date()
const isoDate = now.toISOString().split('T')[0] // "2026-02-27"

const CATEGORY_SUBS = {
  AI: ['artificial', 'MachineLearning'],
  SRE: ['sre', 'devops'],
  React: ['reactjs'],
  Security: ['netsec', 'cybersecurity'],
  MSL: ['healthIT'],
}

// Idempotent: skip if today's entry already exists
const data = JSON.parse(readFileSync(BRIEFS_PATH, 'utf-8'))
if (data[0]?.id === isoDate) {
  console.log(`Already updated for ${isoDate}`)
  process.exit(0)
}

// POC highlight: stable rotation by day of year
const pocs = JSON.parse(readFileSync(POCS_PATH, 'utf-8'))
const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
const poc = pocs[dayOfYear % pocs.length]
const pocHighlight = {
  title: poc.title,
  summary: poc.desc,
  category: poc.category,
}

const FALLBACK = {
  topPick: 'No updates today',
  summary: 'No significant developments surfaced from community sources.',
  digest: 'Quiet day — nothing noteworthy to report in this category.',
}

const categories = {}

for (const [category, subs] of Object.entries(CATEGORY_SUBS)) {
  console.log(`Fetching ${category}: ${subs.join(', ')}...`)
  const posts = await fetchMultipleSubreddits(subs, { limit: 25 })

  if (posts.length === 0) {
    console.warn(`No posts for ${category} — using fallback`)
    categories[category] = { ...FALLBACK }
    continue
  }

  const postSummary = posts
    .slice(0, 15)
    .map((p, i) => `${i + 1}. [${p.score} pts] ${p.title}\n   URL: ${p.url}\n   ${p.selftext ? `Text: ${p.selftext}` : ''}`)
    .join('\n\n')

  console.log(`Summarizing ${category} with Claude...`)
  const result = await summarizeWithClaude(
    `You write a daily brief for the "${category}" category. Given Reddit posts, produce a JSON object:

{"topPick": "One-line headline", "summary": "1-2 sentence summary", "digest": "3-5 sentence detailed analysis"}

Rules:
- topPick: the most important/interesting headline of the day
- summary: brief overview suitable for a card preview
- digest: deeper analysis explaining trends, implications, and context
- Return ONLY the JSON object, no markdown fences or extra text`,
    `Today is ${isoDate}. Here are the current hot posts:\n\n${postSummary}`,
  )

  if (result && result.topPick) {
    categories[category] = result
  } else {
    console.warn(`Claude failed for ${category} — using fallback`)
    categories[category] = { ...FALLBACK }
  }

  // 3s delay between category API calls
  await new Promise((r) => setTimeout(r, 3000))
}

const brief = { id: isoDate, date: isoDate, pocHighlight, categories }
data.unshift(brief)
writeFileSync(BRIEFS_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`Daily Brief updated for ${isoDate}`)
