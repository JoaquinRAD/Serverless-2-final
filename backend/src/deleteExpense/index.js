const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const db = require("../shared/dynamodb");
const response = require("../shared/response");
const getUserId = require("../shared/auth");

exports.handler = async (event) => {
  try {
    const userId = getUserId(event);
    const expenseId = event.pathParameters.id;

    await db.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          userId,
          expenseId
        }
      })
    );

    return response(200, { message: "Expense deleted" });

  } catch (err) {
    return response(500, { error: err.message });
  }
};
