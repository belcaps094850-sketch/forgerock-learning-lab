import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

/**
 * Send a prompt to Claude Sonnet and return parsed JSON.
 * Retries once on 429/5xx with 5s backoff.
 * Returns null on failure (never throws).
 */
export async function summarizeWithClaude(systemPrompt, userContent) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const msg = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      })
      const text = msg.content[0].text
      const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
      return JSON.parse(cleaned)
    } catch (err) {
      const status = err?.status || err?.error?.status
      if (attempt === 0 && (status === 429 || (status >= 500 && status < 600))) {
        console.warn(`Claude ${status}, retrying in 5s...`)
        await new Promise((r) => setTimeout(r, 5000))
        continue
      }
      console.error('Claude API error:', err.message)
      return null
    }
  }
  return null
}
