import type { Topic } from "../../types";

export const awsVpcBasicsTopic: Topic = {
  id: "aws-vpc-basics",
  title: "VPC: Your Private Network in AWS",
  category: "Networking & Deployment",
  shortExplanation: `A **VPC** (Virtual Private Cloud) is an isolated, private network you define within AWS.

- It's divided into **subnets**, each living in a single Availability Zone
- A **public subnet** has a route to the internet; a **private subnet** does not
- **Security groups** and **network ACLs** control traffic in and out`,
  longExplanation: `Every EC2 instance, RDS database, and Lambda function-with-VPC-access lives inside a VPC — a logically isolated slice of the AWS network that you control the IP address range, routing, and connectivity for, similar in spirit to a private network in your own office, but software-defined.

- **CIDR block** — a VPC is created with an IP address range (e.g. \`10.0.0.0/16\`), which you then divide into smaller ranges for subnets
- **Subnets** — a subnet is a slice of the VPC's IP range, tied to exactly one Availability Zone. Spreading subnets (and the resources in them) across multiple AZs is how a VPC-hosted application achieves high availability
- **Public vs. private subnets** — a subnet is "public" if its route table sends internet-bound traffic (\`0.0.0.0/0\`) to an **Internet Gateway** attached to the VPC. A "private" subnet has no such route, so nothing in it is directly reachable from, or able to directly reach, the public internet — the standard place to put a database or internal service
- **NAT Gateway** — lets resources in a *private* subnet initiate outbound connections to the internet (e.g. to download a software update) without being *reachable* from the internet, by routing their outbound traffic through a NAT Gateway sitting in a public subnet
- **Security groups** are stateful, instance-level firewalls (covered in the EC2 topic) — if you allow inbound traffic, the matching outbound response is automatically allowed too
- **Network ACLs (NACLs)** are stateless, subnet-level firewalls — an extra layer that evaluates rules in order and requires explicit rules for both directions of traffic, typically used as a coarse, subnet-wide backstop alongside more granular security groups
- **VPC Peering / Transit Gateway** connect separate VPCs together (e.g. one VPC per environment, or per team) so resources in each can communicate privately, without traffic ever crossing the public internet

The classic three-tier pattern: a public subnet holds internet-facing load balancers, a private subnet holds application servers reachable only from the load balancer, and a further private subnet holds the database — each layer only reachable from the layer directly in front of it.`,
  examples: [
    {
      id: "vpc-subnet-diagram",
      title: "A VPC split into public and private subnets",
      summary: "The three-tier pattern: internet-facing tier, app tier, and database tier.",
      code: `function App() {
  return (
    <div style={{ border: "2px solid #232f3e", borderRadius: 10, padding: 14 }}>
      <strong>VPC: 10.0.0.0/16</strong>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#dcfce7", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Public subnet — 10.0.1.0/24</div>
          <div style={{ fontSize: 12, color: "#374151" }}>Load balancer (has route to Internet Gateway)</div>
        </div>
        <div style={{ flex: 1, padding: 10, background: "#fef3c7", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Private subnet — 10.0.2.0/24</div>
          <div style={{ fontSize: 12, color: "#374151" }}>App servers (reachable only from load balancer)</div>
        </div>
        <div style={{ flex: 1, padding: 10, background: "#fee2e2", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Private subnet — 10.0.3.0/24</div>
          <div style={{ fontSize: 12, color: "#374151" }}>Database (reachable only from app servers)</div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nat-gateway-flow",
      title: "How a NAT Gateway allows outbound-only access",
      summary: "A private-subnet instance can reach the internet, but the internet can't reach it back.",
      code: `function App() {
  const [direction, setDirection] = React.useState("outbound");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setDirection("outbound")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: direction === "outbound" ? "#ff9900" : "#e5e7eb", cursor: "pointer" }}>Instance → Internet</button>
        <button onClick={() => setDirection("inbound")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: direction === "inbound" ? "#ff9900" : "#e5e7eb", cursor: "pointer" }}>Internet → Instance</button>
      </div>
      <div style={{ padding: 12, borderRadius: 8, background: direction === "outbound" ? "#dcfce7" : "#fee2e2" }}>
        {direction === "outbound"
          ? "Allowed: private instance → NAT Gateway → Internet Gateway → internet (e.g. downloading a package)"
          : "Blocked: the private subnet has no route from the internet, and no public IP to be reached at"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "security-group-vs-nacl",
      title: "Security group vs. network ACL",
      summary: "Stateful, instance-level rules versus stateless, subnet-level rules.",
      code: `function App() {
  const rows = [
    { label: "Scope", sg: "Instance (ENI)", nacl: "Subnet" },
    { label: "State", sg: "Stateful (return traffic auto-allowed)", nacl: "Stateless (must allow both directions)" },
    { label: "Rules", sg: "Allow only", nacl: "Allow and deny" },
    { label: "Evaluation", sg: "All rules evaluated", nacl: "Rules evaluated in numbered order" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>Security group</th>
          <th style={{ padding: 8, textAlign: "left" }}>Network ACL</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.label}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.sg}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.nacl}</td>
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
