const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function deleteKatanaByID
   * @description Method used for deleting katanas by ID.
   * @param {string} id ID of katana to delete
   * @returns {Promise} Promise indicating end of deletion process.
   */
  async deleteKatanaByID(id) {
    let params = {
      TableName: process.env.KATANA_TABLE,
      Key: {},
    };

    params.Key["id"] = id;

    return client.delete(params).promise();
  },
};
