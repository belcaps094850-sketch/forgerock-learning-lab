#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchMultipleSubreddits } from './lib/reddit.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '../public/data')
const BRIEFS_PATH = resolve(DATA_DIR, 'briefs.json')
const POCS_PATH = resolve(DATA_DIR, 'pocs.json')
const MAX_ENTRIES = 30

const now = new Date()
const isoDate = now.toISOString().split('T')[0]

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

const categories = {}

for (const [category, subs] of Object.entries(CATEGORY_SUBS)) {
  console.log(`Fetching ${category}: ${subs.join(', ')}...`)
  const posts = await fetchMultipleSubreddits(subs, { limit: 25 })

  if (posts.length === 0) {
    console.warn(`No posts for ${category} — using fallback`)
    categories[category] = {
      topPick: 'No updates today',
      summary: 'No significant developments surfaced from community sources.',
      digest: 'Quiet day — nothing noteworthy to report in this category.',
    }
    continue
  }

  const top = posts[0]
  categories[category] = {
    topPick: top.title,
    summary: top.selftext ? top.selftext.slice(0, 200) + (top.selftext.length > 200 ? '...' : '') : `${top.score} pts · ${top.numComments} comments`,
    digest: posts.slice(0, 3).map((p) => `• ${p.title} (${p.score} pts)`).join('\n'),
  }

  // 2s delay between categories
  await new Promise((r) => setTimeout(r, 2000))
}

const brief = { id: isoDate, date: isoDate, pocHighlight, categories }
data.unshift(brief)
writeFileSync(BRIEFS_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`Daily Brief updated for ${isoDate}`)
