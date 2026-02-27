const UA = 'forgerock-learning-bot/1.0 (by /u/forgerock-learning-bot)'

// Reddit OAuth app-only (client credentials) auth.
// Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET env vars,
// or falls back to unauthenticated public JSON endpoint.
let oauthToken = null
let tokenExpiry = 0

async function getOAuthToken() {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  if (oauthToken && Date.now() < tokenExpiry) return oauthToken

  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'User-Agent': UA,
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    console.error(`Reddit OAuth failed: ${res.status}`)
    return null
  }

  const data = await res.json()
  oauthToken = data.access_token
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
  return oauthToken
}

/**
 * Fetch hot posts from a single subreddit.
 * Uses OAuth API (oauth.reddit.com) if credentials available,
 * otherwise falls back to public JSON endpoint.
 * Returns [] on any error (never throws).
 */
export async function fetchSubredditPosts(subreddit, { sort = 'hot', time = 'day', limit = 25 } = {}) {
  try {
    const token = await getOAuthToken()
    let url, headers

    if (token) {
      url = `https://oauth.reddit.com/r/${subreddit}/${sort}?limit=${limit}&t=${time}`
      headers = { 'User-Agent': UA, Authorization: `Bearer ${token}` }
    } else {
      url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&t=${time}`
      headers = { 'User-Agent': UA }
    }

    const res = await fetch(url, { headers })
    if (!res.ok) {
      console.error(`Reddit ${res.status} for r/${subreddit}`)
      return []
    }
    const json = await res.json()
    return json.data.children
      .map((c) => c.data)
      .filter((p) => !p.stickied)
      .map((p) => ({
        title: p.title,
        url: p.url,
        permalink: `https://www.reddit.com${p.permalink}`,
        score: p.score,
        numComments: p.num_comments,
        selftext: (p.selftext || '').slice(0, 500),
        flair: p.link_flair_text || '',
      }))
  } catch (err) {
    console.error(`Reddit fetch error for r/${subreddit}:`, err.message)
    return []
  }
}

/**
 * Fetch from multiple subreddits sequentially (2s gap),
 * merge, deduplicate by URL, sort by score desc.
 */
export async function fetchMultipleSubreddits(subs, options = {}) {
  const all = []
  for (let i = 0; i < subs.length; i++) {
    const posts = await fetchSubredditPosts(subs[i], options)
    all.push(...posts)
    if (i < subs.length - 1) await sleep(2000)
  }
  const seen = new Set()
  return all
    .filter((p) => {
      if (seen.has(p.url)) return false
      seen.add(p.url)
      return true
    })
    .sort((a, b) => b.score - a.score)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
