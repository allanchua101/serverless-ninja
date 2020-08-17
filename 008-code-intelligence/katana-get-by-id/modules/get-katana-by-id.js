const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function getKatanaByID
   * @description Method used for retrieving a katana by ID.
   * @params {string} id ID of target katana.
   * @returns {Promise<object>} ID of target katana.
   */
  async getKatanaByID(id) {
    let params = {
      TableName: process.env.KATANA_TABLE,
      KeyConditionExpression: "#id = :id",
      ExpressionAttributeNames: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": id,
      },
    };
    let output = [];

    do {
      let data = await client.query(params).promise();

      output = output.concat(...data.Items);
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (typeof params.ExclusiveStartKey != "undefined");

    if (output.length === 0) {
      return null;
    }

    return output[0];
  },
};
