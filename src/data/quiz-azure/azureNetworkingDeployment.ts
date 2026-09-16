import type { QuizQuestion } from "../../types/quiz";

export const azureNetworkingDeploymentQuestions: QuizQuestion[] = [
  {
    id: "azure-networking-deployment-1",
    question: "What is a Virtual Network (VNet) in Azure?",
    type: "single",
    options: [
      "A managed relational database service",
      "An isolated, private, software-defined network within Azure, with its own IP address range",
      "A billing report for network usage",
      "A type of Azure Function trigger",
    ],
    correctIndexes: [1],
    explanation:
      "A VNet is an isolated, private network within Azure that you control the address space, subnets, and routing for — the direct equivalent of an AWS VPC.",
  },
  {
    id: "azure-networking-deployment-2",
    question: "How does an Azure subnet's relationship to Availability Zones differ from an AWS subnet's?",
    type: "single",
    options: [
      "They behave identically in both clouds",
      "An Azure subnet isn't tied to a single Availability Zone — VMs within one subnet can be spread across multiple zones directly, unlike an AWS subnet which lives in exactly one AZ",
      "Azure subnets can never span more than one Region",
      "AWS subnets can span multiple zones, while Azure subnets cannot",
    ],
    correctIndexes: [1],
    explanation:
      "Unlike an AWS subnet, which is tied to exactly one Availability Zone, an Azure subnet isn't zone-bound — VMs within a single subnet can be spread across multiple Availability Zones directly.",
  },
  {
    id: "azure-networking-deployment-3",
    question: "What does VNet peering accomplish?",
    type: "single",
    options: [
      "It merges two VNets into a single VNet with one shared address space",
      "It connects two VNets so resources in each can communicate using private IP addresses, without crossing the public internet",
      "It automatically creates a new Azure subscription",
      "It is required before any VM can be created",
    ],
    correctIndexes: [1],
    explanation:
      "VNet peering connects two VNets (in the same or different Regions) so resources in each can communicate privately, without the traffic crossing the public internet — Azure's equivalent of VPC peering.",
  },
  {
    id: "azure-networking-deployment-4",
    question: "What does an ARM template describe?",
    type: "single",
    options: [
      "A step-by-step script of manual console actions",
      "The desired end state of a set of Azure resources, declared in JSON",
      "A list of Entra ID users and their passwords",
      "A billing invoice for a subscription",
    ],
    correctIndexes: [1],
    explanation:
      "An ARM template is a declarative JSON document describing desired resources and their properties, not a sequence of steps — Resource Manager reconciles the actual environment to match it.",
  },
  {
    id: "azure-networking-deployment-5",
    question: "What is Bicep's relationship to ARM templates?",
    type: "single",
    options: [
      "Bicep is an entirely separate deployment engine unrelated to ARM",
      "Bicep is a cleaner, higher-level language that compiles directly to ARM JSON, targeting the same deployment engine and resources",
      "Bicep can only be used for virtual machines, never for other resource types",
      "Bicep replaces the need for resource groups",
    ],
    correctIndexes: [1],
    explanation:
      "Bicep compiles directly to ARM JSON — it's a more pleasant syntax for authoring the exact same underlying ARM template, targeting the same deployment engine and the same set of Azure resources.",
  },
  {
    id: "azure-networking-deployment-6",
    question: "What does the 'what-if' command do before an ARM/Bicep deployment?",
    type: "single",
    options: [
      "It permanently deletes the resource group",
      "It previews exactly what a deployment would create, modify, or delete, without making any actual change",
      "It automatically rolls back the previous deployment",
      "It converts a Bicep file back into ARM JSON only",
    ],
    correctIndexes: [1],
    explanation:
      "'what-if' shows exactly what a deployment would change — including a risky resource replacement — before it actually runs, directly analogous to a CloudFormation change set.",
  },
  {
    id: "azure-networking-deployment-7",
    question: "What does Azure App Service manage on your behalf compared to running your own VMs?",
    type: "single",
    options: [
      "Nothing — you must still manually configure the underlying VM and OS",
      "The underlying VM, OS patching, and load balancing, after you deploy your application code or container",
      "Only DNS records for a custom domain",
      "Only Entra ID user accounts",
    ],
    correctIndexes: [1],
    explanation:
      "App Service is a Platform-as-a-Service offering: you deploy code or a container, and Azure handles the underlying VM, OS patching, and load balancing — a step further removed from infrastructure than a VM-based deployment.",
  },
  {
    id: "azure-networking-deployment-8",
    question: "What does 'slot swapping' in App Service accomplish?",
    type: "single",
    options: [
      "It permanently deletes the staging slot",
      "It promotes a staging slot to production by swapping routing at the network level, with the new version already warmed up, resulting in near-zero downtime",
      "It duplicates the production slot's data into a backup only",
      "It changes which Azure Region an app is hosted in",
    ],
    correctIndexes: [1],
    explanation:
      "Slot swapping promotes a slot (like staging) to production by swapping routing at the network level. Since the promoted slot was already warmed up and tested, the swap results in near-zero downtime and an easy rollback by swapping again.",
  },
];
