import type { QuizQuestion } from "../../types/quiz";

export const azureStorageDatabasesQuestions: QuizQuestion[] = [
  {
    id: "azure-storage-databases-1",
    question: "What is the top-level namespace that Blob Storage containers live inside?",
    type: "single",
    options: [
      "A resource group",
      "A storage account",
      "A virtual network",
      "An availability set",
    ],
    correctIndexes: [1],
    explanation:
      "A storage account is the top-level namespace and billing/management boundary in Azure Storage — containers, and the blobs inside them, all live within a storage account, which has a globally unique name.",
  },
  {
    id: "azure-storage-databases-2",
    question: "Which Blob Storage access tier offers the lowest storage cost but can take hours to retrieve data from?",
    type: "single",
    options: [
      "Hot",
      "Cool",
      "Archive",
      "Premium",
    ],
    correctIndexes: [2],
    explanation:
      "The Archive tier offers the lowest storage cost among Blob Storage's tiers, but retrieval can take hours, making it suitable only for rarely accessed, long-term data — Azure's equivalent of S3 Glacier.",
  },
  {
    id: "azure-storage-databases-3",
    question: "What does a Shared Access Signature (SAS) provide?",
    type: "single",
    options: [
      "Permanent, unrestricted access to an entire storage account",
      "Temporary, scoped access to a container or blob without sharing the storage account's master key",
      "A way to permanently delete a storage account",
      "A billing report for storage usage",
    ],
    correctIndexes: [1],
    explanation:
      "A SAS grants temporary, scoped access (e.g. read-only access to one blob for a limited time) without exposing the storage account's master key — the Azure equivalent of a presigned S3 URL.",
  },
  {
    id: "azure-storage-databases-4",
    question: "What is the difference between the DTU-based and vCore-based purchasing models for Azure SQL Database?",
    type: "single",
    options: [
      "DTU bundles compute, memory, and I/O into one performance unit; vCore lets you choose compute and storage independently and enables Azure Hybrid Benefit",
      "They are identical, just different names for the same billing model",
      "vCore is only available for Cosmos DB, never for Azure SQL Database",
      "DTU-based pricing is always more expensive than vCore-based pricing",
    ],
    correctIndexes: [0],
    explanation:
      "The DTU model bundles compute, memory, and I/O into a single simplified unit. The vCore model lets compute and storage scale independently and is what enables Azure Hybrid Benefit, reusing an existing on-premises SQL Server license for a discount.",
  },
  {
    id: "azure-storage-databases-5",
    question: "What does active geo-replication provide for Azure SQL Database?",
    type: "single",
    options: [
      "Up to four readable secondary copies in other Regions, usable for disaster recovery and offloading distant reads",
      "A way to permanently merge two databases into one",
      "Automatic conversion from a relational to a NoSQL database",
      "Unlimited free storage in a single Region only",
    ],
    correctIndexes: [0],
    explanation:
      "Active geo-replication creates up to four readable secondary copies in other Regions, covering both the disaster-recovery role of RDS Multi-AZ and the read-scaling role of RDS read replicas in a single feature.",
  },
  {
    id: "azure-storage-databases-6",
    question: "In Cosmos DB, what determines which physical partition an item is stored in?",
    type: "single",
    options: [
      "The item's partition key",
      "The Azure Region the account was first created in",
      "The consistency level chosen for the account",
      "The order in which items were inserted",
    ],
    correctIndexes: [0],
    explanation:
      "Cosmos DB uses an item's partition key to determine which physical partition stores it, the same mechanism DynamoDB uses — a high-cardinality, evenly accessed key avoids concentrating traffic on one partition.",
  },
  {
    id: "azure-storage-databases-7",
    question: "What makes Cosmos DB's approach to multi-region distribution distinct from many other databases?",
    type: "single",
    options: [
      "It can only ever run in a single Region and does not support replication",
      "Regions can be added or removed with low friction, and multi-region writes let an application write to whichever Region is nearest to it",
      "It requires manually copying data between Regions with no built-in replication",
      "Multi-region support is only available in a deprecated legacy version",
    ],
    correctIndexes: [1],
    explanation:
      "Cosmos DB treats adding a Region as a low-friction, first-class operation, and supports multi-region writes where an application writes to its nearest Region while Cosmos DB handles conflict resolution for concurrent writes.",
  },
  {
    id: "azure-storage-databases-8",
    question: "What is a Request Unit (RU) in Cosmos DB?",
    type: "single",
    options: [
      "A unit of storage capacity, measured in gigabytes",
      "An abstracted unit representing the throughput cost of a database operation, such as a read or write",
      "The number of Regions an account is replicated to",
      "A unit used only for billing IAM role assignments",
    ],
    correctIndexes: [1],
    explanation:
      "Request Units abstract the cost of a database operation — a small point read costs roughly 1 RU, while a more complex cross-partition query costs more — and throughput is provisioned or consumed in terms of RUs per second.",
  },
];
