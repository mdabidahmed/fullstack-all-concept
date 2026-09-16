import type { QuizQuestion } from "../../types/quiz";
import { awsFundamentalsQuestions } from "./awsFundamentals";
import { awsComputeQuestions } from "./awsCompute";
import { awsStorageDatabasesQuestions } from "./awsStorageDatabases";
import { awsNetworkingDeploymentQuestions } from "./awsNetworkingDeployment";

export { awsQuizCategoryMeta } from "./categories";

export const awsQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "aws-fundamentals": awsFundamentalsQuestions,
  "aws-compute": awsComputeQuestions,
  "aws-storage-databases": awsStorageDatabasesQuestions,
  "aws-networking-deployment": awsNetworkingDeploymentQuestions,
};
