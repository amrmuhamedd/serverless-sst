import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

import * as uuid from "uuid";
import axios from 'axios'
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export  const main = async(event : APIGatewayProxyEvent):  Promise<APIGatewayProxyResult>=> {
const url =`https://itunes.apple.com/search?term=${event?.queryStringParameters?.searchTerm}&limit=15`
const searchResult =  await axios.get(encodeURI(url))
  .then((res) => {
    return res.data
  })
  .catch(function (err) {
    console.log("Unable to fetch -", err);
  });
  const ItemId = uuid.v1();
  const params = {
    TableName: `${process.env.tableName}`,
    Item: {
      id: ItemId,
      searchResult, 
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();
  const result =await dynamoDb.get({TableName : `${process.env.tableName}` , Key :{id : ItemId}}).promise()
  return {
    statusCode: 201,
    body: JSON.stringify(result.Item),
  }
}
