const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  async getNinjas() {
    let params = {
      TableName: process.env.NINJA_LIST_TABLE,
    };
    let output = [];

    do {
      let data = await client.scan(params).promise();

      output = output.concat(...data.Items);
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (typeof params.ExclusiveStartKey != "undefined");

    return output;
  },
};
