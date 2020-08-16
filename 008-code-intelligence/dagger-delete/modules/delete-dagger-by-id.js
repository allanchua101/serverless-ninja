const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function deleteDaggerByID
   * @description Method used for deleting daggers by ID.
   * @param {string} id ID of dagger to delete
   * @returns {Promise} Promise indicating end of deletion process.
   */
  async deleteDaggerByID(id) {
    let params = {
      TableName: process.env.DAGGER_TABLE,
      Key: {},
    };

    params.Key["id"] = id;

    return client.delete(params).promise();
  },
};
