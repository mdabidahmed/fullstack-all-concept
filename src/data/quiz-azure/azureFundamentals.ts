import type { QuizQuestion } from "../../types/quiz";

export const azureFundamentalsQuestions: QuizQuestion[] = [
  {
    id: "azure-fundamentals-1",
    question: "What is the purpose of an Azure resource group?",
    type: "single",
    options: [
      "It is a billing-only construct with no effect on resource lifecycle",
      "It is a logical container holding related resources that share a lifecycle, such that deleting the group deletes everything inside it",
      "It is a type of virtual machine optimized for grouped workloads",
      "It only exists at the subscription level and cannot contain individual resources",
    ],
    correctIndexes: [1],
    explanation:
      "A resource group is a logical container for related resources that share a lifecycle. Deleting a resource group deletes every resource inside it as a single action, similar in spirit to a CloudFormation stack.",
  },
  {
    id: "azure-fundamentals-2",
    question: "What is Azure Resource Manager (ARM)?",
    type: "single",
    options: [
      "A physical server rack used only in on-premises datacenters",
      "The deployment and management layer underneath the Azure portal, CLI, and SDKs, through which every action ultimately passes",
      "A type of Azure Virtual Machine",
      "A billing report generated once per month",
    ],
    correctIndexes: [1],
    explanation:
      "ARM is the underlying deployment and management layer for Azure. Whether you use the portal, CLI, SDKs, or an ARM/Bicep template, every action is ultimately processed through Resource Manager.",
  },
  {
    id: "azure-fundamentals-3",
    question: "What is an Azure Region pair?",
    type: "single",
    options: [
      "Two unrelated Regions with no connection to each other",
      "Two Regions within the same geography, typically separated by at least 300 miles, used for maintenance sequencing and disaster recovery",
      "A billing discount applied when using exactly two Regions",
      "A pair of Availability Zones within a single Region",
    ],
    correctIndexes: [1],
    explanation:
      "Azure pairs most Regions with another Region in the same geography, separated by a minimum distance where possible. Region pairs are used to sequence planned maintenance and are a natural target for disaster-recovery replication.",
  },
  {
    id: "azure-fundamentals-4",
    question: "What is the relationship between Availability Zones and a Region in Azure?",
    type: "single",
    options: [
      "Availability Zones are physically separate datacenters within a Region, each with independent power and networking",
      "Availability Zones span multiple Regions simultaneously",
      "A Region can only ever have exactly one Availability Zone",
      "Availability Zones are a deprecated feature no longer used in Azure",
    ],
    correctIndexes: [0],
    explanation:
      "Within many Regions, Azure offers Availability Zones: physically separate datacenters with independent power, cooling, and networking, used to protect against a single datacenter-level failure.",
  },
  {
    id: "azure-fundamentals-5",
    question: "In Azure RBAC, what does 'scope' refer to?",
    type: "single",
    options: [
      "The programming language a resource is written in",
      "The level at which a role is assigned — a subscription, a resource group, or a single resource",
      "The maximum number of users allowed in a tenant",
      "The geographic Region a role applies to",
    ],
    correctIndexes: [1],
    explanation:
      "A role like 'Contributor' or 'Reader' is assigned at a specific scope — a whole subscription, one resource group, or a single resource — and only grants that access within the chosen scope.",
  },
  {
    id: "azure-fundamentals-6",
    question: "What is a managed identity used for?",
    type: "single",
    options: [
      "Storing a user's password in plaintext for convenience",
      "Letting an Azure resource authenticate to other Azure services without any credential stored in code or configuration",
      "Replacing the need for resource groups",
      "Only used for billing purposes, never for authentication",
    ],
    correctIndexes: [1],
    explanation:
      "A managed identity lets a resource like a VM or Azure Function authenticate to other services without a stored credential — Azure issues short-lived tokens on the resource's behalf, the same role an IAM role assumed by an EC2 instance plays on AWS.",
  },
  {
    id: "azure-fundamentals-7",
    question: "What does a Conditional Access policy in Microsoft Entra ID do?",
    type: "single",
    options: [
      "It permanently blocks all sign-ins from outside the office",
      "It enforces contextual rules, such as requiring MFA when a sign-in looks risky (e.g. from an unfamiliar location)",
      "It only applies to billing operations",
      "It replaces the need for role-based access control entirely",
    ],
    correctIndexes: [1],
    explanation:
      "Conditional Access adds risk-based, contextual authentication rules on top of a plain password — for example, requiring multi-factor authentication when a sign-in originates from an unfamiliar location or device.",
  },
  {
    id: "azure-fundamentals-8",
    question: "What is the correct top-to-bottom organizational hierarchy in Azure?",
    type: "single",
    options: [
      "Resource → Resource Group → Subscription → Management Group",
      "Management Group → Subscription → Resource Group → Resource",
      "Subscription → Resource → Resource Group → Management Group",
      "Resource Group → Management Group → Subscription → Resource",
    ],
    correctIndexes: [1],
    explanation:
      "Azure's hierarchy runs Management Group → Subscription → Resource Group → Resource, top to bottom, mirroring how larger organizations segment cost, access, and compliance across environments and departments.",
  },
];
