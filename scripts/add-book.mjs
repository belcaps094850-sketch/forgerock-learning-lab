#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const { values } = parseArgs({
  options: {
    id: { type: 'string' },
    title: { type: 'string' },
    author: { type: 'string' },
    topic: { type: 'string' },
    cover: { type: 'string' },
    researcher: { type: 'string', default: 'Alec' },
  },
})

const { id, title, author, topic, cover, researcher } = values

if (!id || !title || !author || !topic || !cover) {
  console.error('Usage: node scripts/add-book.mjs --id "clean-code" --title "Clean Code" --author "Robert Martin" --topic "Code quality" --cover "https://..."')
  console.error('Optional: --researcher "Name" (default: Alec)')
  process.exit(1)
}

// 1. Download cover image
const imagesDir = resolve(ROOT, 'public/images/books')
if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true })
const imagePath = resolve(imagesDir, `${id}.jpg`)

console.log(`Downloading cover image...`)
const res = await fetch(cover)
if (!res.ok) {
  console.error(`Failed to download cover: ${res.status}`)
  process.exit(1)
}
const buffer = Buffer.from(await res.arrayBuffer())
writeFileSync(imagePath, buffer)

// 2. Resize with sips (macOS)
try {
  execSync(`sips -Z 400 "${imagePath}"`, { stdio: 'pipe' })
  console.log(`Cover resized to 400px`)
} catch {
  console.warn('sips not available — skipping resize (non-macOS?)')
}

// 3. Append to books.json
const booksPath = resolve(ROOT, 'public/data/books.json')
const books = JSON.parse(readFileSync(booksPath, 'utf-8'))

if (books.some((b) => b.id === id)) {
  console.error(`Book "${id}" already exists in books.json`)
  process.exit(1)
}

books.push({
  id,
  title,
  meta: `${author} · ${topic} · Researched by ${researcher}`,
  thumb: `/images/books/${id}.jpg`,
  thumbStyle: {},
})
writeFileSync(booksPath, JSON.stringify(books, null, 2) + '\n')
console.log(`Added to books.json`)

// 4. Scaffold book component
const pascalCase = id
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join('')

const booksDir = resolve(ROOT, 'src/pages/books')
const componentPath = resolve(booksDir, `${pascalCase}.jsx`)

if (existsSync(componentPath)) {
  console.warn(`Component ${pascalCase}.jsx already exists — skipping`)
} else {
  const component = `import BackLink from './BackLink'

export default function ${pascalCase}({ onBack }) {
  return (
    <div>
      <BackLink onBack={onBack} />
      <div className="book-header">
        <img className="book-cover" src="/images/books/${id}.jpg" alt="${title} cover" loading="lazy" />
        <div>
          <h2>${title}</h2>
          <div className="meta"><strong>Author:</strong> ${author} &nbsp;|&nbsp; <strong>Topic:</strong> ${topic} &nbsp;|&nbsp; <strong>Researched by:</strong> ${researcher} &nbsp;|&nbsp; <strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        </div>
      </div>

      <div className="section">
        <h3>Overview</h3>
        <p>TODO: Add overview</p>
      </div>

      <div className="section">
        <h3>Key Principles</h3>
        <p>TODO: Add key principles</p>
      </div>

      <div className="section">
        <h3>Actionable Takeaways</h3>
        <p>TODO: Add actionable takeaways</p>
      </div>
    </div>
  )
}
`
  writeFileSync(componentPath, component)
  console.log(`Created ${componentPath}`)
}

// 5. Update BookNotes.jsx — add import and bookComponents entry
const bookNotesPath = resolve(ROOT, 'src/pages/BookNotes.jsx')
let bookNotes = readFileSync(bookNotesPath, 'utf-8')

const importLine = `import ${pascalCase} from './books/${pascalCase}'`
if (!bookNotes.includes(importLine)) {
  // Insert after the last book import (before the CSS import)
  const cssImportMatch = bookNotes.match(/^import '\.\/BookNotes\.css'/m)
  if (cssImportMatch) {
    bookNotes = bookNotes.replace(
      cssImportMatch[0],
      `${importLine}\n${cssImportMatch[0]}`,
    )
  }
}

const mapEntry = `  '${id}': ${pascalCase},`
if (!bookNotes.includes(mapEntry)) {
  // Insert before the closing } of bookComponents
  bookNotes = bookNotes.replace(
    /^(const bookComponents = \{[\s\S]*?)(^\})/m,
    `$1${mapEntry}\n$2`,
  )
}

writeFileSync(bookNotesPath, bookNotes)
console.log(`Updated BookNotes.jsx`)

console.log(`\nDone! Book "${title}" added successfully.`)
console.log(`Next steps:`)
console.log(`  1. Edit src/pages/books/${pascalCase}.jsx to add content`)
console.log(`  2. Run \`npm run build\` to verify`)
