const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function getKunais
   * @description Method used for retrieving list of kunai.
   * @returns {Promise<object[]>} List of recorded kunai.
   */
  async getKunais() {
    let params = {
      TableName: process.env.KUNAI_TABLE,
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
