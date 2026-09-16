import type { Topic } from "../../types";

export const azureFunctionsBasicsTopic: Topic = {
  id: "azure-functions-basics",
  title: "Azure Functions: Serverless Compute",
  category: "Compute",
  shortExplanation: `**Azure Functions** runs your code in response to **triggers**, without provisioning or managing any server — Azure's direct equivalent of AWS Lambda.

- A function executes only when triggered: an HTTP request, a timer, a queue message, a blob upload, and more
- Billed on the **Consumption plan** per execution and per resource-second, with no charge while idle
- **Durable Functions** extend the model to stateful, multi-step workflows`,
  longExplanation: `Azure Functions is Azure's Function-as-a-Service offering — write a function, choose what triggers it, and Azure handles provisioning, scaling, and the underlying compute entirely, the same value proposition Lambda offers on AWS.

- **Triggers** define what invokes a function: an HTTP request, a message arriving in a Storage Queue or Service Bus queue, a new blob landing in Blob Storage, a timer (cron-like schedule), or a change in Cosmos DB. A function typically has exactly one trigger, though it can also read from and write to other services via **bindings** — a declarative way to connect input/output data sources without writing that plumbing code by hand
- **Hosting plans** — the **Consumption plan** scales automatically from zero, billed per execution and per GB-second of resource consumption, with no charge for idle time (Lambda's exact billing model). The **Premium plan** keeps a small number of "pre-warmed" instances ready, trading some of that cost efficiency for eliminating cold starts. The **Dedicated (App Service) plan** runs functions on already-provisioned App Service infrastructure, useful when a function needs to run alongside a web app on the same underlying compute
- **Cold starts** — on the Consumption plan, a function that hasn't run recently incurs extra latency on its next invocation while Azure spins up a fresh execution environment, exactly the same tradeoff Lambda makes; the Premium plan exists specifically to avoid this for latency-sensitive workloads
- **Durable Functions** — an extension for orchestrating stateful, multi-step workflows as code (e.g. "call function A, wait for it to finish, then call B and C in parallel, then D"), using a special orchestrator function that checkpoints its progress, so a long-running or multi-step process doesn't need to be manually stitched together from independent event triggers
- **Execution time limits** — a Consumption-plan function is capped at a maximum duration (default 5 minutes, configurable up to 10), reinforcing that Functions are meant for short, discrete units of work rather than long-running processes; a Premium or Dedicated plan removes this ceiling
- **Language support** — Functions support multiple languages (C#, JavaScript/TypeScript, Python, Java, PowerShell) in the same underlying hosting model, letting a team pick the language that fits the task rather than being locked into one runtime

The pattern that mirrors Lambda directly: **HTTP trigger → Function → Cosmos DB or Storage**, with bindings absorbing the boilerplate of reading input and writing output, similar to how API Gateway plus Lambda proxy integration works on AWS.`,
  examples: [
    {
      id: "trigger-simulator",
      title: "Firing a function from different triggers",
      summary: "The same function invoked by an HTTP call, a timer, and a queue message.",
      code: `function App() {
  const [log, setLog] = React.useState([]);

  const invoke = (source) => setLog((l) => [...l, \`[\${new Date().toLocaleTimeString()}] Function invoked by: \${source}\`]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => invoke("HTTP trigger")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>HTTP request</button>
        <button onClick={() => invoke("Timer trigger (every 5 min)")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>Timer</button>
        <button onClick={() => invoke("Queue trigger (new message)")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>Queue message</button>
      </div>
      <pre style={{ background: "#111827", color: "#86efac", padding: 10, borderRadius: 6, minHeight: 60, fontSize: 12 }}>
        {log.length ? log.join("\\n") : "No invocations yet."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hosting-plan-comparison",
      title: "Consumption vs. Premium plan",
      summary: "Trading cost efficiency for eliminating cold starts.",
      code: `function App() {
  const rows = [
    { label: "Scales from zero", consumption: "Yes", premium: "Keeps warm instances" },
    { label: "Cold starts", consumption: "Possible", premium: "Effectively eliminated" },
    { label: "Billing", consumption: "Per execution + GB-sec", premium: "Per pre-allocated instance" },
    { label: "Max duration", consumption: "10 minutes", premium: "Unbounded" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>Consumption</th>
          <th style={{ padding: 8, textAlign: "left" }}>Premium</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.label}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.consumption}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.premium}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "durable-orchestration",
      title: "A Durable Functions orchestration",
      summary: "Multiple steps, some sequential and some parallel, checkpointed as they complete.",
      code: `function App() {
  const [step, setStep] = React.useState(0);
  const steps = ["Call: validateOrder", "Call: chargePayment + reserveInventory (parallel)", "Call: sendConfirmation"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setStep((s) => Math.min(s + 1, steps.length))}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}
      >
        Advance orchestration
      </button>
      <div style={{ display: "grid", gap: 6 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ padding: 8, borderRadius: 6, background: i < step ? "#dcfce7" : "#f3f4f6", fontSize: 13 }}>
            {s} {i < step && "✓"}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
