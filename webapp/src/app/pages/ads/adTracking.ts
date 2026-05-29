/**
 * Shared ad page tracking utility.
 * Captures gclid/UTM from URL, fires /t pixel to record page view.
 * Called from every ad landing page's useEffect.
 */
export function fireAdPixel(slug: string): void {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  const kw = params.get("kw");

  // Save to sessionStorage for later use in signup flow
  if (gclid) sessionStorage.setItem("gclid", gclid);
  if (kw) sessionStorage.setItem("ads_keyword", kw);

  // Fire tracking pixel to /t endpoint
  const host = window.location.hostname;
  const q = new URLSearchParams();
  q.set("h", host);
  q.set("s", slug);
  if (gclid) q.set("g", gclid);

  // UTM params
  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_term = params.get("utm_term");
  if (utm_source) q.set("us", utm_source);
  if (utm_medium) q.set("um", utm_medium);
  if (utm_campaign) q.set("uc", utm_campaign);
  if (utm_term) q.set("ut", utm_term);

  // Fire pixel (non-blocking, fire-and-forget)
  try {
    const img = new Image();
    img.src = `/t?${q.toString()}`;
  } catch {
    // Silent fail — tracking should never break the page
  }
}
