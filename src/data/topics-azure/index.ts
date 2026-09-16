import type { Topic } from "../../types";

// Azure Fundamentals
import { azureIntroductionTopic } from "./azureIntroduction";
import { azureRegionsAvailabilityZonesTopic } from "./azureRegionsAvailabilityZones";
import { azureEntraIdBasicsTopic } from "./azureEntraIdBasics";

// Compute
import { azureVirtualMachinesTopic } from "./azureVirtualMachines";
import { azureFunctionsBasicsTopic } from "./azureFunctionsBasics";

// Storage & Databases
import { azureBlobStorageTopic } from "./azureBlobStorage";
import { azureSqlDatabaseTopic } from "./azureSqlDatabase";
import { azureCosmosDbTopic } from "./azureCosmosDb";

// Networking & Deployment
import { azureVirtualNetworkTopic } from "./azureVirtualNetwork";
import { azureArmBicepTopic } from "./azureArmBicep";
import { azureAppServiceDeploymentTopic } from "./azureAppServiceDeployment";

export const azureTopics: Topic[] = [
  azureIntroductionTopic,
  azureRegionsAvailabilityZonesTopic,
  azureEntraIdBasicsTopic,

  azureVirtualMachinesTopic,
  azureFunctionsBasicsTopic,

  azureBlobStorageTopic,
  azureSqlDatabaseTopic,
  azureCosmosDbTopic,

  azureVirtualNetworkTopic,
  azureArmBicepTopic,
  azureAppServiceDeploymentTopic,
];
