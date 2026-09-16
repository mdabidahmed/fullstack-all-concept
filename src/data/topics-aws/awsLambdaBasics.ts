import type { Topic } from "../../types";

export const awsLambdaBasicsTopic: Topic = {
  id: "aws-lambda-basics",
  title: "Lambda: Serverless Functions",
  category: "Compute",
  shortExplanation: `**Lambda** runs your code in response to **events**, without you provisioning or managing any server.

- You upload a function; AWS runs it only when **triggered**, then shuts it down
- You're billed per **invocation** and per **millisecond of execution**, not for idle time
- Common triggers: an HTTP request (via API Gateway), a file upload to S3, a database change, or a schedule`,
  longExplanation: `Lambda is the flagship example of **serverless computing** — "serverless" doesn't mean there's no server, it means you never think about one. You write a function, upload it, and AWS handles provisioning, scaling, and patching the underlying compute entirely.

- **Event-driven execution** — a Lambda function does nothing until something triggers it: an HTTP request hitting an API Gateway endpoint, a new object landing in an S3 bucket, a row changing in DynamoDB, a scheduled CloudWatch Events rule ("run every night at midnight"), or a message arriving in an SQS queue
- **Automatic scaling** — if 1,000 events arrive simultaneously, Lambda can run up to 1,000 concurrent invocations of your function (up to an account limit) without any configuration; if zero events arrive, zero instances run and you pay nothing
- **Pay-per-use billing** — cost is based on the number of invocations plus **GB-seconds** (memory allocated × execution duration), rounded to the nearest millisecond. A function that runs for 50ms, 100 times a day, costs a small fraction of a cent — there's no cost for the hours it sits idle between invocations
- **Cold starts** — the first invocation after a period of inactivity may take noticeably longer, because AWS has to initialize a fresh execution environment before running your code; subsequent invocations reuse that "warm" environment and are much faster
- **Execution time limit** — a single invocation can run for a maximum of 15 minutes, which makes Lambda well-suited to short, discrete tasks (resizing an uploaded image, validating an API request, processing one queue message) rather than long-running background jobs
- **Statelessness** — you generally can't rely on anything persisting in memory between invocations (though a warm environment sometimes reuses memory as an optimization, it's never guaranteed); durable state belongs in a database like DynamoDB or S3, not in the function itself

The combination **API Gateway → Lambda → DynamoDB** is one of the most common serverless architecture patterns: an HTTP request triggers a function, which reads or writes to a managed NoSQL database, with no server provisioned or managed at any layer.`,
  examples: [
    {
      id: "event-trigger-simulator",
      title: "Firing a Lambda function from different triggers",
      summary: "The same function invoked by an HTTP call, a file upload, and a schedule.",
      code: `function App() {
  const [log, setLog] = React.useState([]);

  const invoke = (source) => {
    setLog((l) => [...l, \`[\${new Date().toLocaleTimeString()}] Lambda invoked by: \${source}\`]);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => invoke("API Gateway (HTTP request)")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>HTTP request</button>
        <button onClick={() => invoke("S3 (file uploaded)")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>S3 upload</button>
        <button onClick={() => invoke("CloudWatch (scheduled)")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>Scheduled</button>
      </div>
      <pre style={{ background: "#111827", color: "#86efac", padding: 10, borderRadius: 6, minHeight: 60, fontSize: 12 }}>
        {log.length ? log.join("\\n") : "No invocations yet — click a trigger above."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "billing-calculator",
      title: "Estimating a pay-per-invocation bill",
      summary: "Cost scales with invocations and memory × duration — never with idle time.",
      code: `function App() {
  const [invocations, setInvocations] = React.useState(100000);
  const [durationMs, setDurationMs] = React.useState(120);
  const memoryGb = 0.5;
  const gbSeconds = invocations * (durationMs / 1000) * memoryGb;
  const cost = gbSeconds * 0.0000166667 + invocations * 0.0000002;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <label style={{ fontSize: 13 }}>
        Invocations / month: {invocations.toLocaleString()}
        <input type="range" min="0" max="1000000" step="10000" value={invocations} onChange={(e) => setInvocations(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <label style={{ fontSize: 13 }}>
        Avg. duration: {durationMs}ms
        <input type="range" min="10" max="2000" step="10" value={durationMs} onChange={(e) => setDurationMs(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>
        Estimated monthly cost: <strong>\${cost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cold-vs-warm-start",
      title: "Cold start vs. warm start",
      summary: "Why the first invocation after idle time is slower than the ones right after it.",
      code: `function App() {
  const [invokedOnce, setInvokedOnce] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setInvokedOnce(true)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}
      >
        Invoke function
      </button>
      <div style={{ padding: 12, borderRadius: 8, background: invokedOnce ? "#dcfce7" : "#fef3c7" }}>
        {invokedOnce
          ? "Warm start: ~5ms — reused an already-initialized execution environment."
          : "Cold start: ~350ms — AWS must initialize a fresh environment before your code runs."}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Click again to invoke a second time and see the warm-start path.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
