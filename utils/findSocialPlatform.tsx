const platformDomains = {
  instagram: ["instagram.com"],
  x: ["twitter.com", "x.com"],
  linkedin: ["linkedin.com"],
  tiktok: ["tiktok.com"],
  youtube: ["youtube.com", "youtu.be"],
  github: ["github.com"],
  medium: ["medium.com"],
  reddit: ["reddit.com"],
  discord: ["discord.gg", "discord.com"],
  pinterest: ["pinterest.com"],
  whatsapp: ["wa.me", "whatsapp.com"],
  facebook: ["facebook.com"]
}

export function findSocialPlatform (url: string) {
  const domain = url.toLowerCase()
  
  for (const [platform, domains] of Object.entries(platformDomains)) {
    if (domains.some((d) => domain.includes(d))) {
      return platform
    }
  }

  return false
}