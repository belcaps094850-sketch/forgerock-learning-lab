#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchMultipleSubreddits } from './lib/reddit.mjs'

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

const entries = posts.slice(0, 5).map((p, i) => ({
  title: `${i + 1}. ${p.title}`,
  body: p.selftext ? p.selftext.slice(0, 300) + (p.selftext.length > 300 ? '...' : '') : '',
  links: [
    { label: 'Discussion', url: p.permalink },
    ...(p.url !== p.permalink ? [{ label: 'Article', url: p.url }] : []),
  ],
}))

data.unshift({ date: today, entries })
writeFileSync(DATA_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`SRE Digest updated for ${today} (${entries.length} stories)`)
