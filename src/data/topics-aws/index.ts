import type { Topic } from "../../types";

// AWS Fundamentals
import { awsIntroductionTopic } from "./awsIntroduction";
import { awsGlobalInfrastructureTopic } from "./awsGlobalInfrastructure";
import { awsIamBasicsTopic } from "./awsIamBasics";

// Compute
import { awsEc2BasicsTopic } from "./awsEc2Basics";
import { awsLambdaBasicsTopic } from "./awsLambdaBasics";

// Storage & Databases
import { awsS3BasicsTopic } from "./awsS3Basics";
import { awsRdsBasicsTopic } from "./awsRdsBasics";
import { awsDynamodbBasicsTopic } from "./awsDynamodbBasics";

// Networking & Deployment
import { awsVpcBasicsTopic } from "./awsVpcBasics";
import { awsCloudformationBasicsTopic } from "./awsCloudformationBasics";
import { awsDeploymentOverviewTopic } from "./awsDeploymentOverview";

export const awsTopics: Topic[] = [
  awsIntroductionTopic,
  awsGlobalInfrastructureTopic,
  awsIamBasicsTopic,

  awsEc2BasicsTopic,
  awsLambdaBasicsTopic,

  awsS3BasicsTopic,
  awsRdsBasicsTopic,
  awsDynamodbBasicsTopic,

  awsVpcBasicsTopic,
  awsCloudformationBasicsTopic,
  awsDeploymentOverviewTopic,
];
