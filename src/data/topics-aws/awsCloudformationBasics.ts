import type { Topic } from "../../types";

export const awsCloudformationBasicsTopic: Topic = {
  id: "aws-cloudformation-basics",
  title: "CloudFormation: Infrastructure as Code",
  category: "Networking & Deployment",
  shortExplanation: `**CloudFormation** provisions AWS resources from a **template** (JSON or YAML), instead of clicking through the console by hand.

- A template describes the desired resources; CloudFormation figures out how to create them, in the right order
- A running set of resources created from a template is called a **stack**
- Updating the template and re-deploying updates the stack to match — this is **Infrastructure as Code**`,
  longExplanation: `Manually clicking through the AWS console to create an S3 bucket, an IAM role, and a Lambda function works fine once — but it's slow, error-prone to repeat, and leaves no record of exactly what was created or why. **Infrastructure as Code (IaC)** solves this by describing infrastructure in a text file that can be reviewed, versioned in git, and re-applied reliably.

- **Templates** are JSON or YAML files describing the resources you want (an S3 bucket, an EC2 instance, an IAM role...), their properties, and how they relate to each other. A template is a *declaration* of the desired end state, not a step-by-step script
- **Stacks** — when you deploy a template, CloudFormation creates a **stack**: a single unit representing every resource that template describes. Deleting the stack deletes every resource it created, which makes tearing down a whole environment (like a temporary test environment) a single action instead of manually hunting down each piece
- **Dependency resolution** — CloudFormation reads the relationships between resources in your template (e.g. "this EC2 instance uses this security group") and creates them in the correct order automatically, rather than requiring you to sequence it yourself
- **Change sets** — before actually applying an update, CloudFormation can generate a **change set**: a preview of exactly what would be added, modified, or deleted. This catches surprises (like an update that would *replace*, not just modify, a resource — potentially destroying data) before they happen
- **Drift detection** — if someone manually changes a stack's resource in the console (bypassing CloudFormation), drift detection flags that the live resource no longer matches what the template describes
- **Idempotency** — re-deploying the same, unchanged template does nothing (there's no drift to reconcile), which makes it safe to re-run deployments as part of an automated pipeline
- **Alternatives** — Terraform (from HashiCorp) is a popular multi-cloud IaC tool that works similarly but isn't AWS-specific; the AWS CDK lets you define the same kind of infrastructure using a real programming language (TypeScript, Python...) that compiles down to a CloudFormation template

The underlying value: infrastructure defined this way is reviewable in a pull request, reproducible in a new AWS account or Region, and self-documenting — the template *is* the documentation of what exists and why.`,
  examples: [
    {
      id: "template-rendered",
      title: "A minimal CloudFormation template",
      summary: "Declaring an S3 bucket as YAML-shaped JSON — the desired end state, not a script.",
      code: `function App() {
  const template = {
    Resources: {
      AppBucket: {
        Type: "AWS::S3::Bucket",
        Properties: { BucketName: "my-app-uploads-8213" },
      },
      AppRole: {
        Type: "AWS::IAM::Role",
        Properties: { AssumeRolePolicyDocument: "{ ... }" },
      },
    },
  };

  return (
    <pre style={{ background: "#111827", color: "#fde68a", padding: 14, borderRadius: 6, overflow: "auto", fontSize: 12 }}>
      {JSON.stringify(template, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "stack-lifecycle",
      title: "A stack's lifecycle: create, update, delete",
      summary: "One stack, one unit — deleting it tears down everything it created.",
      code: `function App() {
  const [status, setStatus] = React.useState("CREATE_COMPLETE");
  const resources = ["AppBucket (S3)", "AppRole (IAM)", "AppFunction (Lambda)"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStatus("UPDATE_COMPLETE")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#ff9900", cursor: "pointer" }}>Update stack</button>
        <button onClick={() => setStatus("DELETE_COMPLETE")} style={{ padding: "6px 10px", borderRadius: 6, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}>Delete stack</button>
      </div>
      <div style={{ padding: 10, background: "#232f3e", color: "white", borderRadius: 6 }}>Stack status: {status}</div>
      {status !== "DELETE_COMPLETE" ? (
        <ul style={{ fontSize: 13 }}>{resources.map((r) => <li key={r}>{r}</li>)}</ul>
      ) : (
        <p style={{ color: "#6b7280", fontSize: 13 }}>All resources the stack created have been removed.</p>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "change-set-preview",
      title: "Previewing a change set before applying it",
      summary: "See what would happen — including a risky 'replacement' — before committing.",
      code: `function App() {
  const changes = [
    { resource: "AppBucket", action: "Modify", detail: "Add versioning" },
    { resource: "AppFunction", action: "Modify", detail: "Update code" },
    { resource: "AppRole", action: "Replace ⚠️", detail: "Changing AssumeRolePolicy requires replacement" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#232f3e", color: "white" }}>
          <th style={{ padding: 8, textAlign: "left" }}>Resource</th>
          <th style={{ padding: 8, textAlign: "left" }}>Action</th>
          <th style={{ padding: 8, textAlign: "left" }}>Detail</th>
        </tr>
      </thead>
      <tbody>
        {changes.map((c) => (
          <tr key={c.resource} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={{ padding: 8 }}>{c.resource}</td>
            <td style={{ padding: 8, color: c.action.includes("Replace") ? "#dc2626" : "#374151" }}>{c.action}</td>
            <td style={{ padding: 8, color: "#6b7280" }}>{c.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
