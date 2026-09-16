import type { Topic } from "../../types";

export const awsDeploymentOverviewTopic: Topic = {
  id: "aws-deployment-overview",
  title: "Deploying Applications on AWS",
  category: "Networking & Deployment",
  shortExplanation: `AWS offers several ways to deploy an application, trading control for convenience:

- **Elastic Beanstalk** — upload your code; AWS provisions and manages the EC2 instances, load balancer, and scaling for you
- **Containers (ECS/EKS)** — package your app as a container and let AWS schedule it across a cluster
- **CI/CD pipelines** (CodePipeline, or GitHub Actions) automate testing and deployment on every code push`,
  longExplanation: `Once your application is written, "deployment" is the process of getting it running reliably in AWS, ideally in a way that's repeatable and doesn't require someone to manually SSH into a server every time code changes. AWS offers options across a spectrum from "fully managed, less control" to "full control, more setup."

- **Elastic Beanstalk** is a Platform-as-a-Service layer on top of EC2, load balancers, and Auto Scaling: you upload your application code (or point it at a git repo), and Beanstalk provisions and wires up the underlying EC2 instances, security groups, and a load balancer, while still giving you access to those resources if you need to customize them. It's a good middle ground for teams that want to deploy quickly without hand-configuring every piece of infrastructure
- **Containers via ECS or EKS** — packaging an application as a Docker container makes "it works on my machine" largely moot, since the container includes its own runtime and dependencies. **ECS** (Elastic Container Service) is AWS's own container orchestrator; **EKS** (Elastic Kubernetes Service) is managed Kubernetes, for teams standardizing on that ecosystem. Both schedule containers across a cluster of compute (EC2 instances, or **Fargate**, which removes even the underlying servers from the equation)
- **AWS Fargate** runs containers without you provisioning or managing any EC2 instances at all — you specify CPU/memory per container and AWS handles the rest, similar in spirit to how Lambda removes servers from the compute equation
- **CI/CD (Continuous Integration / Continuous Deployment)** — rather than manually deploying, a pipeline automatically runs tests and deploys a new version whenever code is pushed (often after merging to a specific branch). **CodePipeline** and **CodeBuild** are AWS-native CI/CD services, but many teams instead use GitHub Actions or another CI tool that deploys *to* AWS via the CLI or an IaC tool like CloudFormation/Terraform
- **Blue/Green and rolling deployments** — rather than replacing every running instance with a new version simultaneously (risking downtime if the new version has a bug), a **rolling deployment** updates instances gradually, and a **blue/green deployment** stands up an entirely separate, new environment and switches traffic over only once it's verified healthy — making rollback as simple as switching traffic back
- **Choosing a path** — a small app might reach for Elastic Beanstalk or a single Fargate service; a large, multi-team organization might invest in a full ECS/EKS setup with a custom CI/CD pipeline. The tradeoff at every level is the same one that runs through all of AWS: more managed convenience, in exchange for less low-level control.`,
  examples: [
    {
      id: "deployment-options-spectrum",
      title: "The deployment control-vs-convenience spectrum",
      summary: "From raw EC2 to Lambda: less to manage as you move right, less control as a tradeoff.",
      code: `function App() {
  const options = [
    { name: "Raw EC2", manage: "OS, scaling, LB — everything", color: "#374151" },
    { name: "Elastic Beanstalk", manage: "Just your app code", color: "#6b7280" },
    { name: "ECS on Fargate", manage: "Container image only", color: "#b45309" },
    { name: "Lambda", manage: "Just a function", color: "#ff9900" },
  ];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((o) => (
        <div key={o.name} style={{ flex: 1, padding: 10, background: o.color, color: "white", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{o.name}</div>
          <div style={{ fontSize: 11, marginTop: 4 }}>You manage: {o.manage}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cicd-pipeline-stages",
      title: "A CI/CD pipeline triggered by a git push",
      summary: "Push to main, and the pipeline runs tests, builds, and deploys automatically.",
      code: `function App() {
  const [stage, setStage] = React.useState(0);
  const stages = ["Push to main", "Run tests", "Build artifact", "Deploy"];

  React.useEffect(() => {
    if (stage === 0 || stage >= stages.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), 500);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setStage(1)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#232f3e", color: "white", cursor: "pointer" }}>
        git push origin main
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        {stages.map((s, i) => (
          <div key={s} style={{ flex: 1, padding: 8, borderRadius: 6, background: i < stage ? "#dcfce7" : "#f3f4f6", fontSize: 12, textAlign: "center" }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "blue-green-switch",
      title: "Blue/green deployment traffic switch",
      summary: "A new environment is verified healthy before traffic switches over — instant rollback if not.",
      code: `function App() {
  const [active, setActive] = React.useState("blue");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 12, borderRadius: 8, background: active === "blue" ? "#3b82f6" : "#dbeafe", color: active === "blue" ? "white" : "#1e3a8a" }}>
          Blue (v1.2) {active === "blue" && "— receiving traffic"}
        </div>
        <div style={{ flex: 1, padding: 12, borderRadius: 8, background: active === "green" ? "#16a34a" : "#dcfce7", color: active === "green" ? "white" : "#14532d" }}>
          Green (v1.3) {active === "green" && "— receiving traffic"}
        </div>
      </div>
      <button
        onClick={() => setActive((a) => (a === "blue" ? "green" : "blue"))}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}
      >
        Switch traffic to {active === "blue" ? "green" : "blue"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
