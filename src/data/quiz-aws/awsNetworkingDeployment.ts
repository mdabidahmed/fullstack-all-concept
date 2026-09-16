import type { QuizQuestion } from "../../types/quiz";

export const awsNetworkingDeploymentQuestions: QuizQuestion[] = [
  {
    id: "aws-networking-deployment-1",
    question: "What is a VPC?",
    type: "single",
    options: [
      "A managed relational database service",
      "An isolated, private network you define within AWS, with its own IP address range",
      "A billing dashboard for tracking monthly spend",
      "A type of EC2 instance optimized for networking workloads",
    ],
    correctIndexes: [1],
    explanation:
      "A VPC (Virtual Private Cloud) is a logically isolated, software-defined network within AWS that you control the IP address range, subnets, and routing for — the network every EC2 instance and VPC-connected resource lives inside.",
  },
  {
    id: "aws-networking-deployment-2",
    question: "What makes a subnet 'public' rather than 'private'?",
    type: "single",
    options: [
      "Public subnets cost more than private subnets",
      "Its route table sends internet-bound traffic to an Internet Gateway attached to the VPC",
      "It can only contain EC2 instances, never a database",
      "It is automatically replicated across every Region",
    ],
    correctIndexes: [1],
    explanation:
      "A subnet is 'public' specifically because its route table routes internet-bound traffic (0.0.0.0/0) to an Internet Gateway. Without that route, a subnet is 'private' — nothing in it is directly reachable from, or can directly reach, the internet.",
  },
  {
    id: "aws-networking-deployment-3",
    question: "What does a NAT Gateway allow a private-subnet resource to do?",
    type: "single",
    options: [
      "Be directly reachable from the public internet",
      "Initiate outbound connections to the internet without being reachable from it",
      "Bypass IAM permission checks",
      "Automatically replicate its data to another Region",
    ],
    correctIndexes: [1],
    explanation:
      "A NAT Gateway, placed in a public subnet, lets resources in a private subnet make outbound connections (like downloading an update) while remaining unreachable from inbound internet traffic.",
  },
  {
    id: "aws-networking-deployment-4",
    question: "How does a network ACL differ from a security group?",
    type: "single",
    options: [
      "A network ACL is stateful and instance-level; a security group is stateless and subnet-level",
      "A network ACL is stateless and subnet-level, evaluates rules in order, and supports explicit deny rules; a security group is stateful and instance-level",
      "They are functionally identical with no differences",
      "Security groups can only be used with RDS, never with EC2",
    ],
    correctIndexes: [1],
    explanation:
      "Network ACLs are stateless (both directions of traffic need explicit rules), operate at the subnet level, evaluate numbered rules in order, and support both allow and deny. Security groups are stateful, instance-level, and allow-only.",
  },
  {
    id: "aws-networking-deployment-5",
    question: "What does a CloudFormation template describe?",
    type: "single",
    options: [
      "A step-by-step script of console clicks to perform",
      "The desired end state of a set of AWS resources, in JSON or YAML",
      "A list of IAM users and their passwords",
      "The billing history for an AWS account",
    ],
    correctIndexes: [1],
    explanation:
      "A CloudFormation template is a declarative description of desired resources and their properties — not a sequence of steps. CloudFormation determines the correct order to create, update, or delete resources based on their dependencies.",
  },
  {
    id: "aws-networking-deployment-6",
    question: "What happens when a CloudFormation stack is deleted?",
    type: "single",
    options: [
      "Only the stack's metadata is removed; the underlying resources keep running",
      "Every resource that stack created is deleted as a single unit",
      "The template file is deleted, but resources are untouched",
      "Deletion is not possible once a stack has been created",
    ],
    correctIndexes: [1],
    explanation:
      "A stack represents every resource created from a template as one unit — deleting the stack deletes every one of those resources together, which is why CloudFormation makes tearing down a whole environment a single action.",
  },
  {
    id: "aws-networking-deployment-7",
    question: "What does AWS Elastic Beanstalk manage on your behalf?",
    type: "single",
    options: [
      "Nothing — you must still manually configure EC2, load balancers, and Auto Scaling yourself",
      "The underlying EC2 instances, load balancer, and scaling, after you upload your application code",
      "Only DNS records for your domain",
      "IAM user passwords",
    ],
    correctIndexes: [1],
    explanation:
      "Elastic Beanstalk is a Platform-as-a-Service layer: you upload application code, and it provisions and wires up the underlying EC2 instances, security groups, load balancer, and Auto Scaling, while still exposing those resources if customization is needed.",
  },
  {
    id: "aws-networking-deployment-8",
    question: "What is the key advantage of a blue/green deployment over updating instances in place?",
    type: "single",
    options: [
      "It's always cheaper than any other deployment strategy",
      "A separate, new environment is verified healthy before traffic switches over, making rollback as simple as switching traffic back",
      "It eliminates the need for any testing before deployment",
      "It only works with Lambda functions, not EC2 or containers",
    ],
    correctIndexes: [1],
    explanation:
      "Blue/green deployment stands up a full second environment (green) alongside the current one (blue) and only switches traffic once the new version is verified healthy — if a problem appears, rolling back means switching traffic back to blue, rather than re-deploying.",
  },
];
