import type { Topic } from "../../types";

export const awsRdsBasicsTopic: Topic = {
  id: "aws-rds-basics",
  title: "RDS: Managed Relational Databases",
  category: "Storage & Databases",
  shortExplanation: `**RDS** (Relational Database Service) runs a relational database (PostgreSQL, MySQL, and others) without you managing the underlying server.

- AWS handles provisioning, OS patching, and backups
- **Multi-AZ** deployments keep a synced standby ready to fail over to automatically
- **Read replicas** offload read traffic to additional copies, scaling reads independently of writes`,
  longExplanation: `RDS takes a familiar relational database engine — PostgreSQL, MySQL, MariaDB, SQL Server, Oracle — and removes the operational burden of running it yourself: no OS to patch, no backup script to write and monitor, no manual failover process to build.

- **Managed operations** — RDS handles routine tasks that would otherwise be manual work: automated backups (with point-in-time recovery to any second within your retention window), OS and database engine patching during a maintenance window you choose, and automated storage scaling as your data grows
- **Multi-AZ deployments** — RDS can maintain a synchronously replicated standby copy of your database in a second Availability Zone. If the primary instance or its AZ fails, RDS automatically fails over to the standby, typically within a minute or two, without any manual intervention or application-level changes (the connection endpoint stays the same)
- **Read replicas** — separate from Multi-AZ, a read replica is an additional, asynchronously replicated copy of your database that can serve read queries. If an application is read-heavy (many more \`SELECT\`s than writes), directing reads to one or more replicas takes load off the primary instance, which continues to handle all writes. Replicas can even live in a different Region for disaster recovery or lower-latency reads elsewhere
- **Instance classes** — like EC2, you choose an instance type (CPU/memory) sized to your workload, and can resize it later, typically with a brief downtime or failover
- **Backups and snapshots** — automated daily backups plus transaction logs enable point-in-time restore; you can also take manual snapshots before a risky change, as a known-good rollback point
- **When RDS isn't the right fit** — RDS is still a relational database with a fixed schema and vertical-scaling limits. Workloads needing massive horizontal write scale, a flexible/schema-less data model, or single-digit-millisecond latency at huge scale often reach for DynamoDB instead (the next topic)

The pattern to remember: **Multi-AZ is for availability** (surviving a failure), while **read replicas are for scalability** (spreading out read load) — the two solve different problems and are commonly used together.`,
  examples: [
    {
      id: "multi-az-vs-replica",
      title: "Multi-AZ standby vs. a read replica",
      summary: "Two different copies of your database, solving two different problems.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ flex: 1, padding: 12, background: "#232f3e", color: "white", borderRadius: 8 }}>
        <strong>Multi-AZ standby</strong>
        <p style={{ fontSize: 13, color: "#d1d5db" }}>Synchronous copy, different AZ. Not queryable directly. Exists purely for automatic failover.</p>
      </div>
      <div style={{ flex: 1, padding: 12, background: "#ff9900", color: "#232f3e", borderRadius: 8 }}>
        <strong>Read replica</strong>
        <p style={{ fontSize: 13 }}>Asynchronous copy. Queryable — offloads SELECT traffic from the primary instance.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "failover-simulation",
      title: "Simulating an automatic Multi-AZ failover",
      summary: "The primary fails; RDS promotes the standby, and the endpoint stays the same.",
      code: `function App() {
  const [failed, setFailed] = React.useState(false);
  const [failedOver, setFailedOver] = React.useState(false);

  React.useEffect(() => {
    if (!failed) return;
    const t = setTimeout(() => setFailedOver(true), 1200);
    return () => clearTimeout(t);
  }, [failed]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => { setFailed(true); setFailedOver(false); }}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}
      >
        Simulate primary failure
      </button>
      <div style={{ padding: 12, borderRadius: 8, background: !failed ? "#dcfce7" : failedOver ? "#dcfce7" : "#fef3c7" }}>
        {!failed && "Serving from: primary (us-east-1a)"}
        {failed && !failedOver && "Primary unreachable — failing over..."}
        {failedOver && "Serving from: promoted standby (us-east-1b) — same endpoint, app needed no changes"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "read-write-splitting",
      title: "Splitting reads and writes across replicas",
      summary: "Writes always go to the primary; reads can be distributed across replicas.",
      code: `function App() {
  const [log, setLog] = React.useState([]);
  const replicas = ["replica-1", "replica-2"];
  let rrIndex = 0;

  const runQuery = (type) => {
    const target = type === "write" ? "primary" : replicas[rrIndex++ % replicas.length];
    setLog((l) => [...l, \`\${type.toUpperCase()} → \${target}\`].slice(-6));
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => runQuery("write")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>Run INSERT</button>
        <button onClick={() => runQuery("read")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>Run SELECT</button>
      </div>
      <pre style={{ background: "#111827", color: "#86efac", padding: 10, borderRadius: 6, minHeight: 60, fontSize: 12 }}>
        {log.length ? log.join("\\n") : "Run a query to see where it's routed."}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
