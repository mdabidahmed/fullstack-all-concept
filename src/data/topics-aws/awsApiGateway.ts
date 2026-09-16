import type { Topic } from "../../types";

export const awsApiGatewayTopic: Topic = {
  id: "aws-api-gateway",
  title: "API Gateway",
  category: "Compute",
  shortExplanation: `**API Gateway** is a managed front door for APIs — it receives HTTP requests and routes them to a backend, commonly a Lambda function.

- Handles routing, authentication, and **throttling** before a request ever reaches your backend
- Supports **REST APIs** (more features) and **HTTP APIs** (simpler, cheaper, lower latency)
- **Stages** (e.g. \`dev\`, \`prod\`) let the same API definition be deployed independently at different URLs`,
  longExplanation: `API Gateway is the piece that turns a Lambda function (or any backend) into a proper, internet-facing API — handling everything an API needs beyond the business logic itself: routing, request validation, authentication, rate limiting, and response transformation.

- **Resources and methods** — an API is defined as a tree of resources (URL paths like \`/users\` and \`/users/{id}\`), each supporting one or more HTTP methods (GET, POST, PUT, DELETE), which map to a specific backend integration
- **Lambda proxy integration** is the most common pattern: API Gateway forwards the entire request (path, headers, body, query string) to a Lambda function as a single event object, and the function's return value becomes the HTTP response — keeping all the routing logic in one place instead of split across gateway configuration and code
- **Throttling** — API Gateway can enforce a maximum request rate (and burst capacity) per API key or client, protecting the backend from being overwhelmed by a traffic spike or a runaway client, independent of whether the backend itself could scale to handle it
- **Authentication and authorization** — API Gateway can validate a request's credentials (an API key, an IAM signature, a Cognito user token, or a custom Lambda authorizer) *before* it ever reaches your backend code, so unauthenticated requests never consume backend compute
- **Stages** — the same API definition can be deployed to multiple named stages (\`dev\`, \`staging\`, \`prod\`), each with its own URL and, if needed, its own configuration overrides (throttling limits, backend integration) — letting a team test changes in \`dev\` before promoting them to \`prod\`
- **REST API vs. HTTP API** — REST APIs support the full feature set (request/response transformation, API keys, usage plans) at a higher cost and latency; HTTP APIs are a newer, leaner option covering the most common use cases (routing, JWT authorization) at roughly a third of the cost and lower latency, and are the default choice unless a REST-API-only feature is specifically needed
- **Caching** — API Gateway can cache responses for a configurable TTL, serving repeated identical requests without invoking the backend at all, which is useful for endpoints returning largely static or slow-changing data

The typical serverless API shape: **client → API Gateway (routing, auth, throttling) → Lambda (business logic) → DynamoDB (data)** — with API Gateway absorbing every cross-cutting concern that would otherwise need to be reimplemented inside every Lambda function.`,
  examples: [
    {
      id: "resource-method-tree",
      title: "A resource/method tree mapped to Lambda functions",
      summary: "Different paths and HTTP methods route to different backend integrations.",
      code: `function App() {
  const routes = [
    { method: "GET", path: "/users", fn: "listUsers" },
    { method: "POST", path: "/users", fn: "createUser" },
    { method: "GET", path: "/users/{id}", fn: "getUser" },
    { method: "DELETE", path: "/users/{id}", fn: "deleteUser" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <tbody>
        {routes.map((r) => (
          <tr key={r.method + r.path} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 700, color: "#b45309" }}>{r.method}</td>
            <td style={{ padding: 8, fontFamily: "monospace" }}>{r.path}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>→ Lambda: {r.fn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "throttling-simulator",
      title: "Throttling protecting the backend",
      summary: "Requests beyond the configured rate limit are rejected before reaching Lambda.",
      code: `function App() {
  const [sent, setSent] = React.useState(0);
  const limit = 5;

  const send = () => setSent((s) => s + 1);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={send} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>
        Send request
      </button>
      <div style={{ padding: 12, borderRadius: 8, background: sent <= limit ? "#dcfce7" : "#fee2e2" }}>
        Request #{sent}: {sent <= limit ? "200 OK — forwarded to Lambda" : "429 Too Many Requests — throttled"}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Rate limit set to {limit} requests. Lambda never even sees the throttled ones.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "stages-diagram",
      title: "One API definition, multiple stages",
      summary: "Deploying the same API to dev and prod independently.",
      code: `function App() {
  const stages = [
    { name: "dev", url: "https://abc123.execute-api.../dev", version: "v1.4.0-rc" },
    { name: "prod", url: "https://abc123.execute-api.../prod", version: "v1.3.2" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {stages.map((s) => (
        <div key={s.name} style={{ padding: 10, background: "#f3f4f6", borderRadius: 6 }}>
          <strong>{s.name}</strong> — deployed version {s.version}
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#6b7280" }}>{s.url}</div>
        </div>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>Testing a change in dev doesn't affect prod traffic until it's explicitly deployed there.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
