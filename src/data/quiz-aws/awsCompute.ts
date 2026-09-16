import type { QuizQuestion } from "../../types/quiz";

export const awsComputeQuestions: QuizQuestion[] = [
  {
    id: "aws-compute-1",
    question: "What does an EC2 instance boot from?",
    type: "single",
    options: [
      "An AMI (Amazon Machine Image), a template containing an OS and optionally pre-installed software",
      "A DynamoDB table containing the instance's file system",
      "A CloudFormation stack, which is required before any instance can launch",
      "An IAM policy document",
    ],
    correctIndexes: [0],
    explanation:
      "Every EC2 instance launches from an AMI: a template bundling an operating system and optionally pre-installed software. AWS provides official AMIs, and you can create custom ones from a configured instance.",
  },
  {
    id: "aws-compute-2",
    question: "What determines the CPU, memory, and network capacity an EC2 instance gets?",
    type: "single",
    options: [
      "The Availability Zone it's launched in",
      "The instance type (e.g. t3.micro, m5.large)",
      "The AMI it boots from",
      "The number of security groups attached to it",
    ],
    correctIndexes: [1],
    explanation:
      "The instance type — a named family like t3 (burstable, general purpose), m5 (balanced), c5 (compute-optimized), or r5 (memory-optimized) — determines the CPU, memory, storage, and network performance an instance receives.",
  },
  {
    id: "aws-compute-3",
    question: "What is the role of a security group?",
    type: "single",
    options: [
      "It groups multiple IAM users together for easier permission management",
      "It acts as a virtual firewall controlling inbound and outbound traffic to an instance",
      "It stores the instance's application logs",
      "It determines which Region an instance launches in",
    ],
    correctIndexes: [1],
    explanation:
      "A security group is a virtual, instance-level firewall: it defines which inbound and outbound traffic (by port, protocol, and source/destination) is allowed to and from an instance.",
  },
  {
    id: "aws-compute-4",
    question: "What does an Auto Scaling group's minimum, maximum, and desired capacity settings control?",
    type: "single",
    options: [
      "The IAM permissions granted to each instance",
      "The bounds within which the number of running instances automatically adjusts to match demand",
      "The maximum size, in GB, of each instance's attached storage",
      "The number of Availability Zones available in a Region",
    ],
    correctIndexes: [1],
    explanation:
      "An Auto Scaling group's min/max/desired settings bound how many instances can run at once — it automatically launches new instances as demand rises (up to the max) and terminates them as demand falls (down to the min), without manual intervention.",
  },
  {
    id: "aws-compute-5",
    question: "What triggers a Lambda function to run?",
    type: "multi",
    options: [
      "An HTTP request arriving via API Gateway",
      "A new object being uploaded to an S3 bucket",
      "A scheduled CloudWatch Events rule",
      "The function must be triggered manually from the console every time — no automatic triggers exist",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Lambda is event-driven: it can be triggered by an HTTP request through API Gateway, an S3 object upload, a DynamoDB stream change, a scheduled rule, an SQS message, and other event sources — never solely by manual invocation.",
  },
  {
    id: "aws-compute-6",
    question: "How is Lambda typically billed?",
    type: "single",
    options: [
      "A fixed monthly fee regardless of usage",
      "Per invocation and per unit of memory × execution duration (GB-seconds), with no charge while idle",
      "Per hour, exactly like an EC2 instance, whether or not the function is invoked",
      "A one-time fee when the function is first deployed",
    ],
    correctIndexes: [1],
    explanation:
      "Lambda bills based on the number of invocations plus GB-seconds (memory allocated multiplied by execution duration, rounded to the millisecond). There is no charge for time spent idle between invocations.",
  },
  {
    id: "aws-compute-7",
    question: "What is a 'cold start' in the context of Lambda?",
    type: "single",
    options: [
      "A permanent failure state a function enters after too many errors",
      "The extra latency on the first invocation after a period of inactivity, while AWS initializes a fresh execution environment",
      "The process of manually restarting a Lambda function from the console",
      "A billing discount applied to functions that haven't run recently",
    ],
    correctIndexes: [1],
    explanation:
      "A cold start is the added latency when Lambda has to initialize a new execution environment before running your code, typically after the function hasn't been invoked recently. Subsequent invocations reuse the 'warm' environment and run faster.",
  },
  {
    id: "aws-compute-8",
    question: "What is the maximum execution time for a single Lambda invocation?",
    type: "single",
    options: [
      "60 seconds",
      "15 minutes",
      "24 hours",
      "There is no maximum — a function can run indefinitely",
    ],
    correctIndexes: [1],
    explanation:
      "A single Lambda invocation can run for a maximum of 15 minutes, which is why Lambda is best suited to short, discrete tasks rather than long-running background processes.",
  },
];
