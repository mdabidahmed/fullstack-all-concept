import type { Topic } from "../../types";

// AWS Fundamentals
import { awsIntroductionTopic } from "./awsIntroduction";
import { awsGlobalInfrastructureTopic } from "./awsGlobalInfrastructure";
import { awsIamBasicsTopic } from "./awsIamBasics";
import { awsSecretsParameterStoreTopic } from "./awsSecretsParameterStore";

// Compute
import { awsEc2BasicsTopic } from "./awsEc2Basics";
import { awsLambdaBasicsTopic } from "./awsLambdaBasics";
import { awsElbBasicsTopic } from "./awsElbBasics";
import { awsApiGatewayTopic } from "./awsApiGateway";

// Storage & Databases
import { awsS3BasicsTopic } from "./awsS3Basics";
import { awsRdsBasicsTopic } from "./awsRdsBasics";
import { awsDynamodbBasicsTopic } from "./awsDynamodbBasics";
import { awsEbsEfsStorageTopic } from "./awsEbsEfsStorage";

// Networking & Deployment
import { awsVpcBasicsTopic } from "./awsVpcBasics";
import { awsCloudformationBasicsTopic } from "./awsCloudformationBasics";
import { awsDeploymentOverviewTopic } from "./awsDeploymentOverview";
import { awsRoute53DnsTopic } from "./awsRoute53Dns";
import { awsCloudfrontCdnTopic } from "./awsCloudfrontCdn";

// Monitoring & Messaging
import { awsCloudwatchMonitoringTopic } from "./awsCloudwatchMonitoring";
import { awsSnsSqsMessagingTopic } from "./awsSnsSqsMessaging";

export const awsTopics: Topic[] = [
  awsIntroductionTopic,
  awsGlobalInfrastructureTopic,
  awsIamBasicsTopic,
  awsSecretsParameterStoreTopic,

  awsEc2BasicsTopic,
  awsLambdaBasicsTopic,
  awsElbBasicsTopic,
  awsApiGatewayTopic,

  awsS3BasicsTopic,
  awsRdsBasicsTopic,
  awsDynamodbBasicsTopic,
  awsEbsEfsStorageTopic,

  awsVpcBasicsTopic,
  awsCloudformationBasicsTopic,
  awsDeploymentOverviewTopic,
  awsRoute53DnsTopic,
  awsCloudfrontCdnTopic,

  awsCloudwatchMonitoringTopic,
  awsSnsSqsMessagingTopic,
];
