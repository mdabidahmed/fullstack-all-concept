import type { Topic } from "../../types";

export const awsIamBasicsTopic: Topic = {
  id: "aws-iam-basics",
  title: "IAM: Users, Groups, Roles & Policies",
  category: "AWS Fundamentals",
  shortExplanation: `**IAM** (Identity and Access Management) controls *who* can do *what* in your AWS account.

- A **user** is a person or application with long-term credentials
- A **group** is a collection of users that share the same permissions
- A **role** is a set of temporary permissions something can *assume* (e.g. an EC2 instance, or another AWS account)
- A **policy** is a JSON document that actually grants or denies specific permissions`,
  longExplanation: `IAM is the service every other AWS service depends on for authorization — it answers the question "is this identity allowed to perform this action on this resource?" for every single API call made in your account, before AWS does anything else.

- **Users** represent a person or an application that needs long-term access — each gets its own credentials (a password for console access, and/or access keys for programmatic API calls). Best practice: never use the account's root user for everyday work; create individual IAM users instead
- **Groups** exist purely to make permission management easier — instead of attaching the same policy to 20 individual users, attach it once to a "Developers" group and add users to that group. A user can belong to multiple groups
- **Policies** are JSON documents describing exactly what's allowed or denied: which **actions** (like \`s3:GetObject\`), on which **resources** (like a specific S3 bucket ARN), under which **conditions**. Policies can attach to users, groups, or roles
- **Roles** are IAM's answer to "how does an EC2 instance, Lambda function, or another AWS account get permissions *without* a permanent username and password?" A role has no long-term credentials — instead, something **assumes** the role and receives short-lived, temporary credentials. This is how a Lambda function is allowed to write to a specific S3 bucket, without an access key hardcoded into its code
- **The principle of least privilege** — the core IAM best practice: grant only the specific permissions a user, group, or role actually needs to do its job, nothing broader. A policy that grants \`s3:*\` on \`*\` ("all S3 actions on all resources") is far riskier than one scoped to \`s3:GetObject\` on a single named bucket
- **Multi-factor authentication (MFA)** adds a second verification step (like a one-time code from a phone app) beyond a password, and is strongly recommended for the root user and any IAM user with elevated permissions

The mental shortcut: **users and groups** are for people who need *standing* access; **roles** are for anything — human or service — that should get *temporary*, scoped-down access instead.`,
  examples: [
    {
      id: "iam-policy-document",
      title: "A minimal IAM policy, rendered",
      summary: "The JSON shape of a policy that allows reading objects from one S3 bucket.",
      code: `function App() {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["s3:GetObject"],
        Resource: "arn:aws:s3:::my-app-bucket/*",
      },
    ],
  };

  return (
    <pre style={{ background: "#111827", color: "#fde68a", padding: 14, borderRadius: 6, overflow: "auto", fontSize: 13 }}>
      {JSON.stringify(policy, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "users-groups-roles",
      title: "Users, groups, and roles at a glance",
      summary: "How permissions flow from a policy through a group to a user, versus through a role.",
      code: `function App() {
  const Card = ({ title, sub, color }) => (
    <div style={{ padding: 10, borderRadius: 8, background: color, color: "white", minWidth: 120, textAlign: "center" }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12, opacity: 0.85 }}>{sub}</div>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Card title="Policy" sub="grants S3 read" color="#ff9900" />
        <span>→</span>
        <Card title="Group: Developers" sub="3 users" color="#232f3e" />
        <span>→</span>
        <Card title="User: ada" sub="standing access" color="#374151" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Card title="Policy" sub="grants S3 write" color="#ff9900" />
        <span>→</span>
        <Card title="Role: lambda-writer" sub="assumed, temporary" color="#065f46" />
        <span>→</span>
        <Card title="Lambda function" sub="no hardcoded keys" color="#374151" />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "least-privilege-toggle",
      title: "Least privilege vs. an over-broad policy",
      summary: "Compares a scoped policy against one that grants far more than needed.",
      code: `function App() {
  const [broad, setBroad] = React.useState(false);
  const action = broad ? "s3:*" : "s3:GetObject";
  const resource = broad ? "*" : "arn:aws:s3:::invoices-bucket/*";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        onClick={() => setBroad((b) => !b)}
        style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#ff9900", color: "#232f3e", fontWeight: 600, cursor: "pointer" }}
      >
        Toggle policy scope
      </button>
      <pre style={{ background: "#111827", color: broad ? "#fca5a5" : "#86efac", padding: 12, borderRadius: 6, fontSize: 13 }}>
{\`"Action": "\${action}",
"Resource": "\${resource}"\`}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {broad
          ? "Every S3 action, on every bucket in the account — far more than an invoices reader needs."
          : "Least privilege: exactly the one action this identity actually needs, on exactly one bucket."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
