import type { Topic } from "../../types";

export const azureIntroductionTopic: Topic = {
  id: "azure-introduction",
  title: "Azure Introduction",
  category: "Azure Fundamentals",
  shortExplanation: `**Microsoft Azure** is a cloud computing platform — like AWS, it rents compute, storage, networking, and databases on demand instead of you owning hardware.

- Organized around **resource groups** — logical containers that hold related resources
- Billed **pay-as-you-go**, the same core model as every major cloud provider
- Deep integration with Microsoft's ecosystem (Active Directory, Windows Server, .NET) is Azure's biggest differentiator`,
  longExplanation: `Azure is Microsoft's cloud platform, and the second-largest cloud provider after AWS. The underlying value proposition is the same one every cloud shares — rent capacity instead of owning it, scale in minutes, pay for what you use — but Azure's organization and its deepest strengths reflect Microsoft's enterprise and Windows heritage.

- **Resource groups** are Azure's organizing unit: a logical container holding related resources (a VM, its storage, its network interface) that share a lifecycle — deleting a resource group deletes everything inside it, similar in spirit to a CloudFormation stack, but resource groups exist for *organization*, not just for one deployment's lifecycle
- **Subscriptions** sit above resource groups — a billing and access-management boundary, typically one subscription per environment or department, containing many resource groups
- **Azure Resource Manager (ARM)** is the deployment and management layer underneath the portal, CLI, and SDKs — every action, whether clicked in the portal or run via command line, ultimately goes through ARM, which is also what ARM templates (Azure's IaC format) target directly
- **Regions and geographies** — like AWS Regions, Azure Regions are geographic areas containing datacenters; Azure additionally groups Regions into **geographies** (e.g. "United States"), relevant for data-residency and compliance requirements that require staying within a broader jurisdiction, not just one Region
- **Enterprise and hybrid strength** — Azure's most distinct advantage is deep integration with tools many enterprises already run: Active Directory (now Microsoft Entra ID), Windows Server, SQL Server, and .NET. **Azure Arc** extends Azure management to servers running outside Azure entirely — on-premises or in another cloud — which is a hybrid-cloud story AWS and GCP don't match as directly
- **Pricing model** — pay-as-you-go by default, with Reserved Instances (a discount for a 1-3 year compute commitment, mirroring AWS Reserved Instances) and a free tier for trying services at small scale

The organizational hierarchy to remember: **Management Group → Subscription → Resource Group → Resource** — a structure aimed squarely at how larger organizations already segment cost, access, and compliance.`,
  examples: [
    {
      id: "resource-hierarchy",
      title: "Azure's resource hierarchy",
      summary: "Subscription → resource group → resources, the organizing structure behind everything in Azure.",
      code: `function App() {
  const sub = {
    name: "Subscription: Production",
    groups: [
      { name: "rg-web-app", resources: ["App Service", "SQL Database", "Storage Account"] },
      { name: "rg-networking", resources: ["Virtual Network", "Network Security Group"] },
    ],
  };

  return (
    <div style={{ border: "2px solid #0078d4", borderRadius: 10, padding: 14 }}>
      <strong>{sub.name}</strong>
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        {sub.groups.map((g) => (
          <div key={g.name} style={{ padding: 10, background: "#1e293b", color: "white", borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{g.name}</div>
            <div style={{ fontSize: 12, color: "#cbd5e1" }}>{g.resources.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "resource-group-delete",
      title: "Deleting a resource group",
      summary: "One action tears down every resource it contains — for better or worse.",
      code: `function App() {
  const [deleted, setDeleted] = React.useState(false);
  const resources = ["App Service", "SQL Database", "Storage Account"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setDeleted(true)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}
      >
        Delete resource group "rg-web-app"
      </button>
      {!deleted ? (
        <ul style={{ fontSize: 13 }}>{resources.map((r) => <li key={r}>{r}</li>)}</ul>
      ) : (
        <p style={{ color: "#6b7280", fontSize: 13 }}>All 3 resources deleted along with the group — a single action, no per-resource cleanup.</p>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cloud-comparison",
      title: "Azure vs. AWS: same idea, different names",
      summary: "The underlying concepts map directly across providers, just with different terminology.",
      code: `function App() {
  const rows = [
    { concept: "Virtual server", azure: "Virtual Machine", aws: "EC2 instance" },
    { concept: "Serverless function", azure: "Azure Functions", aws: "Lambda" },
    { concept: "Object storage", azure: "Blob Storage", aws: "S3" },
    { concept: "Resource container", azure: "Resource Group", aws: "(no direct equivalent)" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Concept</th>
          <th style={{ padding: 8, textAlign: "left" }}>Azure</th>
          <th style={{ padding: 8, textAlign: "left" }}>AWS</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.concept} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.concept}</td>
            <td style={{ padding: 8, color: "#0078d4" }}>{r.azure}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.aws}</td>
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
