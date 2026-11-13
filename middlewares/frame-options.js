// Framing policy for embeddable pages (widgets.js iframes).
//
// `X-Frame-Options: ALLOW` is not a browser value: it is a sentinel for the scbd-nginx
// proxy, whose iframe-mapping.inc drops the header when the upstream sends ALLOW and
// adds SAMEORIGIN when the upstream sends nothing. Removing it re-enables SAMEORIGIN.

// Share/embed pages stay frameable by any site (third-party widget hosts).
const iframeAllowedUrls = [/^\/((ar|en|es|fr|ru|zh)\/)?share\/embed/]

// Routes the widgets actually frame with ?embed=true: widgets.js builds `/database/<id>?embed=true`
// (record embeds) and same-origin `data-url` pages, which are search pages (`/search?...`); oembed.js
// only emits widgets.js markup. Anything else with ?embed=true stays SAMEORIGIN.
const embedRoutes = [/^\/((ar|en|es|fr|ru|zh)\/)?(search|database)(\/|\?|$)/]

// Those routes are frameable only by these embedders: the cbd-events app (iOS/Android WebViews) and cbd.int sites.
// *.cbddev.xyz is deliberately absent: the app has no staging-awareness flag (only API_URL defaults), so
// adding it would open production to dev origins.
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

  // Embed pages run without auth (app/components/scbd-angularjs-services/services/authentication.js:13
  // skips the accounts authorize iframe when `embed` is set), so framing them cannot drive authenticated
  // actions. That client check is the load-bearing control: keep it if you widen embedRoutes.
  if (req.query?.embed === 'true' && embedRoutes.some(url => url.test(req.url))) {
    res.setHeader('X-Frame-Options', 'ALLOW')
    res.setHeader('Content-Security-Policy', `frame-ancestors ${embedFrameAncestors.join(' ')}`)
  }
}
