import type { QuizQuestion } from "../../types/quiz";

export const azureComputeQuestions: QuizQuestion[] = [
  {
    id: "azure-compute-1",
    question: "What does an Azure VM size (like B2s or D4s_v5) determine?",
    type: "single",
    options: [
      "Only the geographic Region the VM runs in",
      "The vCPU count, memory, and temporary disk performance the VM gets",
      "The IAM role assigned to the VM",
      "The name of the resource group the VM belongs to",
    ],
    correctIndexes: [1],
    explanation:
      "A VM size determines vCPU count, memory, and disk performance, grouped into series aimed at different workload shapes (general purpose, compute-optimized, memory-optimized, GPU) — the same role an EC2 instance type plays on AWS.",
  },
  {
    id: "azure-compute-2",
    question: "What is the role of a Network Security Group (NSG) attached to a VM?",
    type: "single",
    options: [
      "It acts as a firewall, controlling inbound and outbound traffic by allow/deny rules",
      "It automatically scales the VM up or down",
      "It stores the VM's application logs",
      "It determines which VM size is available",
    ],
    correctIndexes: [0],
    explanation:
      "An NSG is a set of allow/deny rules controlling inbound and outbound traffic to a VM or subnet, functioning as a virtual firewall — Azure's equivalent of an EC2 security group.",
  },
  {
    id: "azure-compute-3",
    question: "What does a Virtual Machine Scale Set (VMSS) do?",
    type: "single",
    options: [
      "It permanently fixes the number of VM instances at deployment time",
      "It automatically adds or removes identical VM instances to match demand, similar to an Auto Scaling group",
      "It only works with a single VM at a time",
      "It replaces the need for Network Security Groups",
    ],
    correctIndexes: [1],
    explanation:
      "A Virtual Machine Scale Set manages a set of identical VM instances that scales in or out automatically based on a metric or schedule — Azure's direct equivalent of an EC2 Auto Scaling group.",
  },
  {
    id: "azure-compute-4",
    question: "What is the difference between an Availability Set and an Availability Zone?",
    type: "single",
    options: [
      "They are identical concepts with different names",
      "An Availability Set protects against hardware/rack failure within one datacenter; an Availability Zone protects against an entire datacenter failure",
      "An Availability Set spans multiple Regions, while an Availability Zone does not",
      "Availability Zones are only usable with Azure Functions, never with VMs",
    ],
    correctIndexes: [1],
    explanation:
      "An Availability Set spreads VMs across different hardware within a single datacenter, protecting against a hardware-level failure. Availability Zones spread VMs across entirely separate datacenters, protecting against a datacenter-level failure.",
  },
  {
    id: "azure-compute-5",
    question: "What triggers an Azure Function to execute?",
    type: "multi",
    options: [
      "An HTTP request",
      "A new blob uploaded to Blob Storage",
      "A timer on a schedule",
      "A function can only be triggered manually through the Azure portal",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Azure Functions are event-driven: common triggers include HTTP requests, a new blob landing in storage, a queue message, a Cosmos DB change, or a timer-based schedule — not solely manual invocation.",
  },
  {
    id: "azure-compute-6",
    question: "On the Consumption plan, how is Azure Functions billed?",
    type: "single",
    options: [
      "A fixed monthly fee regardless of usage",
      "Per execution and per GB-second of resource consumption, with no charge while idle",
      "Per hour, exactly like a continuously running VM",
      "A one-time fee when the function is first created",
    ],
    correctIndexes: [1],
    explanation:
      "The Consumption plan bills per execution and per GB-second of resource usage, with zero cost while the function is idle — the same billing model Lambda uses on AWS.",
  },
  {
    id: "azure-compute-7",
    question: "What problem does the Premium hosting plan solve compared to the Consumption plan?",
    type: "single",
    options: [
      "It removes the need for any triggers",
      "It keeps pre-warmed instances ready, effectively eliminating cold starts, at the cost of some of the Consumption plan's cost efficiency",
      "It is only usable for HTTP-triggered functions",
      "It reduces the maximum execution time to under one minute",
    ],
    correctIndexes: [1],
    explanation:
      "The Premium plan keeps a small number of pre-warmed instances ready so a function doesn't incur cold-start latency, trading away some of the Consumption plan's pure pay-per-use cost efficiency.",
  },
  {
    id: "azure-compute-8",
    question: "What is the purpose of Durable Functions?",
    type: "single",
    options: [
      "To make a function run forever without any trigger",
      "To orchestrate stateful, multi-step workflows as code, with automatic checkpointing of progress",
      "To increase a VM's storage capacity",
      "To replace Network Security Groups",
    ],
    correctIndexes: [1],
    explanation:
      "Durable Functions is an extension for orchestrating stateful, multi-step workflows — such as calling several functions in sequence or in parallel — using an orchestrator function that checkpoints its progress automatically.",
  },
];
