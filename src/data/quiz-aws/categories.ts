import type { QuizCategoryMeta } from "../../types/quiz";

export const awsQuizCategoryMeta: QuizCategoryMeta[] = [
  {
    id: "aws-fundamentals",
    title: "AWS Fundamentals",
    description: "Cloud computing basics, Regions & Availability Zones, and IAM.",
  },
  {
    id: "aws-compute",
    title: "Compute",
    description: "EC2 instances, Auto Scaling, and serverless Lambda functions.",
  },
  {
    id: "aws-storage-databases",
    title: "Storage & Databases",
    description: "S3 object storage, managed RDS, and DynamoDB.",
  },
  {
    id: "aws-networking-deployment",
    title: "Networking & Deployment",
    description: "VPCs, Route 53, CloudFront, CloudFormation, and application deployment options.",
  },
  {
    id: "aws-monitoring-messaging",
    title: "Monitoring & Messaging",
    description: "CloudWatch metrics, logs, and alarms, plus decoupling with SNS and SQS.",
  },
];
