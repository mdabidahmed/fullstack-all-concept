import type { Topic } from "../../types";

export const azureVirtualNetworkTopic: Topic = {
  id: "azure-virtual-network",
  title: "Virtual Network (VNet)",
  category: "Networking & Deployment",
  shortExplanation: `A **Virtual Network (VNet)** is an isolated, private network within Azure — the direct equivalent of an AWS VPC.

- Divided into **subnets**, each holding a slice of the VNet's IP range
- **Network Security Groups (NSGs)** filter traffic in and out of a subnet or network interface
- **VNet peering** connects two VNets so resources in each can communicate privately`,
  longExplanation: `Every VM, and most other Azure resources that need network connectivity, live inside a Virtual Network — a private, software-defined network you control the address space and routing for, mirroring a VPC's role on AWS closely.

- **Address space** — a VNet is created with an IP range in CIDR notation (e.g. \`10.0.0.0/16\`), which is then divided into subnets
- **Subnets** — a slice of the VNet's address range, used to group resources and apply network rules at a finer grain than the whole VNet. Unlike an AWS subnet, an Azure subnet isn't tied to a single Availability Zone — Azure VMs in one subnet can be spread across multiple zones directly
- **Network Security Groups (NSGs)** — a set of allow/deny rules for inbound and outbound traffic, attachable to a subnet or to an individual network interface. Rules are evaluated by priority number, and NSGs are Azure's closest equivalent to a combination of AWS security groups and network ACLs
- **Public vs. private (internal) access** — a subnet has no built-in internet route by default; a resource gets public internet access via a public IP address directly assigned to it, or via a load balancer or NAT Gateway sitting in front of it. This is a subtly different mental model than AWS's "public/private subnet" distinction, which is determined by the subnet's route table rather than per-resource IP assignment
- **VNet peering** connects two VNets (in the same or different Regions) so resources in each can communicate using private IP addresses, without traffic crossing the public internet — Azure's equivalent of VPC peering, useful for connecting separate VNets per team, environment, or subscription
- **Azure Firewall and NAT Gateway** — a managed firewall service for centralized traffic filtering across VNets, and a NAT Gateway providing outbound-only internet access for private resources, mirroring the same NAT Gateway pattern used in AWS VPCs
- **ExpressRoute and VPN Gateway** extend a VNet to on-premises infrastructure — ExpressRoute over a private, dedicated connection; VPN Gateway over an encrypted connection across the public internet — both aimed at hybrid setups where some infrastructure stays outside Azure entirely

The three-tier pattern carries over directly: a subnet with a public-facing load balancer, a subnet of application VMs reachable only from the load balancer, and a subnet holding a database reachable only from the app tier — the same layered isolation strategy, expressed through Azure's own building blocks.`,
  examples: [
    {
      id: "vnet-subnet-diagram",
      title: "A VNet split into tiers",
      summary: "The same three-tier pattern used across every cloud provider, in Azure's shape.",
      code: `function App() {
  return (
    <div style={{ border: "2px solid #0078d4", borderRadius: 10, padding: 14 }}>
      <strong>VNet: 10.0.0.0/16</strong>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#dcfce7", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Subnet: web (10.0.1.0/24)</div>
          <div style={{ fontSize: 12, color: "#374151" }}>Load balancer with public IP</div>
        </div>
        <div style={{ flex: 1, padding: 10, background: "#fef3c7", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Subnet: app (10.0.2.0/24)</div>
          <div style={{ fontSize: 12, color: "#374151" }}>VMs, no public IP</div>
        </div>
        <div style={{ flex: 1, padding: 10, background: "#fee2e2", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Subnet: data (10.0.3.0/24)</div>
          <div style={{ fontSize: 12, color: "#374151" }}>Database, no public IP</div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nsg-rule-evaluation",
      title: "NSG rules evaluated by priority",
      summary: "Lower priority numbers are evaluated first, and the first match wins.",
      code: `function App() {
  const rules = [
    { priority: 100, action: "Allow", port: 443, source: "Internet" },
    { priority: 200, action: "Allow", port: 22, source: "10.0.0.0/24 (office VPN)" },
    { priority: 4096, action: "Deny", port: "*", source: "Any (default deny-all)" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Priority</th>
          <th style={{ padding: 8, textAlign: "left" }}>Action</th>
          <th style={{ padding: 8, textAlign: "left" }}>Port</th>
          <th style={{ padding: 8, textAlign: "left" }}>Source</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((r) => (
          <tr key={r.priority} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8 }}>{r.priority}</td>
            <td style={{ padding: 8, color: r.action === "Allow" ? "#16a34a" : "#dc2626" }}>{r.action}</td>
            <td style={{ padding: 8 }}>{r.port}</td>
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
      id: "vnet-peering",
      title: "VNet peering connecting two networks",
      summary: "Private IP communication between VNets, without touching the public internet.",
      code: `function App() {
  const [peered, setPeered] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setPeered((p) => !p)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>
        {peered ? "Remove peering" : "Peer the two VNets"}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#1e293b", color: "white", borderRadius: 8 }}>VNet-A (10.0.0.0/16)</div>
        <span style={{ color: peered ? "#16a34a" : "#d1d5db", fontWeight: 700 }}>{peered ? "↔ peered" : "✕"}</span>
        <div style={{ flex: 1, padding: 10, background: "#1e293b", color: "white", borderRadius: 8 }}>VNet-B (10.1.0.0/16)</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
