import type { Topic } from "../../types";

export const azureEntraIdBasicsTopic: Topic = {
  id: "azure-entra-id-basics",
  title: "Microsoft Entra ID: Identity & Access",
  category: "Azure Fundamentals",
  shortExplanation: `**Microsoft Entra ID** (formerly Azure Active Directory) is Azure's identity service — it controls who can sign in and what they can do.

- **Users and groups** represent people; group membership drives access at scale
- **Role-Based Access Control (RBAC)** assigns permissions via roles, scoped to a subscription, resource group, or single resource
- A **managed identity** lets an Azure resource authenticate to other services without stored credentials`,
  longExplanation: `Microsoft Entra ID is the identity backbone underneath every sign-in to the Azure portal, and underneath authorization for what a signed-in identity is allowed to do once inside. It plays the same fundamental role IAM plays in AWS, shaped by Microsoft's long history with on-premises Active Directory.

- **Users and groups** — a user represents a person (or a service via a separate mechanism), and groups exist to manage access at scale: assign a permission to a group once, and every current and future member of that group inherits it
- **Role-Based Access Control (RBAC)** — rather than attaching a JSON policy document per identity (as in AWS IAM), Azure RBAC assigns a **role** (like "Reader", "Contributor", or "Owner") to a user, group, or application, **scoped** to a specific level: a whole subscription, one resource group, or a single resource. A "Contributor" role on one resource group grants broad permissions there, but nothing outside it
- **Built-in vs. custom roles** — Azure ships many built-in roles covering common needs (Reader: view only; Contributor: manage resources but not access; Owner: manage resources and access), and custom roles can be defined when a built-in role doesn't fit exactly
- **Managed identities** — the Azure equivalent of an IAM role assumed by an EC2 instance: a managed identity lets an Azure resource (like a VM or an Azure Function) authenticate to other Azure services without any credential stored in code or configuration. A **system-assigned** identity is tied to one resource's lifecycle; a **user-assigned** identity exists independently and can be attached to multiple resources
- **Multi-factor authentication (MFA)** and **Conditional Access** — Entra ID can require a second verification factor, and Conditional Access policies can enforce rules like "require MFA when signing in from an unfamiliar location," adding risk-based, contextual authentication on top of a plain password
- **Single sign-on (SSO)** — Entra ID is also an identity provider for other applications (including many SaaS products), letting one Entra ID sign-in grant access across multiple connected apps

The core parallel to keep in mind: **RBAC roles assigned at a scope** is Azure's version of IAM policies attached to users/groups/roles — different vocabulary, but the same principle of granting exactly the access a given scope needs, no more.`,
  examples: [
    {
      id: "rbac-scope-levels",
      title: "The same role, assigned at different scopes",
      summary: "A 'Contributor' role means something different depending on where it's assigned.",
      code: `function App() {
  const [scope, setScope] = React.useState("resourceGroup");
  const descriptions = {
    subscription: "Can manage every resource in every resource group in this subscription.",
    resourceGroup: "Can manage every resource inside rg-web-app only.",
    resource: "Can manage this one Storage Account only.",
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["subscription", "resourceGroup", "resource"].map((s) => (
          <button key={s} onClick={() => setScope(s)} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: scope === s ? "#0078d4" : "#e5e7eb", color: scope === s ? "white" : "#111827", cursor: "pointer" }}>{s}</button>
        ))}
      </div>
      <div style={{ padding: 12, background: "#1e293b", color: "white", borderRadius: 6 }}>
        Role: Contributor, scope: {scope} — {descriptions[scope]}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "managed-identity-flow",
      title: "A managed identity fetching a secret",
      summary: "No stored credentials — the VM authenticates as itself.",
      code: `function App() {
  const [log, setLog] = React.useState([]);

  const fetchSecret = () => {
    setLog((l) => [
      ...l,
      "VM requests token from Azure Instance Metadata Service",
      "Entra ID issues a short-lived token for the VM's managed identity",
      "VM uses token to read secret from Key Vault — no password ever stored",
    ]);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={fetchSecret} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>
        Fetch secret using managed identity
      </button>
      <pre style={{ background: "#111827", color: "#93c5fd", padding: 10, borderRadius: 6, minHeight: 60, fontSize: 12 }}>
        {log.length ? log.join("\\n") : "Click to simulate the flow."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conditional-access",
      title: "Conditional Access reacting to sign-in risk",
      summary: "The same user, challenged differently based on context.",
      code: `function App() {
  const [location, setLocation] = React.useState("office");
  const requiresMfa = location === "unknown";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setLocation("office")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: location === "office" ? "#0078d4" : "#e5e7eb", color: location === "office" ? "white" : "#111827", cursor: "pointer" }}>Sign in from office</button>
        <button onClick={() => setLocation("unknown")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: location === "unknown" ? "#0078d4" : "#e5e7eb", color: location === "unknown" ? "white" : "#111827", cursor: "pointer" }}>Sign in from unknown location</button>
      </div>
      <div style={{ padding: 12, borderRadius: 8, background: requiresMfa ? "#fef3c7" : "#dcfce7" }}>
        {requiresMfa ? "Conditional Access policy triggered: MFA required" : "Trusted location: password alone is sufficient"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
