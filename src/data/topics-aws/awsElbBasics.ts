import type { Topic } from "../../types";

export const awsElbBasicsTopic: Topic = {
  id: "aws-elb-basics",
  title: "Elastic Load Balancing",
  category: "Compute",
  shortExplanation: `Elastic Load Balancing (ELB) distributes incoming traffic across multiple targets (like EC2 instances), and comes in a few flavors:

- **Application Load Balancer (ALB)** — HTTP/HTTPS traffic, routes by URL path or hostname
- **Network Load Balancer (NLB)** — TCP/UDP traffic, extremely high performance and low latency
- **Health checks** automatically remove unhealthy targets from rotation`,
  longExplanation: `A load balancer sits in front of a fleet of servers and spreads incoming traffic across them, so no single server is overwhelmed and the failure of one doesn't take down the whole application. AWS's Elastic Load Balancing service offers a few types, each optimized for a different layer of traffic.

- **Application Load Balancer (ALB)** operates at the application layer (HTTP/HTTPS) and can make routing decisions based on the request's content — e.g. sending \`/api/*\` to one target group and \`/images/*\` to another, or routing based on hostname. This makes it well-suited to modern web applications and microservices
- **Network Load Balancer (NLB)** operates at the transport layer (TCP/UDP) and is built for extreme performance — millions of requests per second with very low, consistent latency — at the cost of not understanding HTTP content the way an ALB does. It's the right choice for latency-sensitive or non-HTTP workloads
- **Target groups** — a load balancer doesn't route directly to individual instances; it routes to a target group, which can contain EC2 instances, IP addresses, or even Lambda functions. This indirection is what lets an Auto Scaling group add or remove instances without reconfiguring the load balancer itself
- **Health checks** — the load balancer periodically pings each target (e.g. an HTTP GET to \`/health\`) and stops sending traffic to any target that fails enough consecutive checks, automatically routing around a broken or overloaded instance until it recovers
- **Listeners** define what the load balancer listens for (e.g. HTTPS on port 443) and what rule set to apply — including terminating SSL/TLS at the load balancer itself, so backend instances can communicate over plain HTTP internally while clients see HTTPS
- **Cross-zone load balancing** spreads traffic evenly across targets in every enabled Availability Zone, rather than only balancing within the AZ a request happened to arrive in — important for even load distribution when AZs have an unequal number of healthy targets

The pairing that comes up constantly: an **ALB in front of an Auto Scaling group**, spread across multiple AZs — traffic is distributed and balanced, unhealthy instances are automatically excluded, and the whole fleet can grow or shrink without any manual load balancer reconfiguration.`,
  examples: [
    {
      id: "path-based-routing",
      title: "ALB path-based routing",
      summary: "One load balancer routes different URL paths to different target groups.",
      code: `function App() {
  const [path, setPath] = React.useState("/api/users");
  const target = path.startsWith("/api") ? "api-target-group" : path.startsWith("/images") ? "images-target-group" : "web-target-group";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["/api/users", "/images/logo.png", "/"].map((p) => (
          <button key={p} onClick={() => setPath(p)} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: path === p ? "#ff9900" : "#e5e7eb", cursor: "pointer" }}>{p}</button>
        ))}
      </div>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>
        Request to <code>{path}</code> → routed to <strong>{target}</strong>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "health-check-rotation",
      title: "Health checks removing an unhealthy target",
      summary: "One target starts failing health checks and traffic stops routing to it.",
      code: `function App() {
  const [targets, setTargets] = React.useState([
    { id: "i-01", healthy: true },
    { id: "i-02", healthy: true },
    { id: "i-03", healthy: true },
  ]);

  const fail = (id) => setTargets((ts) => ts.map((t) => (t.id === id ? { ...t, healthy: false } : t)));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {targets.map((t) => (
          <div key={t.id} style={{ flex: 1, padding: 10, borderRadius: 8, background: t.healthy ? "#dcfce7" : "#fee2e2", textAlign: "center" }}>
            <div>{t.id}</div>
            <div style={{ fontSize: 12 }}>{t.healthy ? "healthy — receiving traffic" : "unhealthy — removed"}</div>
            {t.healthy && <button onClick={() => fail(t.id)} style={{ marginTop: 6, fontSize: 11, cursor: "pointer" }}>Simulate failure</button>}
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Traffic automatically continues flowing to the remaining healthy targets.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alb-vs-nlb",
      title: "ALB vs. NLB at a glance",
      summary: "Application-layer routing versus raw transport-layer throughput.",
      code: `function App() {
  const rows = [
    { label: "OSI layer", alb: "Application (HTTP/HTTPS)", nlb: "Transport (TCP/UDP)" },
    { label: "Routing", alb: "By path, host, headers", nlb: "By IP/port only" },
    { label: "Performance", alb: "High", nlb: "Extreme — millions of req/sec" },
    { label: "Best for", alb: "Web apps, microservices", nlb: "Latency-sensitive, non-HTTP traffic" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>ALB</th>
          <th style={{ padding: 8, textAlign: "left" }}>NLB</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.label}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.alb}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.nlb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
