import type { Topic } from "../../types";

export const azureCosmosDbTopic: Topic = {
  id: "azure-cosmos-db",
  title: "Cosmos DB: Globally Distributed NoSQL",
  category: "Storage & Databases",
  shortExplanation: `**Cosmos DB** is Azure's globally distributed, multi-model NoSQL database — roughly DynamoDB's counterpart, with a distinct focus on multi-region writes.

- Data is stored as **items** in **containers**, located by a **partition key**, same shape as DynamoDB
- A single Cosmos DB account can replicate to **any number of Azure Regions**, with a few clicks
- **Multiple consistency levels** let you pick a precise tradeoff between consistency and latency`,
  longExplanation: `Cosmos DB is built around a distinct promise: turnkey global distribution. Rather than bolting on cross-Region replication as an advanced feature, Cosmos DB treats "add another Region" as a first-class, low-friction operation, with a spectrum of consistency guarantees to match.

- **Containers and items** — the basic shape mirrors DynamoDB: a container holds items (JSON documents), each located by a **partition key** that determines which physical partition stores it. Choosing a partition key with high cardinality and even access, exactly as with DynamoDB, is critical to avoiding a hot-partition bottleneck
- **Multi-region distribution** — a Cosmos DB account can add or remove Azure Regions with a few clicks, replicating data automatically. Regions can be configured for **read** access only, or for **multi-region writes**, where an application can write to whichever Region is closest to it, and Cosmos DB handles conflict resolution for concurrent writes to the same item in different Regions
- **Five consistency levels** — Cosmos DB offers a spectrum, not just an eventual/strong binary: **Strong** (linearizable, highest latency), **Bounded Staleness** (guarantees reads lag writes by at most a set time or number of updates), **Session** (the default — a single client always sees its own writes), **Consistent Prefix**, and **Eventual** (lowest latency, least strict guarantee). This granularity lets an application pick exactly the consistency/latency tradeoff a specific workload needs, rather than one global setting
- **APIs** — Cosmos DB exposes multiple API models over the same underlying engine: a native **NoSQL API** (document-oriented, closest to its native model), plus API compatibility layers for **MongoDB**, **Cassandra**, **Gremlin** (graph), and **Table** — letting an existing application written against one of those APIs migrate to Cosmos DB with comparatively little application-code change
- **Request Units (RUs)** — throughput is measured in RUs per second, an abstracted unit representing the cost of a database operation (a small point read costs roughly 1 RU; a complex query costs more), provisioned either per container or shared across a database, or consumed on-demand in **serverless** mode
- **SLA-backed guarantees** — Cosmos DB offers financially backed SLAs covering availability, latency, throughput, and consistency simultaneously, a comprehensive guarantee that's a notable differentiator versus most managed database offerings

The core distinction from DynamoDB to hold onto: **Cosmos DB was designed around low-friction multi-region distribution and a tunable consistency spectrum from day one**, where DynamoDB's global tables and consistency options were added onto an initially single-Region-first design.`,
  examples: [
    {
      id: "consistency-spectrum",
      title: "The five consistency levels, on a spectrum",
      summary: "From strictest (and slowest) to loosest (and fastest).",
      code: `function App() {
  const levels = [
    { name: "Strong", note: "Always latest value, highest latency" },
    { name: "Bounded Staleness", note: "Lag bounded by time/updates" },
    { name: "Session", note: "Your own writes always visible (default)" },
    { name: "Consistent Prefix", note: "Never see out-of-order writes" },
    { name: "Eventual", note: "Lowest latency, weakest guarantee" },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {levels.map((l, i) => (
        <div key={l.name} style={{ padding: 8, borderRadius: 6, background: "#1e293b", color: "white", marginLeft: i * 14, fontSize: 13 }}>
          <strong>{l.name}</strong> — <span style={{ color: "#cbd5e1" }}>{l.note}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-region-write",
      title: "Writing to the nearest Region",
      summary: "Multi-region writes let a client write locally instead of always reaching one primary.",
      code: `function App() {
  const [client, setClient] = React.useState("Tokyo");
  const regionFor = { Tokyo: "Japan East", "São Paulo": "Brazil South", London: "UK South" };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {Object.keys(regionFor).map((c) => (
          <button key={c} onClick={() => setClient(c)} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: client === c ? "#0078d4" : "#e5e7eb", color: client === c ? "white" : "#111827", cursor: "pointer" }}>{c}</button>
        ))}
      </div>
      <div style={{ padding: 12, background: "#1e293b", color: "white", borderRadius: 6 }}>
        Client in {client} writes to: <strong>{regionFor[client]}</strong> (nearest Region, not a fixed primary)
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "request-units-cost",
      title: "Estimating cost in Request Units",
      summary: "Different operations consume different amounts of the same throughput currency.",
      code: `function App() {
  const ops = [
    { name: "Point read (by id + partition key)", ru: 1 },
    { name: "Write a 1KB item", ru: 5 },
    { name: "Query filtering across partitions", ru: 15 },
  ];
  const [count, setCount] = React.useState(1);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        Operations per second: {count}
        <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      {ops.map((o) => (
        <div key={o.name} style={{ padding: 8, background: "#f3f4f6", borderRadius: 6, fontSize: 13 }}>
          {o.name}: {o.ru * count} RU/s needed
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
