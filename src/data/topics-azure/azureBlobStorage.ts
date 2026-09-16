import type { Topic } from "../../types";

export const azureBlobStorageTopic: Topic = {
  id: "azure-blob-storage",
  title: "Blob Storage: Object Storage",
  category: "Storage & Databases",
  shortExplanation: `**Azure Blob Storage** stores unstructured data ("blobs") inside **containers** — Azure's direct equivalent of S3.

- A **storage account** is the top-level namespace; **containers** inside it hold blobs
- **Access tiers** (Hot, Cool, Archive) trade retrieval speed for storage cost, mirroring S3's storage classes
- **Blob names** work like S3 keys — flat storage displayed as a folder structure by convention`,
  longExplanation: `Blob Storage is Azure's object storage service — built for storing large amounts of unstructured data (images, video, backups, logs) accessed over HTTP, with the same fundamental model as S3.

- **Storage accounts** are the top-level namespace and billing/management boundary — everything (blobs, but also Azure's file shares, queues, and tables) lives inside a storage account, which has a globally unique name forming part of every resource's URL
- **Containers** sit inside a storage account and hold blobs, functioning like an S3 bucket — a container's blobs share access policies, but a container itself has no further nested structure; the same flat-namespace-with-a-path-like-key model S3 uses applies here too
- **Blob types** — **Block blobs** (the default, for most files), **Append blobs** (optimized for append-only writes, like a growing log file), and **Page blobs** (optimized for random read/write access, used as the backing storage for Azure VM disks)
- **Access tiers** trade cost against retrieval speed and cost, mirroring S3's storage classes closely: **Hot** (frequent access, lowest access cost), **Cool** (infrequent access, lower storage cost but a retrieval cost, meant for data kept for at least 30 days), and **Archive** (lowest storage cost, but retrieval can take hours — meant for rarely-touched, long-term data). **Lifecycle management** policies can automatically transition a blob between tiers as it ages
- **Redundancy options** control how many copies of data are kept and where: **LRS** (Locally Redundant Storage, copies within one datacenter), **ZRS** (Zone-Redundant Storage, copies across Availability Zones in one Region), and **GRS** (Geo-Redundant Storage, copies replicated to a paired Region entirely) — a direct analogy to choosing how much durability and geographic spread S3 replication provides
- **Shared Access Signatures (SAS)** grant temporary, scoped access to a container or blob (e.g. "read-only access to this one file for the next hour") without sharing the storage account's master key — the Azure equivalent of a presigned S3 URL
- **Static website hosting** — like S3, a storage account's Blob Storage can serve static website content directly, commonly paired with Azure CDN in front for global caching

The mental shortcut carried over directly from S3: **storage account is the bucket namespace, container is the bucket, blob is the object** — same shape, Azure's own vocabulary layered on top.`,
  examples: [
    {
      id: "container-blob-browser",
      title: "A container's blobs, browsed",
      summary: "Blobs rendered as a flat list of names — the same flat-namespace model S3 uses.",
      code: `function App() {
  const blobs = [
    { name: "images/2024/photo1.jpg", size: "2.1 MB", tier: "Hot" },
    { name: "backups/db-snapshot.bak", size: "48 MB", tier: "Cool" },
    { name: "archive/2019-logs.zip", size: "1.2 GB", tier: "Archive" },
  ];

  return (
    <div>
      <div style={{ padding: 8, background: "#1e293b", color: "white", borderRadius: "6px 6px 0 0", fontSize: 13 }}>
        container: uploads
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <tbody>
          {blobs.map((b) => (
            <tr key={b.name} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: 8, fontFamily: "monospace" }}>{b.name}</td>
              <td style={{ padding: 8, color: "#6b7280" }}>{b.size}</td>
              <td style={{ padding: 8, color: "#0078d4" }}>{b.tier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "access-tier-comparison",
      title: "Access tiers: cost vs. retrieval speed",
      summary: "The same Hot/Cool/Archive tradeoff S3's storage classes make.",
      code: `function App() {
  const tiers = [
    { name: "Hot", cost: "$$$", retrieval: "Immediate", use: "Frequently accessed data" },
    { name: "Cool", cost: "$$", retrieval: "Immediate (+ fee)", use: "Backups, infrequent access" },
    { name: "Archive", cost: "$", retrieval: "Hours", use: "Long-term archives" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {tiers.map((t) => (
        <div key={t.name} style={{ display: "flex", justifyContent: "space-between", padding: 10, background: "#1e293b", color: "white", borderRadius: 6 }}>
          <strong>{t.name}</strong>
          <span style={{ color: "#fbbf24" }}>{t.cost}</span>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>{t.retrieval}</span>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>{t.use}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sas-token-scope",
      title: "A Shared Access Signature's scoped, temporary access",
      summary: "Time-limited, read-only access to one blob, without sharing the account key.",
      code: `function App() {
  const [expired, setExpired] = React.useState(false);
  const sas = { resource: "invoices/march.pdf", permission: "Read only", expiresIn: expired ? "Expired" : "58 minutes" };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setExpired(true)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>
        Simulate time passing
      </button>
      <pre style={{ background: "#111827", color: expired ? "#fca5a5" : "#86efac", padding: 12, borderRadius: 6, fontSize: 12 }}>
{\`Resource: \${sas.resource}
Permission: \${sas.permission}
Expires in: \${sas.expiresIn}\`}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
