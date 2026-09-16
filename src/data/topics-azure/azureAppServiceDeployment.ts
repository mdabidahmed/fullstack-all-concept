import type { Topic } from "../../types";

export const azureAppServiceDeploymentTopic: Topic = {
  id: "azure-app-service-deployment",
  title: "App Service & Deployment Slots",
  category: "Networking & Deployment",
  shortExplanation: `**Azure App Service** is a fully managed platform for hosting web apps and APIs — Azure's equivalent of Elastic Beanstalk, minus the underlying VM management entirely.

- You deploy code (or a container); App Service handles the OS, runtime, and scaling
- **Deployment slots** let a new version run live at a separate URL before it takes production traffic
- **Slot swapping** promotes a slot to production with effectively zero downtime`,
  longExplanation: `App Service is a Platform-as-a-Service (PaaS) offering: you deploy application code or a container image, and Azure handles the underlying VM, OS patching, and load balancing — a step further removed from infrastructure than Elastic Beanstalk, which still exposes the EC2 instances underneath.

- **App Service Plans** define the underlying compute (VM size and OS) an app runs on, and its pricing tier — a Free/Shared tier for small or dev workloads, up to Premium and Isolated tiers with dedicated capacity and network isolation. Multiple apps can share one App Service Plan's capacity
- **Deployment slots** are a distinct App Service feature: a slot is a fully separate, live instance of the app, each with its own hostname (e.g. \`myapp-staging.azurewebsites.net\`), running side by side with production. A team can deploy a new version to a \`staging\` slot, test it against real production-like infrastructure, and only then promote it
- **Slot swapping** promotes a slot to production by swapping the two apps' routing at the network level — the slot that was "staging" becomes "production" and vice versa, with the app's warm-up already having happened in the (former) staging slot, resulting in effectively zero downtime and instant rollback (swap again to revert)
- **Deployment methods** — code can be deployed via a git push, a CI/CD pipeline (Azure Pipelines, GitHub Actions), a ZIP deploy, or a container registry pull, covering both traditional code deployment and the container-first workflow
- **Auto-scaling** — an App Service Plan can scale out (add more instances) based on metrics like CPU or request queue length, or on a schedule, similar to a VM Scale Set but managed entirely within the App Service abstraction, with no VM-level configuration exposed
- **Custom domains and TLS** — App Service handles binding a custom domain and provisioning/renewing a free managed TLS certificate, removing another piece of infrastructure a team would otherwise manage themselves
- **Containers on App Service** — beyond directly deployed code, App Service can run a single container or a small multi-container app (via Docker Compose), giving a path from "just deploy my code" to "deploy my container" without moving to a full orchestrator like AKS

The single most distinctive capability to remember: **deployment slots plus slot swapping** give App Service a built-in blue/green deployment story, achievable elsewhere only by explicitly wiring up separate environments and a traffic switch yourself.`,
  examples: [
    {
      id: "slot-swap-flow",
      title: "Deploying to staging, then swapping to production",
      summary: "The new version runs live in staging before it ever serves production traffic.",
      code: `function App() {
  const [staging, setStaging] = React.useState("v1.2");
  const [production, setProduction] = React.useState("v1.1");

  const deploy = () => setStaging("v1.3");
  const swap = () => { setProduction(staging); setStaging(production); };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={deploy} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#0078d4", color: "white", cursor: "pointer" }}>Deploy v1.3 to staging</button>
        <button onClick={swap} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#16a34a", color: "white", cursor: "pointer" }}>Swap slots</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, background: "#1e293b", color: "white", borderRadius: 8 }}>Production: {production}</div>
        <div style={{ flex: 1, padding: 10, background: "#374151", color: "white", borderRadius: 8 }}>Staging: {staging}</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "app-service-plan-sharing",
      title: "Multiple apps sharing one App Service Plan",
      summary: "One plan's compute capacity, hosting several independent apps.",
      code: `function App() {
  const plan = { name: "Plan: P1v3 (2 vCPU, 8GB)", apps: ["marketing-site", "internal-api", "admin-dashboard"] };

  return (
    <div style={{ border: "2px solid #0078d4", borderRadius: 10, padding: 14 }}>
      <strong>{plan.name}</strong>
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {plan.apps.map((a) => (
          <span key={a} style={{ padding: "6px 12px", background: "#1e293b", color: "white", borderRadius: 6, fontSize: 12 }}>{a}</span>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 10 }}>All three apps draw from the same underlying compute capacity.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "autoscale-rule",
      title: "An autoscale rule reacting to CPU",
      summary: "App Service adds instances automatically, without any VM-level configuration.",
      code: `function App() {
  const [cpu, setCpu] = React.useState(40);
  const instances = cpu > 75 ? 4 : cpu > 50 ? 2 : 1;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        CPU: {cpu}%
        <input type="range" min="0" max="100" value={cpu} onChange={(e) => setCpu(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: instances }).map((_, i) => (
          <div key={i} style={{ width: 40, height: 40, borderRadius: 6, background: "#0078d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 700 }}>App</div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Instances scale between 1 and 4 based on the CPU rule — no VM to size or provision manually.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
