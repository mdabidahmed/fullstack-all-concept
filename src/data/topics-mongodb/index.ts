import type { Topic } from "../../types";

// MongoDB Basics
import { mongodbIntroductionTopic } from "./mongodbIntroduction";
import { mongodbSqlVsNosqlTopic } from "./mongodbSqlVsNosql";
import { mongodbDocumentsBsonTopic } from "./mongodbDocumentsBson";
import { mongodbDatabasesCollectionsTopic } from "./mongodbDatabasesCollections";
import { mongodbDataTypesTopic } from "./mongodbDataTypes";
import { mongodbObjectIdTopic } from "./mongodbObjectId";
import { mongodbShellDriversTopic } from "./mongodbShellDrivers";

// Create & Read
import { mongodbInsertOneTopic } from "./mongodbInsertOne";
import { mongodbInsertManyTopic } from "./mongodbInsertMany";
import { mongodbFindTopic } from "./mongodbFind";

// Update & Delete
import { mongodbUpdateOneTopic } from "./mongodbUpdateOne";
import { mongodbUpdateManyTopic } from "./mongodbUpdateMany";
import { mongodbUpdateOperatorsTopic } from "./mongodbUpdateOperators";
import { mongodbReplaceOneTopic } from "./mongodbReplaceOne";
import { mongodbDeleteOneTopic } from "./mongodbDeleteOne";
import { mongodbDeleteManyTopic } from "./mongodbDeleteMany";

// Indexes & Performance
import { mongodbIndexesIntroTopic } from "./mongodbIndexesIntro";

// Aggregation Framework
import { mongodbGroupStageTopic } from "./mongodbGroupStage";

// Mongoose & Node Integration
import { mongodbMongooseIntroTopic } from "./mongodbMongooseIntro";
import { mongodbMongooseSchemasModelsTopic } from "./mongodbMongooseSchemasModels";
import { mongodbMongooseCrudTopic } from "./mongodbMongooseCrud";
import { mongodbMongooseValidationTopic } from "./mongodbMongooseValidation";
import { mongodbMongooseMiddlewareTopic } from "./mongodbMongooseMiddleware";
import { mongodbConnectingNodeTopic } from "./mongodbConnectingNode";

export const mongodbTopics: Topic[] = [
  mongodbIntroductionTopic,
  mongodbSqlVsNosqlTopic,
  mongodbDocumentsBsonTopic,
  mongodbDatabasesCollectionsTopic,
  mongodbDataTypesTopic,
  mongodbObjectIdTopic,
  mongodbShellDriversTopic,

  mongodbInsertOneTopic,
  mongodbInsertManyTopic,
  mongodbFindTopic,

  mongodbUpdateOneTopic,
  mongodbUpdateManyTopic,
  mongodbUpdateOperatorsTopic,
  mongodbReplaceOneTopic,
  mongodbDeleteOneTopic,
  mongodbDeleteManyTopic,

  mongodbIndexesIntroTopic,

  mongodbGroupStageTopic,

  mongodbMongooseIntroTopic,
  mongodbMongooseSchemasModelsTopic,
  mongodbMongooseCrudTopic,
  mongodbMongooseValidationTopic,
  mongodbMongooseMiddlewareTopic,
  mongodbConnectingNodeTopic,
];
