const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const db = require("../shared/dynamodb");
const response = require("../shared/response");
const getUserId = require("../shared/auth");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const expense = {
      userId: getUserId(event),
      expenseId: uuidv4(),
      date: body.date,
      amount: body.amount,
      category: body.category,
      description: body.description
    };

    await db.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: expense
      })
    );

    return response(201, expense);

  } catch (err) {
    return response(500, { error: err.message });
  }
};
