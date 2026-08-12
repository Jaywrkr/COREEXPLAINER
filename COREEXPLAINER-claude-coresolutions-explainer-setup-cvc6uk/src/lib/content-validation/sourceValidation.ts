/** Technical-source URLs are external evidence links, not arbitrary redirects. */
export function isSafeTechnicalSourceUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && Boolean(url.hostname)
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}
