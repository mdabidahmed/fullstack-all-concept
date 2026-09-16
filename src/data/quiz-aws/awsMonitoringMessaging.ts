import type { QuizQuestion } from "../../types/quiz";

export const awsMonitoringMessagingQuestions: QuizQuestion[] = [
  {
    id: "aws-monitoring-messaging-1",
    question: "What is a CloudWatch metric?",
    type: "single",
    options: [
      "A block of text output from an application",
      "A numeric data point tracked over time, like CPU utilization or request count",
      "A rule that automatically deletes old EC2 instances",
      "A type of IAM policy",
    ],
    correctIndexes: [1],
    explanation:
      "A metric is time-series numeric data — CPU usage, latency, error count, and similar measurements. Most AWS services publish metrics automatically, and applications can publish custom metrics too.",
  },
  {
    id: "aws-monitoring-messaging-2",
    question: "What does a CloudWatch alarm do?",
    type: "single",
    options: [
      "It permanently stops an EC2 instance the moment any metric changes",
      "It watches a metric against a threshold and triggers an action, like an SNS notification, when the threshold is crossed",
      "It stores raw application log files",
      "It is only usable for billing-related metrics",
    ],
    correctIndexes: [1],
    explanation:
      "An alarm evaluates a metric against a threshold over a defined period, and when that threshold is crossed, performs an action — commonly notifying via SNS, but also potentially triggering Auto Scaling or invoking a Lambda function.",
  },
  {
    id: "aws-monitoring-messaging-3",
    question: "In CloudWatch Logs, what is the relationship between a log group and a log stream?",
    type: "single",
    options: [
      "They are the same thing, just different names for the same concept",
      "A log group typically corresponds to one application or function, and contains multiple log streams (e.g. one per instance or invocation source)",
      "A log stream can belong to multiple log groups simultaneously",
      "Log streams store metrics, while log groups store alarms",
    ],
    correctIndexes: [1],
    explanation:
      "A log group is typically scoped to one application or Lambda function, and holds multiple log streams within it — for example, one stream per EC2 instance or per batch of Lambda invocations.",
  },
  {
    id: "aws-monitoring-messaging-4",
    question: "What is the key difference between SNS and SQS?",
    type: "single",
    options: [
      "SNS delivers a published message to every current subscriber (pub/sub); SQS delivers each message to exactly one consumer (a queue)",
      "SNS and SQS are two names for the exact same service",
      "SQS can only be used with EC2, and SNS can only be used with Lambda",
      "SNS stores messages indefinitely, while SQS deletes them immediately after publishing",
    ],
    correctIndexes: [0],
    explanation:
      "SNS is a publish/subscribe service — a published message fans out to every current subscriber. SQS is a queue — each message is retrieved and processed by exactly one consumer, not broadcast to all of them.",
  },
  {
    id: "aws-monitoring-messaging-5",
    question: "What happens to an SQS message during its visibility timeout?",
    type: "single",
    options: [
      "It is permanently deleted from the queue",
      "It becomes temporarily invisible to other consumers while the current consumer processes it, and reappears if not deleted in time",
      "It is broadcast to every subscriber of the queue",
      "It is automatically converted into an SNS notification",
    ],
    correctIndexes: [1],
    explanation:
      "When a consumer retrieves a message, it becomes invisible to other consumers for the visibility timeout period. If the consumer successfully processes and deletes it, it's gone for good; if the consumer fails or times out, it becomes visible again for another consumer to retry.",
  },
  {
    id: "aws-monitoring-messaging-6",
    question: "What is the purpose of a dead-letter queue (DLQ)?",
    type: "single",
    options: [
      "To store messages that have been successfully processed, for archival purposes",
      "To automatically capture messages that have repeatedly failed processing, so they don't loop forever and can be inspected later",
      "To increase the maximum throughput of a standard SQS queue",
      "To replace the need for a visibility timeout",
    ],
    correctIndexes: [1],
    explanation:
      "A dead-letter queue catches messages that exceed a configured retry count without being successfully processed, preventing infinite retry loops and giving you a place to inspect or reprocess the failed messages manually.",
  },
  {
    id: "aws-monitoring-messaging-7",
    question: "What does an 'SNS fan-out to multiple SQS queues' pattern accomplish?",
    type: "single",
    options: [
      "It guarantees a message is processed exactly once across the entire system",
      "It lets a single event trigger several independent, queued workflows, each processed at its own pace without affecting the others",
      "It reduces the number of subscribers a topic can have",
      "It removes the need for IAM permissions on any subscriber",
    ],
    correctIndexes: [1],
    explanation:
      "In the fan-out pattern, one SNS topic publishes to multiple SQS queues, each feeding an independent consumer. A single event (like 'order placed') can trigger several separate workflows, and a failure or slowdown in one doesn't affect the others.",
  },
  {
    id: "aws-monitoring-messaging-8",
    question: "When should an SQS FIFO queue be used instead of a Standard queue?",
    type: "single",
    options: [
      "Whenever the absolute highest possible throughput is the only requirement",
      "When strict message ordering and exactly-once processing genuinely matter, such as for financial transactions",
      "FIFO and Standard queues are identical in behavior and can always be used interchangeably",
      "Only when integrating with SNS, never on their own",
    ],
    correctIndexes: [1],
    explanation:
      "FIFO queues guarantee strict ordering and exactly-once processing, at a lower throughput ceiling than Standard queues (which offer at-least-once delivery and best-effort ordering). FIFO is the right choice when order or duplicate-prevention is a hard requirement.",
  },
];
