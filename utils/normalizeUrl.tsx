export const normalizeUrl = (url: string | undefined) => {
  if (!url) return ''
  url = url.trim()
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url
  }
  return url
}