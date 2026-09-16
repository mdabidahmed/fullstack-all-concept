import type { Topic } from "../../types";

export const awsGlobalInfrastructureTopic: Topic = {
  id: "aws-global-infrastructure",
  title: "Regions, Availability Zones & Edge Locations",
  category: "AWS Fundamentals",
  shortExplanation: `AWS's physical infrastructure is organized in layers, from largest to smallest:

- A **Region** is a geographic area (e.g. \`us-east-1\`, \`eu-west-1\`) containing multiple, isolated data centers
- An **Availability Zone (AZ)** is one or more discrete data centers within a Region, each with independent power and networking
- **Edge locations** are smaller sites, closer to end users, used to cache and serve content quickly (via CloudFront)`,
  longExplanation: `Most AWS services run inside a specific **Region** that you choose when you create a resource — picking a Region close to your users reduces network latency, and some data-residency regulations require choosing a specific Region. Each Region is completely isolated from every other Region: resources don't automatically replicate across them, and an outage in one Region doesn't take down another.

- **Regions** — as of the mid-2020s, AWS operates 30+ Regions worldwide (e.g. \`us-east-1\` in Northern Virginia, \`ap-southeast-1\` in Singapore). Each is a separate geographic area with its own set of Availability Zones
- **Availability Zones (AZs)** — every Region contains multiple AZs (usually 3+), each made up of one or more physically separate data centers with independent power, cooling, and networking. Spreading an application across multiple AZs is the standard way to survive a single data-center failure — if one AZ goes down, the others keep serving traffic
- **High availability by design** — a "Multi-AZ" deployment (common for services like RDS) keeps a live standby copy of your resource in a second AZ, ready to take over automatically if the primary AZ fails
- **Edge locations** — much smaller sites (hundreds of them, in far more cities than there are Regions) used by **CloudFront**, AWS's content delivery network (CDN), to cache static content physically near end users so a website visitor in Tokyo doesn't have to fetch an image from a server in Virginia
- **Choosing a Region** matters for three main reasons: latency (closer to users is faster), compliance (some data must legally stay within a country or continent), and pricing (costs vary slightly by Region)

The mental model that ties it together: **Region → Availability Zone → data center**, with Regions chosen for where your *application* lives, and edge locations layered on top purely to make *content delivery* fast regardless of where the application itself is hosted.`,
  examples: [
    {
      id: "region-az-hierarchy",
      title: "Region → Availability Zone → data center",
      summary: "The nested hierarchy of AWS's physical infrastructure.",
      code: `function App() {
  const region = {
    name: "Region: us-east-1 (N. Virginia)",
    zones: [
      { name: "AZ: us-east-1a", dc: "Data center A" },
      { name: "AZ: us-east-1b", dc: "Data center B" },
      { name: "AZ: us-east-1c", dc: "Data center C" },
    ],
  };

  return (
    <div style={{ border: "2px solid #ff9900", borderRadius: 10, padding: 14 }}>
      <strong>{region.name}</strong>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {region.zones.map((z) => (
          <div key={z.name} style={{ flex: 1, padding: 10, background: "#232f3e", color: "white", borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{z.name}</div>
            <div style={{ fontSize: 12, color: "#d1d5db" }}>{z.dc}</div>
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 10 }}>
        Each AZ has independent power and networking — one failing doesn't take down the others.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-az-failover",
      title: "Simulating Multi-AZ failover",
      summary: "A primary AZ fails and a standby in another AZ takes over automatically.",
      code: `function App() {
  const [primaryDown, setPrimaryDown] = React.useState(false);
  const active = primaryDown ? "us-east-1b (standby)" : "us-east-1a (primary)";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setPrimaryDown((d) => !d)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}
      >
        {primaryDown ? "Restore primary AZ" : "Simulate primary AZ outage"}
      </button>
      <div style={{ padding: 12, borderRadius: 8, background: primaryDown ? "#fef3c7" : "#dcfce7" }}>
        Serving traffic from: <strong>{active}</strong>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A Multi-AZ database keeps a synced standby in a second zone specifically so this failover can happen automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "edge-locations-map",
      title: "Edge locations vs. Regions",
      summary: "Why CloudFront uses far more, smaller sites than the Regions your app runs in.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ padding: 10, background: "#232f3e", color: "white", borderRadius: 8 }}>
        <strong>~30+ Regions</strong> — where your application (EC2, RDS, Lambda...) actually runs
      </div>
      <div style={{ padding: 10, background: "#ff9900", color: "#232f3e", borderRadius: 8 }}>
        <strong>400+ edge locations</strong> — cache static content (images, videos, JS bundles) near every user
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A user in Tokyo hitting a CloudFront-cached image gets it from a nearby edge location, even if the origin server lives in a Virginia Region.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
