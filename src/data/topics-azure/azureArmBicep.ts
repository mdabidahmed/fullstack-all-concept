import type { Topic } from "../../types";

export const azureArmBicepTopic: Topic = {
  id: "azure-arm-bicep",
  title: "ARM Templates & Bicep: Infrastructure as Code",
  category: "Networking & Deployment",
  shortExplanation: `**ARM templates** (JSON) describe Azure resources declaratively — Azure's equivalent of CloudFormation. **Bicep** is a newer, cleaner language that compiles down to ARM JSON.

- A **deployment** applies a template to a resource group, creating or updating resources to match
- Deployments are **idempotent** — re-running an unchanged template does nothing
- **What-if** previews exactly what a deployment would change before it runs`,
  longExplanation: `Azure Resource Manager (ARM) templates are Azure's native Infrastructure as Code format — a JSON document declaring the desired resources, which ARM (the same deployment engine behind the portal and CLI) reconciles the actual environment to match.

- **ARM templates** are JSON files with a defined schema: a \`resources\` array describing what to create, \`parameters\` for values supplied at deploy time, \`variables\` for computed values reused within the template, and \`outputs\` for values to surface after deployment (like a newly created resource's connection string)
- **Bicep** is a domain-specific language that compiles directly to ARM JSON, designed specifically to fix JSON's verbosity and lack of real language features for this purpose — cleaner syntax, type safety, and modularity, without losing any ARM capability, since a Bicep file is just a more pleasant way to author the exact same underlying ARM template
- **Deployments** — running a template against a resource group is called a deployment; deployment history is retained, so you can see exactly what was deployed and when, and previous deployments can be referenced or re-applied
- **Idempotency** — like CloudFormation, re-deploying an unchanged template is a no-op; ARM computes the difference between the template's desired state and the resource group's actual state, and only touches what changed
- **What-if** — before actually applying a deployment, \`az deployment group what-if\` shows exactly what would be created, modified, or deleted, without making any change — directly analogous to a CloudFormation change set, and a critical safety check before deploying to production
- **Modules** (Bicep) let a large deployment be split into reusable, composable pieces — a "networking module" and a "database module" that a top-level template combines, rather than one enormous flat file
- **Scopes** — a deployment can target a resource group (the most common case), but also a subscription, management group, or tenant, for resources that live above the resource-group level
- **Alternatives** — Terraform works across Azure just as it does across AWS, and many teams standardize on it specifically to manage multiple clouds with one tool and language, rather than learning each provider's native IaC format separately

The direct parallel: **Bicep is to ARM JSON roughly what a higher-level language is to its compiled output** — same deployment engine and same resources underneath, just a much more pleasant format to actually author and review.`,
  examples: [
    {
      id: "bicep-vs-arm-json",
      title: "The same resource, in Bicep and in ARM JSON",
      summary: "Bicep compiles directly to this JSON — same result, far less to write and read.",
      code: `function App() {
  const [view, setView] = React.useState("bicep");
  const bicep = \`resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'mystorageacct8213'
  location: resourceGroup().location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}\`;
  const json = \`{
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2023-01-01",
  "name": "mystorageacct8213",
  "location": "[resourceGroup().location]",
  "sku": { "name": "Standard_LRS" },
  "kind": "StorageV2"
}\`;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setView("bicep")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: view === "bicep" ? "#0078d4" : "#e5e7eb", color: view === "bicep" ? "white" : "#111827", cursor: "pointer" }}>Bicep</button>
        <button onClick={() => setView("json")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: view === "json" ? "#0078d4" : "#e5e7eb", color: view === "json" ? "white" : "#111827", cursor: "pointer" }}>ARM JSON</button>
      </div>
      <pre style={{ background: "#111827", color: "#fde68a", padding: 12, borderRadius: 6, overflow: "auto", fontSize: 12 }}>
        {view === "bicep" ? bicep : json}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "what-if-preview",
      title: "Previewing a deployment with what-if",
      summary: "See exactly what would change, including a risky resource replacement, before deploying.",
      code: `function App() {
  const changes = [
    { resource: "storageAccount", action: "Modify", detail: "Enable versioning" },
    { resource: "appService", action: "Modify", detail: "Update app settings" },
    { resource: "sqlServer", action: "Replace ⚠️", detail: "Changing admin login requires replacement" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Resource</th>
          <th style={{ padding: 8, textAlign: "left" }}>Action</th>
          <th style={{ padding: 8, textAlign: "left" }}>Detail</th>
        </tr>
      </thead>
      <tbody>
        {changes.map((c) => (
          <tr key={c.resource} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8 }}>{c.resource}</td>
            <td style={{ padding: 8, color: c.action.includes("Replace") ? "#dc2626" : "#374151" }}>{c.action}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{c.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "idempotent-redeploy",
      title: "Idempotent re-deployment",
      summary: "Deploying an unchanged template again does nothing.",
      code: `function App() {
  const [deployCount, setDeployCount] = React.useState(0);
  const [changed, setChanged] = React.useState(false);

  const deploy = () => setDeployCount((c) => c + 1);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={deploy} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>Deploy template</button>
        <button onClick={() => setChanged(true)} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#e5e7eb", cursor: "pointer" }}>Edit template</button>
      </div>
      <div style={{ padding: 12, background: "#1e293b", color: "white", borderRadius: 6 }}>
        Deployment #{deployCount}: {deployCount === 0 ? "not yet run" : changed ? "resources updated" : "no changes detected — no-op"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
