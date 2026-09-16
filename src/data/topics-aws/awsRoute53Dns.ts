import type { Topic } from "../../types";

export const awsRoute53DnsTopic: Topic = {
  id: "aws-route53-dns",
  title: "Route 53: DNS & Domain Routing",
  category: "Networking & Deployment",
  shortExplanation: `**Route 53** is AWS's DNS service — it translates domain names (\`example.com\`) into IP addresses, and can also register domains.

- A **hosted zone** holds the DNS records for a domain
- Beyond simple A/CNAME records, Route 53 supports **routing policies** like weighted, latency-based, and failover
- **Health checks** can automatically stop routing traffic to an unhealthy endpoint`,
  longExplanation: `Every request to a website starts with DNS: converting a human-readable name like \`example.com\` into an IP address a browser can actually connect to. Route 53 is AWS's managed DNS service, named after the standard DNS port (53).

- **Hosted zones** are containers for all the DNS records belonging to one domain — an A record pointing \`example.com\` to an IP, a CNAME pointing \`www.example.com\` to another hostname, an MX record for mail routing, and so on
- **Record types** — the most common are **A** (a domain to an IPv4 address), **AAAA** (to an IPv6 address), **CNAME** (a domain to another domain name), and **Alias** records (an AWS-specific extension that can point directly at another AWS resource, like a load balancer or CloudFront distribution, without needing a fixed IP)
- **Simple routing** just returns the one record configured for a name — most domains need nothing more
- **Weighted routing** splits traffic across multiple endpoints by a configurable percentage — useful for gradually shifting traffic to a new version (e.g. 90% to the old version, 10% to the new one) before fully cutting over
- **Latency-based routing** returns whichever endpoint has the lowest measured latency for the requester's location, useful when the same application is deployed in multiple Regions and you want each user routed to the fastest one
- **Failover routing** points at a primary endpoint by default, and automatically switches to a secondary endpoint if Route 53's health checks detect the primary has become unhealthy — a DNS-level complement to something like RDS Multi-AZ failover
- **Health checks** — Route 53 can periodically probe an endpoint (an HTTP status check, for instance) and only include it in DNS answers while it's healthy, which is what makes failover and some other routing policies possible
- **Domain registration** — Route 53 can also register a new domain name directly, handling it end-to-end alongside hosting the DNS

The mental model: Route 53 isn't just "point a name at an IP" — its routing policies let DNS itself make traffic decisions (splitting, geo-optimizing, failing over) that would otherwise require custom logic somewhere else in the stack.`,
  examples: [
    {
      id: "hosted-zone-records",
      title: "A hosted zone's DNS records",
      summary: "The set of records Route 53 answers queries for one domain with.",
      code: `function App() {
  const records = [
    { name: "example.com", type: "A", value: "203.0.113.10" },
    { name: "www.example.com", type: "CNAME", value: "example.com" },
    { name: "app.example.com", type: "Alias", value: "my-alb-123.elb.amazonaws.com" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Name</th>
          <th style={{ padding: 8, textAlign: "left" }}>Type</th>
          <th style={{ padding: 8, textAlign: "left" }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.name} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontFamily: "monospace" }}>{r.name}</td>
            <td style={{ padding: 8 }}>{r.type}</td>
            <td style={{ padding: 8, color: "#6b7280", fontFamily: "monospace" }}>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "weighted-routing-slider",
      title: "Weighted routing: shifting traffic gradually",
      summary: "Adjust the split between an old and new version, live.",
      code: `function App() {
  const [weight, setWeight] = React.useState(10);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        Traffic to new version: {weight}%
        <input type="range" min="0" max="100" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ display: "flex", height: 24, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: \`\${100 - weight}%\`, background: "#6b7280" }} />
        <div style={{ width: \`\${weight}%\`, background: "#ff9900" }} />
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Gray = old version, orange = new version. No code deploy needed to change the split.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "failover-health-check",
      title: "Failover routing driven by a health check",
      summary: "DNS answers switch to the secondary the moment the primary fails its health check.",
      code: `function App() {
  const [primaryHealthy, setPrimaryHealthy] = React.useState(true);
  const answering = primaryHealthy ? "primary.example.com (203.0.113.10)" : "secondary.example.com (203.0.113.20)";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setPrimaryHealthy((h) => !h)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: primaryHealthy ? "#dc2626" : "#16a34a", color: "white", cursor: "pointer" }}
      >
        {primaryHealthy ? "Fail primary health check" : "Restore primary"}
      </button>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>
        DNS currently answers with: <strong>{answering}</strong>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
