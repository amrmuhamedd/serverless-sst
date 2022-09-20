import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const main = async (event : APIGatewayProxyEvent) :  Promise<APIGatewayProxyResult> => {
  const params = {
    TableName: `${process.env.tableName}`,
  };
  const results = await dynamoDb.scan(params).promise();

  return {
        statusCode: 200,
        body: JSON.stringify(results.Items),
      }

};
