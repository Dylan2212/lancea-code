// utils/validateLink.ts

// List of domains you consider unsafe
const BLOCKED_DOMAINS = [
  "grabify.link",
  "iplogger.org",
  "iplogger.com",
  "ps3cfw.com",
  "freegiftcards",
  "discord-nitro",
  "nitrofree",
  "steamfree",
  "fortnite-vbucks",
  "claimreward",
  "surveyclaim",
  "verification",
  "prize",
].map(d => d.toLowerCase())

// Keywords frequently used in scam/phishing links
const BLOCKED_KEYWORDS = [
  "free-nitro",
  "nitro-free",
  "login-steam",
  "login-discord",
  "auth-discord",
  "steam-gift",
  "robux",
  "vbucks",
  "verify",
  "claim",
  "reward",
  "giftcard",
  "giveaway",
]

// Redirect/masked links
const BLOCKED_REDIRECT_HOSTS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "cutt.ly",
  "shorturl.at",
  "goo.gl",
].map(d => d.toLowerCase())

export function isSafeLink(url: string | undefined): { safe: boolean; reason?: string } {
  if (!url) return {safe: true, reason: "No link present"}
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()
    const full = url.toLowerCase()

    // Block dangerous domains
    for (const d of BLOCKED_DOMAINS) {
      if (host.includes(d)) {
        return { safe: false, reason: `Blocked domain: ${d}` }
      }
    }

    // Block redirect/shortener links
    for (const d of BLOCKED_REDIRECT_HOSTS) {
      if (host === d) {
        return { safe: false, reason: `Link shorteners are not allowed: ${d}` }
      }
    }

    // Block scammy keywords
    for (const k of BLOCKED_KEYWORDS) {
      if (full.includes(k)) {
        return { safe: false, reason: `Suspicious keyword detected: ${k}` }
      }
    }

    // Block raw IP addresses (common for grabbers)
    if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(host)) {
      return { safe: false, reason: "Direct IP links are not allowed" }
    }

    return { safe: true }
  } catch {
    return { safe: false, reason: "Invalid URL format" }
  }
}