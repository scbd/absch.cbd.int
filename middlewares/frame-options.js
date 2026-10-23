// Framing policy for embeddable pages (widgets.js iframes).
//
// `X-Frame-Options: ALLOW` is not a browser value: it is a sentinel for the scbd-nginx
// proxy, whose iframe-mapping.inc drops the header when the upstream sends ALLOW and
// adds SAMEORIGIN when the upstream sends nothing. Removing it re-enables SAMEORIGIN.

// Share/embed pages stay frameable by any site (third-party widget hosts).
const iframeAllowedUrls = [/^\/((ar|en|es|fr|ru|zh)\/)?share\/embed/]

// Other pages opened with ?embed=true (widgets.js data-url, record embeds) are
// frameable only by these embedders: the cbd-events app (iOS/Android WebViews) and cbd.int sites.
export const embedFrameAncestors = [
  "'self'",
  'https://*.cbd.int',
  'capacitor://localhost',
  'https://localhost'
]

export function setFrameOptions (req, res) {
  if (iframeAllowedUrls.some(url => url.test(req.url))) {
    res.setHeader('X-Frame-Options', 'ALLOW')
    return
  }

  if (req.query?.embed === 'true') {
    res.setHeader('X-Frame-Options', 'ALLOW')
    res.setHeader('Content-Security-Policy', `frame-ancestors ${embedFrameAncestors.join(' ')}`)
  }
}
