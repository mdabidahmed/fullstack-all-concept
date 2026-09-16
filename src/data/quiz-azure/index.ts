import type { QuizQuestion } from "../../types/quiz";
import { azureFundamentalsQuestions } from "./azureFundamentals";
import { azureComputeQuestions } from "./azureCompute";
import { azureStorageDatabasesQuestions } from "./azureStorageDatabases";
import { azureNetworkingDeploymentQuestions } from "./azureNetworkingDeployment";

export { azureQuizCategoryMeta } from "./categories";

export const azureQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "azure-fundamentals": azureFundamentalsQuestions,
  "azure-compute": azureComputeQuestions,
  "azure-storage-databases": azureStorageDatabasesQuestions,
  "azure-networking-deployment": azureNetworkingDeploymentQuestions,
};
