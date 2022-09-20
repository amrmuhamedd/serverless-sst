import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  return {
        statusCode: 200,
        body: JSON.stringify("hello world"),
      }
};
