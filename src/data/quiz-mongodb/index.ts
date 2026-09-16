import type { QuizQuestion } from "../../types/quiz";
import { mongodbBasicsQuestions } from "./mongodbBasics";
import { mongodbCreateReadQuestions } from "./mongodbCreateRead";
import { mongodbUpdateDeleteQuestions } from "./mongodbUpdateDelete";
import { mongodbSchemaDesignQuestions } from "./mongodbSchemaDesign";
import { mongodbIndexesPerformanceQuestions } from "./mongodbIndexesPerformance";
import { mongodbAggregationQuestions } from "./mongodbAggregation";
import { mongodbMongooseNodeQuestions } from "./mongodbMongooseNode";
import { mongodbAdvancedAdminQuestions } from "./mongodbAdvancedAdmin";

export { mongodbQuizCategoryMeta } from "./categories";

export const mongodbQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "mongodb-basics": mongodbBasicsQuestions,
  "mongodb-create-read": mongodbCreateReadQuestions,
  "mongodb-update-delete": mongodbUpdateDeleteQuestions,
  "mongodb-schema-design": mongodbSchemaDesignQuestions,
  "mongodb-indexes-performance": mongodbIndexesPerformanceQuestions,
  "mongodb-aggregation": mongodbAggregationQuestions,
  "mongodb-mongoose-node": mongodbMongooseNodeQuestions,
  "mongodb-advanced-admin": mongodbAdvancedAdminQuestions,
};
