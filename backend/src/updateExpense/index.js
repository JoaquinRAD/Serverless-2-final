const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const db = require("../shared/dynamodb");
const response = require("../shared/response");
const getUserId = require("../shared/auth");

exports.handler = async (event) => {
  try {
    const userId = getUserId(event);
    const expenseId = event.pathParameters.id;

    const body = JSON.parse(event.body);

    await db.send(
      new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          userId,
          expenseId
        },
        UpdateExpression:
          "SET #d = :d, amount = :a, category = :c, description = :desc",
        ExpressionAttributeNames: {
          "#d": "date"
        },
        ExpressionAttributeValues: {
          ":d": body.date,
          ":a": body.amount,
          ":c": body.category,
          ":desc": body.description
        }
      })
    );

    return response(200, { message: "Expense updated" });

  } catch (err) {
    return response(500, { error: err.message });
  }
};
