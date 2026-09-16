import type { Topic } from "../../types";

export const awsCloudwatchMonitoringTopic: Topic = {
  id: "aws-cloudwatch-monitoring",
  title: "CloudWatch: Metrics, Logs & Alarms",
  category: "Monitoring & Messaging",
  shortExplanation: `**CloudWatch** is AWS's monitoring and observability service — it collects **metrics**, **logs**, and can trigger **alarms**.

- **Metrics** are numeric data points over time (CPU usage, request count, error rate)
- **Logs** capture text output from your application or AWS services
- **Alarms** watch a metric and take action (like notifying you, or triggering Auto Scaling) when a threshold is crossed`,
  longExplanation: `Running an application without monitoring means the first sign of a problem is often a user complaint. CloudWatch is the service most other AWS services automatically report into, giving you visibility into what's actually happening without instrumenting everything from scratch.

- **Metrics** are time-series numeric data — CPU utilization, network I/O, request latency, error count. Most AWS services (EC2, RDS, Lambda, ALB...) publish metrics to CloudWatch automatically at no extra setup; applications can also publish custom metrics for anything domain-specific (like "orders placed per minute")
- **Logs (CloudWatch Logs)** collect and store text output — an application's stdout, a Lambda function's console output, VPC flow logs. Logs are organized into **log groups** (typically one per application or function) and **log streams** (one per instance or invocation source) within a group
- **Alarms** watch a single metric against a threshold over an evaluation period (e.g. "average CPU > 80% for 3 consecutive 5-minute periods") and, when triggered, can perform an action: publish to an SNS topic (to notify a person), trigger an Auto Scaling policy, or invoke a Lambda function
- **Dashboards** let you assemble multiple metrics and their visualizations into a single view — a real-time picture of an application's health without querying each metric individually
- **Logs Insights** provides a query language for searching and aggregating across log data — e.g. finding every request that returned a 500 status in the last hour, without manually grepping through raw log files
- **CloudWatch Events / EventBridge** can react to operational events (an EC2 instance changing state, a scheduled time arriving) and route them to a target like a Lambda function — this is also what powers Lambda's "run on a schedule" trigger mentioned in the Lambda topic
- **Retention** — log data can be kept indefinitely or expired automatically after a configured period, balancing storage cost against how far back you might need to investigate an incident

The pattern that ties it together: an alarm watches a **metric**, and when it fires, the resulting action (often notifying a human, or triggering Auto Scaling) is where monitoring turns into an actual operational response.`,
  examples: [
    {
      id: "metric-over-time",
      title: "A CPU utilization metric, plotted",
      summary: "A simple time-series metric, the kind CloudWatch collects automatically from EC2.",
      code: `function App() {
  const points = [22, 25, 24, 60, 85, 90, 88, 45, 30];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
        {points.map((p, i) => (
          <div key={i} style={{ flex: 1, height: \`\${p}%\`, background: p > 80 ? "#dc2626" : "#ff9900", borderRadius: 2 }} />
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>CPUUtilization over the last 9 data points — red bars would cross an 80% alarm threshold.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alarm-trigger",
      title: "An alarm crossing its threshold",
      summary: "The alarm state changes, and a notification action fires.",
      code: `function App() {
  const [cpu, setCpu] = React.useState(40);
  const threshold = 80;
  const alarming = cpu > threshold;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        CPU: {cpu}%
        <input type="range" min="0" max="100" value={cpu} onChange={(e) => setCpu(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div style={{ padding: 12, borderRadius: 8, background: alarming ? "#fee2e2" : "#dcfce7" }}>
        Alarm state: <strong>{alarming ? "ALARM" : "OK"}</strong>
        {alarming && " — SNS notification published to on-call topic"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "log-group-streams",
      title: "Log groups and log streams",
      summary: "One log group per Lambda function, one stream per invocation batch.",
      code: `function App() {
  const logGroup = "/aws/lambda/process-order";
  const streams = [
    { name: "2024/03/01/[$LATEST]abc123", lines: 12 },
    { name: "2024/03/01/[$LATEST]def456", lines: 8 },
  ];

  return (
    <div>
      <div style={{ padding: 8, background: "#232f3e", color: "white", borderRadius: "6px 6px 0 0", fontSize: 13, fontFamily: "monospace" }}>
        {logGroup}
      </div>
      <div style={{ border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
        {streams.map((s) => (
          <div key={s.name} style={{ padding: 8, fontSize: 12, borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "monospace" }}>{s.name}</span>
            <span style={{ color: "#6b7280" }}>{s.lines} lines</span>
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
