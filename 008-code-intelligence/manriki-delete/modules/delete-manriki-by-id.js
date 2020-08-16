const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function deleteManrikiByID
   * @description Method used for deleting manrikis by ID.
   * @param {string} id ID of manrikis to delete
   * @returns {Promise} Promise indicating end of deletion process.
   */
  async deleteManrikiByID(id) {
    let params = {
      TableName: process.env.MANRIKI_TABLE,
      Key: {},
    };

    params.Key["id"] = id;

    return client.delete(params).promise();
  },
};
