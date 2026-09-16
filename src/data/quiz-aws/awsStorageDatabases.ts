import type { QuizQuestion } from "../../types/quiz";

export const awsStorageDatabasesQuestions: QuizQuestion[] = [
  {
    id: "aws-storage-databases-1",
    question: "What uniquely identifies an object within an S3 bucket?",
    type: "single",
    options: [
      "Its key, a string that behaves like a path/name",
      "Its IAM role",
      "The Availability Zone it was uploaded from",
      "Its instance type",
    ],
    correctIndexes: [0],
    explanation:
      "Every S3 object has a key — a string identifier that looks like a file path (e.g. images/2024/photo.jpg). S3 has no true nested folder structure; the '/' characters are a display convention over a flat namespace.",
  },
  {
    id: "aws-storage-databases-2",
    question: "What must be true about an S3 bucket name?",
    type: "single",
    options: [
      "It must be unique only within your own AWS account",
      "It must be globally unique across every AWS account in the world",
      "It must match the name of an existing IAM role",
      "It can be reused freely by any account at any time",
    ],
    correctIndexes: [1],
    explanation:
      "S3 bucket names must be globally unique across all AWS accounts, not just your own — if another account anywhere already owns a given bucket name, you cannot create a bucket with that same name.",
  },
  {
    id: "aws-storage-databases-3",
    question: "Which S3 storage class is designed for long-term archives where retrieval can take minutes to hours in exchange for very low storage cost?",
    type: "single",
    options: [
      "S3 Standard",
      "S3 Infrequent Access",
      "S3 Glacier",
      "S3 Intelligent-Tiering",
    ],
    correctIndexes: [2],
    explanation:
      "S3 Glacier offers very low-cost storage for data that's rarely accessed, at the cost of retrieval times ranging from minutes to hours — appropriate for long-term archives rather than frequently accessed data.",
  },
  {
    id: "aws-storage-databases-4",
    question: "What does enabling S3 versioning protect against?",
    type: "single",
    options: [
      "Slow network transfer speeds",
      "Accidental overwrites or deletions, by keeping every previous version of an object",
      "Unauthorized IAM access to a bucket",
      "High storage costs",
    ],
    correctIndexes: [1],
    explanation:
      "With versioning enabled, overwriting or deleting an object doesn't erase the previous version — it's retained and recoverable, at the cost of storing every version an object has ever had.",
  },
  {
    id: "aws-storage-databases-5",
    question: "What is the main benefit of an RDS Multi-AZ deployment?",
    type: "single",
    options: [
      "It offloads read queries to a second instance to improve read performance",
      "It automatically fails over to a synced standby in a different Availability Zone if the primary fails, without requiring application changes",
      "It reduces the database's storage cost",
      "It converts a relational database into a NoSQL database",
    ],
    correctIndexes: [1],
    explanation:
      "Multi-AZ maintains a synchronously replicated standby in a second AZ. If the primary or its AZ fails, RDS automatically promotes the standby, typically within a minute or two, and the connection endpoint stays the same.",
  },
  {
    id: "aws-storage-databases-6",
    question: "What problem do RDS read replicas solve, and how does that differ from Multi-AZ?",
    type: "single",
    options: [
      "Read replicas solve availability during failure, the same problem Multi-AZ solves",
      "Read replicas scale read throughput by offloading SELECT queries; Multi-AZ solves availability during a failure — they solve different problems",
      "Read replicas are only usable for write queries",
      "Read replicas replace the need for automated backups",
    ],
    correctIndexes: [1],
    explanation:
      "Read replicas are asynchronously replicated, queryable copies used to scale read throughput. Multi-AZ standbys are not directly queryable and exist purely for automatic failover. The two solve different problems and are often used together.",
  },
  {
    id: "aws-storage-databases-7",
    question: "In DynamoDB, what is the purpose of the partition key?",
    type: "single",
    options: [
      "It determines which physical partition stores a given item, based on its value",
      "It defines the IAM permissions for the table",
      "It sets the table's storage class",
      "It is only used for sorting query results, never for locating data",
    ],
    correctIndexes: [0],
    explanation:
      "DynamoDB uses an item's partition key to decide which internal physical partition stores it. A high-cardinality, evenly accessed partition key spreads load across partitions; a low-cardinality one can create a 'hot' partition bottleneck.",
  },
  {
    id: "aws-storage-databases-8",
    question: "What is the difference between an eventually consistent read and a strongly consistent read in DynamoDB?",
    type: "single",
    options: [
      "There is no functional difference; the names are purely cosmetic",
      "An eventually consistent read may briefly reflect a slightly stale value after a very recent write; a strongly consistent read always reflects the latest value",
      "Strongly consistent reads are always faster than eventually consistent reads",
      "Eventually consistent reads are only available for write operations",
    ],
    correctIndexes: [1],
    explanation:
      "Eventually consistent reads (the default) may briefly return a stale value immediately after a write completes elsewhere, trading a small consistency window for lower latency/cost. Strongly consistent reads guarantee the latest value at a small latency/cost tradeoff.",
  },
];
