import type { Topic } from "../../types";

export const awsEc2BasicsTopic: Topic = {
  id: "aws-ec2-basics",
  title: "EC2: Virtual Servers in the Cloud",
  category: "Compute",
  shortExplanation: `**EC2** (Elastic Compute Cloud) rents virtual servers, called **instances**, by the hour or second.

- An instance is launched from an **AMI** (Amazon Machine Image) — a template containing an OS and pre-installed software
- **Instance types** (like \`t3.micro\` or \`m5.large\`) determine the CPU, memory, and network capacity you get
- **Auto Scaling** launches or terminates instances automatically to match demand`,
  longExplanation: `EC2 is AWS's core compute service — a virtual machine you fully control, with root/administrator access, that you can configure exactly like a physical server, except it's provisioned in seconds instead of ordered and racked over weeks.

- **AMIs (Amazon Machine Images)** are the template an instance boots from — they bundle an operating system (Amazon Linux, Ubuntu, Windows Server...) plus optionally pre-installed software. AWS provides many official AMIs, and you can create your own custom AMI from a configured instance to launch identical copies later
- **Instance types** group different combinations of CPU, memory, storage, and network performance into named families — e.g. \`t3\` (burstable, general purpose, cheap), \`m5\` (balanced general purpose), \`c5\` (compute-optimized), \`r5\` (memory-optimized). Picking a type is a tradeoff between the workload's needs and cost
- **Security groups** act as a virtual firewall attached to an instance, controlling which inbound and outbound traffic is allowed (e.g. "allow inbound HTTPS on port 443 from anywhere, allow SSH only from my office IP")
- **Elastic IP addresses** are static public IPs you can attach to an instance — useful because an instance's default public IP changes if it's stopped and restarted, which would break anything pointing at the old address
- **Auto Scaling groups** define a minimum, maximum, and desired number of instances, and automatically launch new ones when demand (e.g. CPU usage) rises, or terminate them when it falls — this is what lets an application handle a traffic spike without someone manually clicking "launch instance" at 3am
- **Load balancers** (Elastic Load Balancing) sit in front of a fleet of EC2 instances and distribute incoming traffic across them, so no single instance is overwhelmed and unhealthy instances are automatically removed from rotation
- **Pricing models** — On-Demand (pay per hour/second, no commitment), Reserved Instances (discounted in exchange for a 1-3 year commitment), and Spot Instances (bid on AWS's spare capacity at a steep discount, with the risk it can be reclaimed with short notice)

Together, an Auto Scaling group plus a load balancer plus multiple Availability Zones is the standard pattern for a resilient, traffic-adaptive EC2 fleet — no single instance, and no single AZ, is a point of failure.`,
  examples: [
    {
      id: "launch-instance-form",
      title: "A simplified 'launch instance' form",
      summary: "Picking an AMI and instance type, the two decisions every EC2 launch starts with.",
      code: `function App() {
  const [ami, setAmi] = React.useState("Amazon Linux 2023");
  const [type, setType] = React.useState("t3.micro");

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <label style={{ fontSize: 13 }}>
        AMI
        <select value={ami} onChange={(e) => setAmi(e.target.value)} style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }}>
          <option>Amazon Linux 2023</option>
          <option>Ubuntu 22.04</option>
          <option>Windows Server 2022</option>
        </select>
      </label>
      <label style={{ fontSize: 13 }}>
        Instance type
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }}>
          <option value="t3.micro">t3.micro — 2 vCPU, 1 GiB (burstable)</option>
          <option value="m5.large">m5.large — 2 vCPU, 8 GiB (general purpose)</option>
          <option value="c5.xlarge">c5.xlarge — 4 vCPU, 8 GiB (compute optimized)</option>
        </select>
      </label>
      <div style={{ padding: 10, background: "#232f3e", color: "white", borderRadius: 6, fontSize: 13 }}>
        Launching <strong>{type}</strong> from <strong>{ami}</strong>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "security-group-rules",
      title: "Security group inbound rules",
      summary: "A virtual firewall as a simple allow-list of ports and sources.",
      code: `function App() {
  const rules = [
    { port: 443, proto: "HTTPS", source: "0.0.0.0/0 (anywhere)" },
    { port: 80, proto: "HTTP", source: "0.0.0.0/0 (anywhere)" },
    { port: 22, proto: "SSH", source: "203.0.113.4/32 (office IP only)" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Port</th>
          <th style={{ padding: 8, textAlign: "left" }}>Protocol</th>
          <th style={{ padding: 8, textAlign: "left" }}>Allowed source</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((r) => (
          <tr key={r.port} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8 }}>{r.port}</td>
            <td style={{ padding: 8 }}>{r.proto}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "auto-scaling-simulator",
      title: "Auto Scaling reacting to load",
      summary: "Instance count rises and falls with simulated CPU demand, between a min and max bound.",
      code: `function App() {
  const [load, setLoad] = React.useState(30);
  const min = 2, max = 6;
  const desired = Math.max(min, Math.min(max, Math.round(load / 20)));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        Simulated load: {load}%
        <input type="range" min="0" max="100" value={load} onChange={(e) => setLoad(Number(e.target.value))} style={{ display: "block", width: "100%" }} />
      </label>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {Array.from({ length: desired }).map((_, i) => (
          <div key={i} style={{ width: 40, height: 40, borderRadius: 6, background: "#ff9900", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#232f3e", fontWeight: 700 }}>
            EC2
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Auto Scaling group bounds: min {min}, max {max}. Instances running: {desired}.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
