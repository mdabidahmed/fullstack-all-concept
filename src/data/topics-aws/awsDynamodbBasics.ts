import type { Topic } from "../../types";

export const awsDynamodbBasicsTopic: Topic = {
  id: "aws-dynamodb-basics",
  title: "DynamoDB: Managed NoSQL at Scale",
  category: "Storage & Databases",
  shortExplanation: `**DynamoDB** is a fully managed, serverless NoSQL database built for consistent, single-digit-millisecond performance at any scale.

- Data is stored in **tables** of **items** (like rows), each with flexible attributes (like columns)
- Every item is located by a **partition key** (and optionally a **sort key**)
- Throughput scales automatically — there's no server to size or resize`,
  longExplanation: `DynamoDB trades the flexibility of SQL (joins, ad-hoc queries) for extremely predictable, fast performance at massive scale — a design shaped by how it physically distributes data.

- **Tables, items, attributes** — a table holds items (similar to rows), and each item is a set of attributes (similar to columns), but items in the same table don't need identical attributes, much like documents in a MongoDB collection
- **Partition key** — every item must have a partition key, and DynamoDB uses it to decide *which physical partition* (an internal storage/compute unit) stores that item. Choosing a partition key with high cardinality (many distinct values, evenly accessed) is critical — a poorly chosen key concentrates traffic on one partition and creates a bottleneck, no matter how much overall capacity you provision
- **Sort key (optional)** — combined with a partition key, a sort key lets multiple items share the same partition key while remaining individually addressable and queryable in order (e.g. partition key \`userId\`, sort key \`orderDate\`, to fetch one user's orders sorted by date)
- **On-demand vs. provisioned capacity** — provisioned mode lets you set (and pay for) a specific read/write throughput, scaling it manually or via Auto Scaling; on-demand mode bills purely per request and scales instantly, trading a lower ceiling on cost predictability for zero capacity planning
- **Global Secondary Indexes (GSIs)** — since DynamoDB is fast primarily because it looks things up by key, a GSI lets you efficiently query by an *different* attribute than the table's primary key, at the cost of extra storage and eventually-consistent reads on that index
- **Consistency model** — reads default to **eventually consistent** (fast, might momentarily reflect a slightly stale value after a very recent write) but can be requested as **strongly consistent** (guaranteed latest value, at a small latency/cost tradeoff)
- **DynamoDB Streams** capture a time-ordered log of item-level changes (inserts, updates, deletes), commonly used to trigger a Lambda function in response — e.g. sending a notification whenever a new order item is written

The core mental shift from a relational mindset: **design the table around your access patterns first** (what queries will you actually run?), rather than normalizing data first and figuring out queries later — DynamoDB rewards knowing your read patterns upfront.`,
  examples: [
    {
      id: "table-items-render",
      title: "A DynamoDB table, rendered as items",
      summary: "Items sharing a table without an identical set of attributes.",
      code: `function App() {
  const items = [
    { userId: "u1", orderDate: "2024-01-05", total: 42.5 },
    { userId: "u1", orderDate: "2024-02-10", total: 18.0, giftWrap: true },
    { userId: "u2", orderDate: "2024-01-20", total: 99.99 },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item, i) => (
        <pre key={i} style={{ background: "#111827", color: "#93c5fd", padding: 10, borderRadius: 6, fontSize: 12 }}>
          {JSON.stringify(item, null, 2)}
        </pre>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Partition key: userId. Sort key: orderDate. u1's two orders share a partition but stay individually addressable.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "partition-distribution",
      title: "Good vs. bad partition key distribution",
      summary: "A high-cardinality key spreads load evenly; a low-cardinality one creates a hot partition.",
      code: `function App() {
  const [key, setKey] = React.useState("userId");
  const good = { p1: 3, p2: 4, p3: 3 };
  const bad = { p1: 10, p2: 0, p3: 0 };
  const dist = key === "userId" ? good : bad;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setKey("userId")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: key === "userId" ? "#ff9900" : "#e5e7eb", cursor: "pointer" }}>Partition key: userId</button>
        <button onClick={() => setKey("status")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: key === "status" ? "#ff9900" : "#e5e7eb", cursor: "pointer" }}>Partition key: status</button>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {Object.entries(dist).map(([p, count]) => (
          <div key={p} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: count * 12, background: count > 6 ? "#dc2626" : "#16a34a", borderRadius: 4 }} />
            <div style={{ fontSize: 12, marginTop: 4 }}>{p}: {count} items/sec</div>
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {key === "userId" ? "Many distinct values → traffic spreads across partitions." : "Few distinct values (e.g. only 3 possible statuses) → one 'hot' partition absorbs most traffic."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "consistency-toggle",
      title: "Eventually consistent vs. strongly consistent reads",
      summary: "A just-written value may briefly lag on an eventually consistent read.",
      code: `function App() {
  const [written, setWritten] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setWritten(true)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>
        Write item (total: 42.50 → 50.00)
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#fef3c7", borderRadius: 6 }}>
          Eventually consistent read: <strong>{written ? "42.50 (briefly stale)" : "42.50"}</strong>
        </div>
        <div style={{ flex: 1, padding: 10, background: "#dcfce7", borderRadius: 6 }}>
          Strongly consistent read: <strong>{written ? "50.00" : "42.50"}</strong>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
