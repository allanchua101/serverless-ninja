const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function deleteNinjaByID
   * @description Method used for deleting ninjas by ID.
   * @param {string} id ID of ninja to delete
   * @returns {Promise} Promise indicating end of deletion process.
   */
  async deleteNinjaByID(id) {
    let params = {
      TableName: process.env.NINJA_LIST_TABLE,
      Key: {},
    };

    params.Key["id"] = id;

    return client.delete(params).promise();
  },
};
