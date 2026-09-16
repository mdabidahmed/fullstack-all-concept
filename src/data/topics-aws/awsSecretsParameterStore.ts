import type { Topic } from "../../types";

export const awsSecretsParameterStoreTopic: Topic = {
  id: "aws-secrets-parameter-store",
  title: "Secrets Manager & Parameter Store",
  category: "AWS Fundamentals",
  shortExplanation: `Configuration and secrets shouldn't be hardcoded into your application code — AWS offers two managed services to store them instead:

- **Systems Manager Parameter Store** — free tier for configuration values and simple secrets
- **Secrets Manager** — purpose-built for secrets, with automatic rotation and tighter integration with databases`,
  longExplanation: `Hardcoding a database password or API key directly into source code is a common security mistake — it ends up in git history, is visible to anyone with repo access, and can't be changed without a code deployment. AWS offers two managed services specifically to avoid this.

- **Parameter Store** (part of AWS Systems Manager) stores configuration data and secrets as key-value pairs, organized hierarchically (e.g. \`/myapp/prod/db-host\`). Standard parameters are free; it supports plain strings, string lists, and \`SecureString\` values encrypted with KMS
- **Secrets Manager** is purpose-built for secrets specifically (database credentials, API keys, OAuth tokens), and adds capabilities Parameter Store doesn't have: **automatic rotation** on a schedule (Secrets Manager can even coordinate with RDS to rotate a database password and update it in both places atomically), and native integration with services that need to fetch a secret securely at runtime
- **Why not environment variables alone?** — environment variables are a step up from hardcoding, but they're often visible in process listings, crash dumps, or logging output, and rotating one still typically requires redeploying. Fetching a secret from Secrets Manager or Parameter Store at runtime means rotation doesn't require a code deployment at all
- **IAM-gated access** — both services rely on IAM policies to control which users or roles can read which secrets, so a Lambda function's execution role can be scoped to read only the one database credential it actually needs, not every secret in the account
- **Cost tradeoff** — Parameter Store's standard tier is free, making it attractive for simple configuration; Secrets Manager charges per secret and per API call, which is the price for automatic rotation and its tighter security tooling. Many teams use Parameter Store for general config and Secrets Manager specifically for credentials that need rotation
- **Caching** — since fetching a secret is a network call, applications typically cache it in memory for some period rather than fetching it on every single request, refreshing periodically or on a rotation event

The core principle either service enables: application code references *where* a secret lives, never the secret's value itself — the value is fetched at runtime and can change without touching a single line of code.`,
  examples: [
    {
      id: "hardcoded-vs-fetched",
      title: "Hardcoded secret vs. fetched at runtime",
      summary: "The same connection string, before and after moving the password out of source code.",
      code: `function App() {
  const [usingSecretsManager, setUsingSecretsManager] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setUsingSecretsManager((v) => !v)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}
      >
        Toggle approach
      </button>
      <pre style={{ background: "#111827", color: usingSecretsManager ? "#86efac" : "#fca5a5", padding: 12, borderRadius: 6, fontSize: 12 }}>
{usingSecretsManager
  ? \`const secret = await secretsManager.getSecretValue({ SecretId: "prod/db" });\nconst db = connect(secret.host, secret.password);\`
  : \`const db = connect("prod-db.example.com", "hunter2"); // committed to git!\`}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {usingSecretsManager
          ? "The password can rotate without any code change or redeploy."
          : "This password is now permanently in git history, even if the line is later removed."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parameter-store-hierarchy",
      title: "Parameter Store's hierarchical keys",
      summary: "Organizing configuration by environment using a path-like naming convention.",
      code: `function App() {
  const params = [
    { key: "/myapp/prod/db-host", value: "prod-db.example.com", secure: false },
    { key: "/myapp/prod/db-password", value: "••••••••", secure: true },
    { key: "/myapp/staging/db-host", value: "staging-db.example.com", secure: false },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Key</th>
          <th style={{ padding: 8, textAlign: "left" }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p) => (
          <tr key={p.key} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontFamily: "monospace" }}>{p.key}</td>
            <td style={{ padding: 8, color: p.secure ? "#b45309" : "#374151" }}>{p.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "automatic-rotation-timeline",
      title: "Secrets Manager's automatic rotation",
      summary: "A password rotates on a schedule, coordinated with the database, with zero manual steps.",
      code: `function App() {
  const [day, setDay] = React.useState(0);
  const rotationDay = 30;
  const rotated = day >= rotationDay;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        Day: {day}
        <input type="range" min="0" max="40" value={day} onChange={(e) => setDay(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ padding: 12, borderRadius: 8, background: rotated ? "#dcfce7" : "#f3f4f6" }}>
        Password version: <strong>{rotated ? "v2 (rotated on day 30)" : "v1 (original)"}</strong>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        On day 30, Secrets Manager generates a new password, updates it on the RDS instance, and updates the stored secret — atomically, with no application downtime.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
