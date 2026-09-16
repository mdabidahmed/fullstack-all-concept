import type { QuizQuestion } from "../../types/quiz";

export const awsFundamentalsQuestions: QuizQuestion[] = [
  {
    id: "aws-fundamentals-1",
    question: "What is the core pricing model that distinguishes cloud computing from buying traditional on-premises hardware?",
    type: "single",
    options: [
      "A single large upfront purchase that covers several years of use",
      "Pay-as-you-go: billed for what you actually use, with no large upfront hardware cost",
      "A fixed monthly fee regardless of how many resources are running",
      "Cloud resources are always free for the first year, then billed at a flat rate",
    ],
    correctIndexes: [1],
    explanation:
      "Cloud computing's defining shift is pay-as-you-go pricing: you're billed for the compute, storage, and other resources you actually consume, rather than paying a large amount upfront for hardware you must then own and maintain regardless of usage.",
  },
  {
    id: "aws-fundamentals-2",
    question: "What does 'elasticity' mean in the context of AWS?",
    type: "single",
    options: [
      "Resources are physically flexible and can bend without breaking",
      "The ability to scale capacity up or down automatically to match demand, in minutes rather than weeks",
      "AWS guarantees prices will decrease every year",
      "Every AWS service is available in every Region simultaneously",
    ],
    correctIndexes: [1],
    explanation:
      "Elasticity is the ability to scale capacity to match real-time demand — adding resources during a traffic spike and removing them afterward — on a timescale of minutes, something physical, on-premises infrastructure cannot do.",
  },
  {
    id: "aws-fundamentals-3",
    question: "Under the AWS shared responsibility model, which of the following is AWS's responsibility rather than the customer's?",
    type: "single",
    options: [
      "Configuring IAM policies for the customer's users",
      "The security of the customer's application data",
      "Physical security of data centers and the underlying host hardware",
      "Setting correct security group rules for the customer's EC2 instances",
    ],
    correctIndexes: [2],
    explanation:
      "AWS is responsible for security 'of the cloud' — the physical data centers, host hardware, and global network infrastructure. The customer is responsible for security 'in the cloud': their data, IAM configuration, and how they configure the services they use.",
  },
  {
    id: "aws-fundamentals-4",
    question: "What is an AWS Region?",
    type: "single",
    options: [
      "A single physical data center",
      "A geographic area containing multiple, isolated Availability Zones",
      "A billing category used only for invoicing purposes",
      "A synonym for an edge location used by CloudFront",
    ],
    correctIndexes: [1],
    explanation:
      "A Region is a distinct geographic area (e.g. us-east-1) containing multiple Availability Zones. Regions are fully isolated from one another; resources don't automatically replicate across them.",
  },
  {
    id: "aws-fundamentals-5",
    question: "Why does an application typically spread its resources across multiple Availability Zones within a Region?",
    type: "single",
    options: [
      "To reduce the AWS bill, since multi-AZ resources are always cheaper",
      "It's required by AWS and cannot be avoided",
      "Because each AZ has independent power and networking, so a failure in one AZ doesn't take down resources in another",
      "To make the application's public IP address change more frequently",
    ],
    correctIndexes: [2],
    explanation:
      "Availability Zones are physically separate data centers with independent power and networking. Spreading resources across multiple AZs is the standard way to survive a single data-center-level failure.",
  },
  {
    id: "aws-fundamentals-6",
    question: "What is the primary purpose of an edge location, as used by CloudFront?",
    type: "single",
    options: [
      "To run EC2 instances at a discounted rate",
      "To cache and serve static content physically close to end users, reducing latency",
      "To store IAM policies for faster evaluation",
      "To host relational databases exclusively",
    ],
    correctIndexes: [1],
    explanation:
      "Edge locations are far more numerous and geographically distributed than Regions, and exist specifically so CloudFront can cache and serve static content (images, video, JS bundles) close to the end user, independent of where the origin application actually runs.",
  },
  {
    id: "aws-fundamentals-7",
    question: "In IAM, what is the key difference between a user and a role?",
    type: "single",
    options: [
      "A user has long-term credentials; a role is assumed for temporary, short-lived credentials",
      "A role can only be attached to an S3 bucket, never to a person",
      "There is no difference — 'user' and 'role' are interchangeable terms in IAM",
      "A user can only read data, while a role can only write data",
    ],
    correctIndexes: [0],
    explanation:
      "A user represents a person or application with long-term credentials (a password and/or access keys). A role has no long-term credentials of its own — it's assumed by something (a person, an EC2 instance, a Lambda function) to receive temporary, short-lived credentials.",
  },
  {
    id: "aws-fundamentals-8",
    question: "What does the IAM 'principle of least privilege' recommend?",
    type: "single",
    options: [
      "Grant every identity full administrator access to simplify management",
      "Grant only the specific permissions an identity actually needs to do its job, nothing broader",
      "Never grant any IAM policy write permissions under any circumstances",
      "Use only the AWS root user for all day-to-day operations",
    ],
    correctIndexes: [1],
    explanation:
      "Least privilege means scoping a policy down to exactly the actions and resources an identity needs — e.g. s3:GetObject on one specific bucket, rather than s3:* on all resources — to minimize the damage a compromised or misconfigured identity could cause.",
  },
];
