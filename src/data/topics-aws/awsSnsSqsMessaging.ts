import type { Topic } from "../../types";

export const awsSnsSqsMessagingTopic: Topic = {
  id: "aws-sns-sqs-messaging",
  title: "SNS & SQS: Decoupling with Messaging",
  category: "Monitoring & Messaging",
  shortExplanation: `**SNS** and **SQS** let application components communicate without calling each other directly.

- **SNS** (Simple Notification Service) is **pub/sub** — one message fans out to every subscriber
- **SQS** (Simple Queue Service) is a **queue** — one message is processed by exactly one consumer
- Combining them (**fan-out**) lets one event trigger several independent, queued workflows`,
  longExplanation: `When one part of a system calls another directly (e.g. an API handler directly calling an email-sending function), the two become tightly coupled — if the email service is slow or down, the whole request is slow or fails. Messaging services decouple producers from consumers, so each can operate, fail, and scale independently.

- **SNS (pub/sub)** — a producer publishes a message to a **topic**, and every current **subscriber** of that topic receives a copy. Subscribers can be SQS queues, Lambda functions, email addresses, SMS numbers, or HTTP endpoints. Publishing doesn't wait for subscribers to process anything — it's fire-and-forget from the publisher's perspective
- **SQS (queues)** — a producer sends a message to a **queue**, and exactly **one** consumer retrieves and processes each message (unlike SNS's fan-out to everyone). If a consumer is temporarily unavailable or slow, messages simply wait in the queue rather than being lost or blocking the producer
- **Visibility timeout** — when a consumer retrieves a message from SQS, that message becomes temporarily invisible to other consumers rather than being deleted immediately. If the consumer successfully processes it, it explicitly deletes the message; if the consumer crashes or times out first, the message becomes visible again for another consumer to retry
- **Dead-letter queues (DLQs)** — a message that repeatedly fails processing (exceeding a configured retry count) can be automatically moved to a separate dead-letter queue, so it doesn't loop forever and can be inspected or reprocessed manually later
- **SNS + SQS fan-out** — a common pattern combines both: a single SNS topic publishes to *multiple* SQS queues, each feeding a different, independent consumer. A single "order placed" event might fan out to a queue that triggers an email, a queue that updates inventory, and a queue that triggers analytics — each processed independently, at its own pace, and a failure in one doesn't affect the others
- **Standard vs. FIFO queues** — SQS Standard queues offer at-least-once delivery and best-effort ordering (a message could theoretically arrive more than once, or slightly out of order); FIFO queues guarantee exactly-once processing and strict ordering, at a lower throughput ceiling — used when message order or duplicate-prevention genuinely matters (e.g. financial transactions)

The core distinction to remember: **SNS delivers to everyone subscribed; SQS delivers to exactly one consumer** — and choosing (or combining) the right one is about whether an event needs to notify multiple independent systems or be processed reliably, one at a time, by a worker pool.`,
  examples: [
    {
      id: "sns-fanout",
      title: "SNS publishing to multiple subscribers",
      summary: "One message, delivered to every current subscriber of the topic.",
      code: `function App() {
  const [published, setPublished] = React.useState(false);
  const subscribers = ["email-service (Lambda)", "sms-service (Lambda)", "audit-log-queue (SQS)"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setPublished(true)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>
        Publish "order-placed" to SNS topic
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        {subscribers.map((s) => (
          <div key={s} style={{ flex: 1, padding: 10, borderRadius: 8, background: published ? "#dcfce7" : "#f3f4f6", fontSize: 12, textAlign: "center" }}>
            {s} {published && "✓ received"}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sqs-single-consumer",
      title: "SQS: exactly one consumer per message",
      summary: "Two workers pull from the same queue, but each message goes to only one of them.",
      code: `function App() {
  const [queue, setQueue] = React.useState(["msg-1", "msg-2", "msg-3", "msg-4"]);
  const [log, setLog] = React.useState([]);

  const poll = (worker) => {
    setQueue((q) => {
      if (q.length === 0) return q;
      const [next, ...rest] = q;
      setLog((l) => [...l, \`\${worker} processed \${next}\`]);
      return rest;
    });
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => poll("worker-A")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>worker-A: poll</button>
        <button onClick={() => poll("worker-B")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>worker-B: poll</button>
      </div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>Queue remaining: {queue.join(", ") || "empty"}</div>
      <pre style={{ background: "#111827", color: "#86efac", padding: 10, borderRadius: 6, minHeight: 60, fontSize: 12 }}>
        {log.length ? log.join("\\n") : "No messages processed yet."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "visibility-timeout-retry",
      title: "Visibility timeout: a failed consumer, retried",
      summary: "An unacknowledged message becomes visible again for another consumer to pick up.",
      code: `function App() {
  const [state, setState] = React.useState("in-queue");

  const receive = () => setState("processing (invisible to others)");
  const crash = () => setState("visible again — worker crashed before deleting it");
  const succeed = () => setState("deleted — processed successfully");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={receive} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>Receive message</button>
        <button onClick={crash} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}>Simulate consumer crash</button>
        <button onClick={succeed} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#16a34a", color: "white", cursor: "pointer" }}>Process successfully</button>
      </div>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>Message state: {state}</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
