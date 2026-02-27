#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchSubredditPosts } from './lib/reddit.mjs'

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

const topics = posts.slice(0, 6).map((p) => ({
  title: p.title,
  url: p.url !== p.permalink ? p.url : p.permalink,
  meta: `r/reactjs · ${p.score} pts${p.flair ? ` · ${p.flair}` : ''}`,
  summary: p.selftext ? p.selftext.slice(0, 200) + (p.selftext.length > 200 ? '...' : '') : '',
}))

data.unshift({ date: today, topics })
writeFileSync(DATA_PATH, JSON.stringify(data.slice(0, MAX_ENTRIES), null, 2) + '\n')
console.log(`React Radar updated for ${today} (${topics.length} topics)`)
