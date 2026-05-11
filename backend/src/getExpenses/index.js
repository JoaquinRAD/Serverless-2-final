const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const db = require("../shared/dynamodb");
const response = require("../shared/response");
const getUserId = require("../shared/auth");

exports.handler = async (event) => {
  try {
    const userId = getUserId(event);

    const result = await db.send(
      new QueryCommand({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
          ":u": userId
        }
      })
    );

    return response(200, result.Items);

  } catch (err) {
    return response(500, { error: err.message });
  }
};
