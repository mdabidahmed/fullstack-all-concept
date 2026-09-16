import type { Topic } from "../../types";

export const awsIntroductionTopic: Topic = {
  id: "aws-introduction",
  title: "AWS Introduction",
  category: "AWS Fundamentals",
  shortExplanation: `**AWS** (Amazon Web Services) is a **cloud computing platform** — instead of buying and racking your own servers, you rent compute, storage, networking, and databases on demand from Amazon's data centers.

- You pay **only for what you use** (pay-as-you-go), instead of a large upfront hardware cost
- Capacity scales **up or down in minutes**, not the weeks a physical server order would take
- AWS offers 200+ services, but a small core (compute, storage, databases, networking) covers most applications`,
  longExplanation: `Before cloud computing, running an application meant buying physical servers, racking them in a data center you owned or leased, and provisioning far more capacity than you usually needed just to survive a traffic spike. **Cloud computing** flips that model: a provider like AWS owns and operates the physical hardware in massive data centers, and you rent exactly the capacity you need, for exactly as long as you need it, over the internet.

- **On-demand, pay-as-you-go pricing** — an EC2 server you run for 3 hours costs roughly 3 hours of usage, not a multi-year hardware investment. Turn it off and billing stops
- **Elasticity** — capacity can scale out to handle a traffic spike (like a product launch) and scale back in afterward, something a physical server room can't do on a timescale of minutes
- **Global infrastructure** — AWS operates in dozens of geographic **Regions** worldwide (covered in depth in the next topic), so you can run your application physically close to your users
- **Managed services** — instead of installing and patching a database server yourself, a service like RDS handles the operating system, patching, and backups for you, so your team focuses on the application rather than server maintenance
- **Shared responsibility model** — AWS secures "the cloud" (physical data centers, host hardware, networking), while you're responsible for "security *in* the cloud" (your data, IAM permissions, and how you configure the services you use)

AWS is the largest of several major cloud providers (alongside Microsoft Azure and Google Cloud), and while services differ in name across providers, the underlying concepts — compute, object storage, managed databases, identity and access management — transfer directly between them. This subject uses simplified, visual simulations of AWS's console and core services to teach those concepts without needing a real (and billable) AWS account.`,
  examples: [
    {
      id: "on-demand-vs-traditional",
      title: "On-demand cloud vs. traditional hardware",
      summary: "A side-by-side comparison of buying servers versus renting cloud capacity.",
      code: `function App() {
  const rows = [
    { label: "Upfront cost", traditional: "Large (buy hardware)", cloud: "None (pay as you go)" },
    { label: "Time to add capacity", traditional: "Weeks (order + rack)", cloud: "Minutes" },
    { label: "Idle capacity waste", traditional: "High (must over-provision)", cloud: "Low (scale to demand)" },
    { label: "Maintenance", traditional: "Your team", cloud: "Provider handles hardware" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}></th>
          <th style={{ padding: 8, textAlign: "left" }}>Traditional</th>
          <th style={{ padding: 8, textAlign: "left" }}>Cloud (AWS)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8, fontWeight: 600 }}>{r.label}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{r.traditional}</td>
            <td style={{ padding: 8, color: "#b45309" }}>{r.cloud}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "pay-as-you-go-meter",
      title: "A pay-as-you-go usage meter",
      summary: "Simulates how an EC2-style bill accrues only while a resource is running.",
      code: `function App() {
  const [running, setRunning] = React.useState(false);
  const [hours, setHours] = React.useState(0);
  const ratePerHour = 0.05;

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setHours((h) => h + 0.1), 200);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setRunning((r) => !r)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: running ? "#dc2626" : "#ff9900", color: "white", fontWeight: 600, cursor: "pointer" }}
      >
        {running ? "Stop instance" : "Start instance"}
      </button>
      <div style={{ padding: 12, background: "#232f3e", color: "white", borderRadius: 6 }}>
        <div>Status: {running ? "running" : "stopped"}</div>
        <div>Hours billed: {hours.toFixed(1)}</div>
        <div>Estimated cost: \${(hours * ratePerHour).toFixed(3)}</div>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Stop the instance and the meter — and the bill — stop with it.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shared-responsibility",
      title: "The shared responsibility model",
      summary: "What AWS secures versus what you're responsible for securing.",
      code: `function App() {
  const aws = ["Physical data centers", "Host hardware", "Global network infrastructure", "Managed service patching"];
  const you = ["Your data", "IAM users, roles & policies", "Security group / firewall rules", "How you configure each service"];

  const Column = ({ title, items, color }) => (
    <div style={{ flex: 1, padding: 12, background: "#f3f4f6", borderRadius: 8, borderTop: \`3px solid \${color}\` }}>
      <strong>{title}</strong>
      <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13, color: "#374151" }}>
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Column title="AWS secures 'the cloud'" items={aws} color="#ff9900" />
      <Column title="You secure 'in the cloud'" items={you} color="#232f3e" />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
