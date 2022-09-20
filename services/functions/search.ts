import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import AWS from "aws-sdk";

import * as uuid from "uuid";
import axios from 'axios'
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export  const main :APIGatewayProxyHandlerV2= async(event)=> {
  // return event.queryStringParameters.searchTerm
const url =`https://itunes.apple.com/search?term=${event.queryStringParameters.searchTerm}&limit=15`
const searchResult =  await axios.get(encodeURI(url))
  .then((res) => {
    return res.data
  })
  .catch(function (err) {
    console.log("Unable to fetch -", err);
  });
  const params = {
    // Get the table name from the environment variable
    TableName: process.env.tableName,
    Item: {
      id: uuid.v1(),
      content: searchResult, // Parsed from request body
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();
  return searchResult
}
