import type { Topic } from "../../types";

export const azureVirtualMachinesTopic: Topic = {
  id: "azure-virtual-machines",
  title: "Virtual Machines",
  category: "Compute",
  shortExplanation: `Azure **Virtual Machines (VMs)** are the direct equivalent of EC2 instances — full control over an operating system, rented by the hour or second.

- A VM launches from an **image** (a managed OS image, or one you create yourself)
- **VM sizes** (like \`B2s\` or \`D4s_v5\`) determine CPU, memory, and disk performance
- **Virtual Machine Scale Sets** automatically add or remove VM instances to match demand`,
  longExplanation: `A Virtual Machine gives full administrative control over an operating system running on Azure's infrastructure — the same fundamental offering as EC2, with Azure-specific naming and a few distinct conveniences.

- **Images** — a VM is created from an image containing an OS (Windows Server, various Linux distributions) and optionally pre-installed software. Azure Marketplace offers many vendor and community images beyond Microsoft's own, and a configured VM can be captured as a custom image to launch identical copies later
- **VM sizes** — like EC2 instance types, a VM size (e.g. \`B2s\`, a burstable general-purpose size; \`D4s_v5\`, a balanced general-purpose size) determines vCPU count, memory, and temporary disk performance. Sizes are grouped into series aimed at different workload shapes (general purpose, compute-optimized, memory-optimized, GPU)
- **Managed disks** — a VM's storage is backed by a managed disk (conceptually similar to an EBS volume): Azure handles the underlying storage infrastructure, offering different performance tiers (Standard HDD, Standard SSD, Premium SSD) at different cost/performance points
- **Network Security Groups (NSGs)** act as a VM's firewall, similar to an EC2 security group — allow/deny rules for inbound and outbound traffic by port, protocol, and source
- **Virtual Machine Scale Sets (VMSS)** are Azure's equivalent of an EC2 Auto Scaling group: a set of identical VM instances that scales in or out automatically based on a metric (like CPU usage) or a schedule, with a load balancer typically distributing traffic across them
- **Availability Sets and Availability Zones** — an Availability Set spreads VMs across different physical hardware (racks, power sources) within a single datacenter, protecting against a hardware-level failure. Placing a scale set or set of VMs across Availability Zones instead spreads them across entire separate datacenters, protecting against a datacenter-level failure — the choice depends on the level of resilience actually needed
- **Spot VMs** offer steep discounts on Azure's spare compute capacity, with the tradeoff that Azure can reclaim the VM with short notice — well suited to interruptible batch workloads, mirroring AWS Spot Instances

The pattern that recurs across every cloud provider: a scale set (or Auto Scaling group) behind a load balancer, spread across zones, is how a fleet of VMs becomes resilient and traffic-adaptive rather than a handful of single points of failure.`,
  examples: [
    {
      id: "vm-size-picker",
      title: "Choosing a VM size",
      summary: "The size determines vCPU, memory, and cost — the same tradeoff EC2 instance types make.",
      code: `function App() {
  const [size, setSize] = React.useState("B2s");
  const sizes = {
    B2s: { vcpu: 2, mem: "4 GiB", note: "Burstable, cheap" },
    D4s_v5: { vcpu: 4, mem: "16 GiB", note: "Balanced general purpose" },
    F8s_v2: { vcpu: 8, mem: "16 GiB", note: "Compute optimized" },
  };
  const s = sizes[size];

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <select value={size} onChange={(e) => setSize(e.target.value)} style={{ padding: 6 }}>
        {Object.keys(sizes).map((k) => <option key={k}>{k}</option>)}
      </select>
      <div style={{ padding: 10, background: "#1e293b", color: "white", borderRadius: 6, fontSize: 13 }}>
        {s.vcpu} vCPU, {s.mem} — {s.note}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "scale-set-simulator",
      title: "A Virtual Machine Scale Set reacting to load",
      summary: "Instance count grows and shrinks with simulated CPU demand, within min/max bounds.",
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
          <div key={i} style={{ width: 40, height: 40, borderRadius: 6, background: "#0078d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 700 }}>
            VM
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Scale set bounds: min {min}, max {max}. Instances running: {desired}.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "availability-set-vs-zone",
      title: "Availability Set vs. Availability Zone",
      summary: "Protecting against a rack failure versus an entire datacenter failure.",
      code: `function App() {
  const rows = [
    { label: "Protects against", set: "Hardware/rack failure", zone: "Entire datacenter failure" },
    { label: "Scope", set: "Within one datacenter", zone: "Across separate datacenters" },
    { label: "Typical use", set: "Smaller, single-datacenter apps", zone: "Mission-critical, high-SLA apps" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>Availability Set</th>
          <th style={{ padding: 8, textAlign: "left" }}>Availability Zone</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.label}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.set}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.zone}</td>
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
