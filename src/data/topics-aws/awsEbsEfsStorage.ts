import type { Topic } from "../../types";

export const awsEbsEfsStorageTopic: Topic = {
  id: "aws-ebs-efs-storage",
  title: "EBS & EFS: Block and File Storage",
  category: "Storage & Databases",
  shortExplanation: `Beyond S3's object storage, AWS offers two other storage types for EC2 workloads:

- **EBS** (Elastic Block Store) — a virtual hard drive attached to exactly one EC2 instance at a time
- **EFS** (Elastic File System) — a shared network file system multiple instances can mount simultaneously
- Choosing between them (and S3) depends on how the data needs to be accessed`,
  longExplanation: `S3's object storage isn't the right fit for everything — an EC2 instance's root operating system volume, or a directory multiple servers need to read and write concurrently, both need a different storage model.

- **EBS (Elastic Block Store)** provides block-level storage — behaving like a raw hard drive that an operating system formats with a file system (ext4, NTFS...). An EBS volume attaches to exactly **one** EC2 instance at a time (with limited exceptions), and persists independently of the instance's lifecycle — you can stop an instance, and its attached EBS volume (and the data on it) remains intact, ready to reattach
- **EBS snapshots** are point-in-time, incremental backups of a volume, stored in S3 behind the scenes. Because they're incremental, only the blocks that changed since the last snapshot are actually stored, keeping subsequent snapshots fast and cheap
- **EBS volume types** trade cost against performance: \`gp3\` (general-purpose SSD, the default for most workloads), \`io2\` (provisioned IOPS, for high-performance databases), and \`st1\`/\`sc1\` (throughput-optimized HDD, for large sequential workloads like log processing)
- **EFS (Elastic File System)** is a managed **NFS** (Network File System) that multiple EC2 instances — even across multiple Availability Zones — can mount and read/write to simultaneously, growing and shrinking automatically as files are added or removed, with no capacity to provision ahead of time
- **When to use which** — EBS for a single instance's primary or high-performance storage (like a database's data files); EFS when multiple instances need a shared, concurrently writable file system (like a fleet of web servers sharing uploaded user content); S3 for object storage accessed over HTTP APIs rather than mounted as a file system, at effectively unlimited scale and the lowest cost per GB
- **Durability and availability** — an EBS volume lives within a single Availability Zone (a snapshot is how you move its data to another AZ or Region); EFS is inherently multi-AZ, since it's designed to be mountable from instances spread across a Region

A useful shorthand: **EBS is a hard drive for one server, EFS is a shared drive for many servers, S3 is an API you upload files to** — the right choice depends entirely on how the data will actually be accessed.`,
  examples: [
    {
      id: "ebs-vs-efs-vs-s3",
      title: "EBS vs. EFS vs. S3 access patterns",
      summary: "One instance, many instances, or an HTTP API — three different storage shapes.",
      code: `function App() {
  const options = [
    { name: "EBS", access: "1 EC2 instance", model: "Block device (like a hard drive)", az: "Single AZ" },
    { name: "EFS", access: "Many EC2 instances", model: "Shared NFS file system", az: "Multi-AZ" },
    { name: "S3", access: "Any client, over HTTP", model: "Object storage (key + bytes)", az: "Regional, multi-AZ" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>Accessed by</th>
          <th style={{ padding: 8, textAlign: "left" }}>Model</th>
          <th style={{ padding: 8, textAlign: "left" }}>Scope</th>
        </tr>
      </thead>
      <tbody>
        {options.map((o) => (
          <tr key={o.name} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 700 }}>{o.name}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{o.access}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{o.model}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{o.az}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "ebs-persists-past-instance",
      title: "An EBS volume outliving its instance",
      summary: "Stopping (not terminating) an instance leaves its attached EBS volume, and data, intact.",
      code: `function App() {
  const [running, setRunning] = React.useState(true);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setRunning((r) => !r)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>
        {running ? "Stop instance" : "Start instance"}
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: running ? "#dcfce7" : "#f3f4f6" }}>
          EC2 instance: {running ? "running" : "stopped"}
        </div>
        <div style={{ flex: 1, padding: 10, borderRadius: 8, background: "#dcfce7" }}>
          EBS volume: attached, data intact
        </div>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>The volume — and everything on it — survives the instance being stopped.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "efs-shared-mount",
      title: "Multiple instances mounting the same EFS file system",
      summary: "A file written by one instance is immediately visible to the others.",
      code: `function App() {
  const [files, setFiles] = React.useState(["welcome.txt"]);

  const writeFrom = (instance) => setFiles((f) => [...f, \`\${instance}-upload-\${f.length}.txt\`]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => writeFrom("web-1")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>web-1: write file</button>
        <button onClick={() => writeFrom("web-2")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>web-2: write file</button>
      </div>
      <div style={{ padding: 10, background: "#111827", color: "#93c5fd", borderRadius: 6, fontSize: 12 }}>
        /mnt/efs/shared/: {files.join(", ")}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Both instances see every file, regardless of which one wrote it.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
