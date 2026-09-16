import type { Topic } from "../../types";

export const awsCloudfrontCdnTopic: Topic = {
  id: "aws-cloudfront-cdn",
  title: "CloudFront: Content Delivery Network",
  category: "Networking & Deployment",
  shortExplanation: `**CloudFront** caches content at edge locations close to users, so repeated requests are served fast without hitting the origin server every time.

- An **origin** is where content actually lives (an S3 bucket, a load balancer, any HTTP server)
- A **distribution** is the CloudFront configuration tying an origin to a set of edge locations
- **TTL** (time-to-live) controls how long cached content is served before CloudFront re-checks the origin`,
  longExplanation: `Without a CDN, every request for a website's assets — images, CSS, JavaScript — travels all the way to wherever the origin server lives, no matter how far that is from the user. CloudFront solves this by caching copies of that content at edge locations physically distributed around the world.

- **Origins** — the source of truth CloudFront pulls content from: commonly an S3 bucket (for static assets or a whole static site) or an Application Load Balancer / custom HTTP server (for dynamic content and APIs). A single distribution can even route to different origins based on the request path
- **Distributions** — the configuration object tying one or more origins to CloudFront's edge network, including cache behavior, allowed HTTP methods, and which edge locations to use
- **Cache hit vs. cache miss** — when a request arrives at an edge location, if that content is already cached there and still within its TTL, CloudFront serves it directly (a "hit") without contacting the origin at all. If it's not cached, or the cached copy has expired, CloudFront fetches a fresh copy from the origin (a "miss"), serves it, and caches it for the next request
- **TTL (Time To Live)** controls how long an object stays cached before CloudFront re-validates it with the origin. A long TTL means fewer origin requests (cheaper, faster) but slower propagation of content changes; a short TTL (or none) means every request nearly always reaches the origin
- **Cache invalidation** — if content changes before its TTL naturally expires, you can explicitly invalidate specific paths, forcing CloudFront to fetch a fresh copy on the next request rather than waiting out the TTL
- **HTTPS and SSL/TLS termination** — CloudFront can terminate HTTPS at the edge (closer to the user, lower latency for the TLS handshake) and optionally use a different protocol between the edge and the origin
- **Reduced origin load** — beyond speed, CDN caching directly reduces load on the origin server or S3 bucket, since a large fraction of requests never reach it at all
- **Dynamic content** — CloudFront isn't limited to static files; with a very short or zero TTL (or cache keys that include headers/cookies), it can also front dynamic, per-user content, primarily to benefit from its global network of connections and HTTPS termination rather than caching

The core value proposition: CloudFront moves content geographically closer to users and absorbs repeat traffic before it ever reaches your origin, which is why it's commonly layered in front of both static S3 sites and dynamic load-balanced applications alike.`,
  examples: [
    {
      id: "cache-hit-vs-miss",
      title: "Cache hit vs. cache miss",
      summary: "The first request reaches the origin; the next one, within the TTL, doesn't.",
      code: `function App() {
  const [requests, setRequests] = React.useState([]);
  const cachedRef = React.useRef(false);

  const request = () => {
    const hit = cachedRef.current;
    cachedRef.current = true;
    setRequests((r) => [...r, hit ? "HIT — served from edge" : "MISS — fetched from origin, now cached"]);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={request} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>
        Request /logo.png
      </button>
      <pre style={{ background: "#111827", color: "#86efac", padding: 10, borderRadius: 6, minHeight: 50, fontSize: 12 }}>
        {requests.length ? requests.map((r, i) => \`Request \${i + 1}: \${r}\`).join("\\n") : "No requests yet."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ttl-tradeoff",
      title: "TTL: freshness vs. origin load",
      summary: "A longer TTL means fewer origin hits but slower propagation of a content change.",
      code: `function App() {
  const [ttl, setTtl] = React.useState(300);
  const requestsPerMinute = 1000;
  const originHits = Math.round(requestsPerMinute / (ttl / 60));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        TTL: {ttl}s
        <input type="range" min="10" max="3600" step="10" value={ttl} onChange={(e) => setTtl(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>
        ~{originHits} requests/min reach the origin (out of {requestsPerMinute} total)
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Raise the TTL and origin load drops — but a content update takes longer to show up everywhere.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "invalidation",
      title: "Forcing a fresh copy with cache invalidation",
      summary: "Bypassing the TTL to push an update immediately.",
      code: `function App() {
  const [version, setVersion] = React.useState(1);
  const [cachedVersion, setCachedVersion] = React.useState(1);

  const deploy = () => setVersion((v) => v + 1);
  const invalidate = () => setCachedVersion(version);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={deploy} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>Deploy new version to origin</button>
        <button onClick={invalidate} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>Invalidate cache</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#f3f4f6", borderRadius: 6 }}>Origin: v{version}</div>
        <div style={{ flex: 1, padding: 10, background: cachedVersion === version ? "#dcfce7" : "#fef3c7", borderRadius: 6 }}>Edge cache: v{cachedVersion}</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
