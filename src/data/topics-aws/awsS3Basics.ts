import type { Topic } from "../../types";

export const awsS3BasicsTopic: Topic = {
  id: "aws-s3-basics",
  title: "S3: Object Storage",
  category: "Storage & Databases",
  shortExplanation: `**S3** (Simple Storage Service) stores files ("objects") inside **buckets**, with virtually unlimited capacity.

- Every object has a **key** (its path/name), the file's bytes, and metadata
- Bucket names are **globally unique** across all of AWS, not just your account
- **Storage classes** trade retrieval speed for cost, for data accessed at different frequencies`,
  longExplanation: `S3 is object storage: unlike a hard drive's file system, there's no true folder hierarchy — every object lives in a flat bucket, identified by a **key** that looks like a path (\`images/2024/photo.jpg\`) but is really just a string, with tools displaying the \`/\` characters as a folder structure for convenience.

- **Buckets** are top-level containers for objects. Bucket names must be globally unique across *every* AWS account in the world (not just yours) — you can't create a bucket called \`my-app-data\` if someone, anywhere, already has one
- **Objects** are the files themselves: a key (name/path), the data, a version ID (if versioning is enabled), and metadata like content type. A single object can be up to 5TB
- **Storage classes** let you pay less for data you access less often: **S3 Standard** (frequent access, low latency), **S3 Infrequent Access** (cheaper storage, small retrieval fee, for backups accessed occasionally), and **S3 Glacier** (very cheap, but retrieval can take minutes to hours — built for long-term archives). **Lifecycle rules** can automatically transition objects between classes as they age (e.g. move to Glacier after 90 days)
- **Versioning** keeps every previous version of an object when it's overwritten or deleted, protecting against accidental overwrites or deletions — at the cost of storing every version
- **Access control** — by default, a new bucket and its objects are **private**. Access is granted through IAM policies (for AWS identities) or bucket policies (JSON rules attached directly to the bucket, useful for public read access to something like website assets)
- **Static website hosting** — S3 can serve a bucket's objects directly as a website (HTML, CSS, JS, images), which combined with CloudFront in front of it is a common, cheap way to host a static site with no server at all
- **Durability** — S3 Standard is designed for 99.999999999% ("11 nines") durability, achieved by automatically replicating every object across multiple Availability Zones within a Region

The core mental model: S3 isn't a server you manage — it's storage capacity you write to and read from over an API (or the console), with AWS handling replication, scaling, and durability behind the scenes.`,
  examples: [
    {
      id: "bucket-object-browser",
      title: "A simplified bucket/object browser",
      summary: "Objects rendered as a flat list of keys — the '/' is just a convention, not a real folder.",
      code: `function App() {
  const objects = [
    { key: "images/2024/photo1.jpg", size: "2.1 MB" },
    { key: "images/2024/photo2.jpg", size: "1.8 MB" },
    { key: "docs/invoice-04.pdf", size: "220 KB" },
    { key: "backups/db-snapshot.sql", size: "48 MB" },
  ];

  return (
    <div>
      <div style={{ padding: 8, background: "#232f3e", color: "white", borderRadius: "6px 6px 0 0", fontSize: 13 }}>
        bucket: my-app-bucket-8213
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <tbody>
          {objects.map((o) => (
            <tr key={o.key} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: 8, fontFamily: "monospace" }}>{o.key}</td>
              <td style={{ padding: 8, color: "#6b7280", textAlign: "right" }}>{o.size}</td>
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
      id: "storage-class-comparison",
      title: "Storage classes: cost vs. retrieval speed",
      summary: "The tradeoff behind Standard, Infrequent Access, and Glacier.",
      code: `function App() {
  const classes = [
    { name: "S3 Standard", cost: "$$$", retrieval: "Milliseconds", use: "Frequently accessed data" },
    { name: "S3 Infrequent Access", cost: "$$", retrieval: "Milliseconds (+ fee)", use: "Backups, monthly reports" },
    { name: "S3 Glacier", cost: "$", retrieval: "Minutes to hours", use: "Long-term archives" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {classes.map((c) => (
        <div key={c.name} style={{ display: "flex", justifyContent: "space-between", padding: 10, background: "#f3f4f6", borderRadius: 6 }}>
          <strong>{c.name}</strong>
          <span style={{ color: "#b45309" }}>{c.cost}</span>
          <span style={{ color: "#6b7280", fontSize: 12 }}>{c.retrieval}</span>
          <span style={{ color: "#6b7280", fontSize: 12 }}>{c.use}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "versioning-toggle",
      title: "Versioning: overwrite vs. keep history",
      summary: "With versioning on, an 'overwritten' object's old version is still recoverable.",
      code: `function App() {
  const [versioning, setVersioning] = React.useState(false);
  const [versions, setVersions] = React.useState(["v1: initial upload"]);

  const overwrite = () => {
    const next = \`v\${versions.length + 1}: overwritten\`;
    setVersions((vs) => (versioning ? [...vs, next] : [next]));
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        <input type="checkbox" checked={versioning} onChange={(e) => setVersioning(e.target.checked)} /> Enable versioning
      </label>
      <button onClick={overwrite} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer", width: 140 }}>
        Overwrite object
      </button>
      <ul style={{ fontSize: 13, color: "#374151" }}>
        {versions.map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
