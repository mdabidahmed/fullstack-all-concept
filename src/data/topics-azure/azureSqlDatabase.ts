import type { Topic } from "../../types";

export const azureSqlDatabaseTopic: Topic = {
  id: "azure-sql-database",
  title: "Azure SQL Database",
  category: "Storage & Databases",
  shortExplanation: `**Azure SQL Database** is a fully managed relational database built on the SQL Server engine — Azure's equivalent of RDS.

- AWS handles patching, backups, and high availability automatically
- **DTUs** or **vCores** measure the compute/performance you provision
- **Active geo-replication** keeps readable, near-real-time copies in other Regions`,
  longExplanation: `Azure SQL Database takes the SQL Server engine — the same one many teams already run on-premises — and offers it as a fully managed service, removing the operational overhead of patching, backups, and failover that self-managed SQL Server requires.

- **Fully managed** — Azure handles OS and database engine patching, automated backups (with point-in-time restore), and infrastructure maintenance, the same value proposition RDS offers on AWS
- **Purchasing models** — the **DTU-based model** bundles compute, memory, and I/O into a single, simplified performance unit; the **vCore-based model** lets you choose compute and storage independently, and is what enables **Azure Hybrid Benefit** (reusing an existing on-premises SQL Server license for a discount on Azure)
- **Deployment options** — a **single database** is the simplest unit, fully isolated with its own resources; an **elastic pool** shares a pool of resources across multiple databases with unpredictable, non-overlapping usage patterns (useful for many similar databases, like one per tenant in a SaaS product), which is more cost-efficient than provisioning each database for its own peak load
- **High availability** — every tier includes built-in redundancy; higher tiers add zone-redundant configurations that spread replicas across Availability Zones, similar in spirit to RDS Multi-AZ, largely managed transparently without a separate "Multi-AZ" toggle to configure
- **Active geo-replication** creates up to four readable secondary copies of a database in other Regions, kept close to up to date asynchronously — usable both for disaster recovery (a secondary can be promoted to primary) and for offloading read traffic closer to geographically distant users, covering the same two use cases RDS read replicas and Multi-AZ split between them
- **Elastic scaling** — compute and storage can be scaled up or down with minimal downtime, and the **Serverless** compute tier can auto-pause during inactivity and auto-scale based on load, billing per second of actual usage rather than for continuously provisioned capacity
- **Built-in intelligence** — Azure SQL Database includes automatic tuning recommendations and threat-detection features layered on top of the base database service, aimed at reducing the manual DBA tuning work a self-managed SQL Server would otherwise require

The parallel to keep in mind: **DTUs/vCores are Azure's version of choosing an RDS instance class**, and **active geo-replication covers both the disaster-recovery role of Multi-AZ and the read-scaling role of read replicas** in a single feature.`,
  examples: [
    {
      id: "dtu-vs-vcore",
      title: "DTU model vs. vCore model",
      summary: "A bundled performance unit versus independently scalable compute and storage.",
      code: `function App() {
  const [model, setModel] = React.useState("dtu");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setModel("dtu")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: model === "dtu" ? "#0078d4" : "#e5e7eb", color: model === "dtu" ? "white" : "#111827", cursor: "pointer" }}>DTU model</button>
        <button onClick={() => setModel("vcore")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: model === "vcore" ? "#0078d4" : "#e5e7eb", color: model === "vcore" ? "white" : "#111827", cursor: "pointer" }}>vCore model</button>
      </div>
      <div style={{ padding: 12, background: "#1e293b", color: "white", borderRadius: 6, fontSize: 13 }}>
        {model === "dtu"
          ? "Standard S3: 100 DTUs — a single bundled number covering compute, memory, and I/O."
          : "GP_Gen5_4: 4 vCores, 20GB memory, storage chosen separately — and eligible for Azure Hybrid Benefit."}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "elastic-pool-sharing",
      title: "An elastic pool sharing resources across databases",
      summary: "Ten low-traffic tenant databases sharing one pool of DTUs, instead of provisioning each separately.",
      code: `function App() {
  const dbs = ["tenant-01", "tenant-02", "tenant-03", "tenant-04", "tenant-05"];
  const [active, setActive] = React.useState(null);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ padding: 8, background: "#0078d4", color: "white", borderRadius: 6, fontSize: 13, textAlign: "center" }}>
        Elastic pool: 100 DTUs shared
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {dbs.map((db) => (
          <button key={db} onClick={() => setActive(db)} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: active === db ? "#fbbf24" : "#e5e7eb", cursor: "pointer", fontSize: 12 }}>{db}</button>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {active ? \`\${active} borrows extra DTUs from the shared pool during its traffic spike.\` : "Click a database to simulate a traffic spike."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "geo-replication-map",
      title: "Active geo-replication to a secondary Region",
      summary: "A readable secondary, ready for disaster recovery or offloading distant reads.",
      code: `function App() {
  const [promoted, setPromoted] = React.useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setPromoted(true)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}>
        Simulate East US failure — promote secondary
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: promoted ? "#f3f4f6" : "#dcfce7" }}>East US: {promoted ? "failed" : "primary"}</div>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: promoted ? "#dcfce7" : "#dbeafe" }}>West Europe: {promoted ? "promoted to primary" : "readable secondary"}</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
