const UA = 'forgerock-learning-bot/1.0 (digest automation)'

/**
 * Fetch hot posts from a single subreddit.
 * Returns [] on any error (never throws).
 */
export async function fetchSubredditPosts(subreddit, { sort = 'hot', time = 'day', limit = 25 } = {}) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&t=${time}`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
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
