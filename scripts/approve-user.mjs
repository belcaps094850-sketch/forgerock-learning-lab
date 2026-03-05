#!/usr/bin/env node
/**
 * Approve or list pending users in Firestore
 * Usage:
 *   node scripts/approve-user.mjs list          — list all pending users
 *   node scripts/approve-user.mjs approve <email> — approve a user by email
 *   node scripts/approve-user.mjs deny <email>   — remove a user
 *
 * Requires: GOOGLE_APPLICATION_CREDENTIALS env var pointing to a service account key
 * Or: firebase-admin with Application Default Credentials
 */

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const projectId = 'bel-lab-learning'

try {
  initializeApp({ credential: applicationDefault(), projectId })
} catch {
  initializeApp({ projectId })
}

const db = getFirestore()

async function listPending() {
  const snap = await db.collection('users').where('approved', '==', false).get()
  if (snap.empty) {
    console.log('No pending users.')
    return
  }
  console.log(`\n${snap.size} pending user(s):\n`)
  snap.forEach(doc => {
    const d = doc.data()
    console.log(`  📧 ${d.email}`)
    console.log(`     Name: ${d.displayName || '(none)'}`)
    console.log(`     Signed up: ${d.createdAt?.toDate?.()?.toISOString() || 'unknown'}`)
    console.log(`     UID: ${doc.id}\n`)
  })
}

async function approveByEmail(email) {
  const snap = await db.collection('users').where('email', '==', email.toLowerCase()).get()
  if (snap.empty) {
    console.log(`No user found with email: ${email}`)
    return
  }
  for (const doc of snap.docs) {
    await doc.ref.update({ approved: true })
    console.log(`✅ Approved: ${doc.data().email} (${doc.id})`)
  }
}

async function denyByEmail(email) {
  const snap = await db.collection('users').where('email', '==', email.toLowerCase()).get()
  if (snap.empty) {
    console.log(`No user found with email: ${email}`)
    return
  }
  for (const doc of snap.docs) {
    await doc.ref.delete()
    console.log(`❌ Removed: ${email} (${doc.id})`)
  }
}

const [,, cmd, arg] = process.argv

if (cmd === 'list') {
  await listPending()
} else if (cmd === 'approve' && arg) {
  await approveByEmail(arg)
} else if (cmd === 'deny' && arg) {
  await denyByEmail(arg)
} else {
  console.log('Usage:')
  console.log('  node scripts/approve-user.mjs list')
  console.log('  node scripts/approve-user.mjs approve <email>')
  console.log('  node scripts/approve-user.mjs deny <email>')
}

process.exit(0)
