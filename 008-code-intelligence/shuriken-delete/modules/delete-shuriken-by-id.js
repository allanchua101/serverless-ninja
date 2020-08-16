const AWS = require("aws-sdk");
const options = {
  apiVersion: "2012-08-10",
  region: process.env.APP_REGION || "ap-southeast-1",
};
const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  /**
   * @async
   * @function deleteShurikenByID
   * @description Method used for deleting shurikens by ID.
   * @param {string} id ID of shuriken to delete
   * @returns {Promise} Promise indicating end of deletion process.
   */
  async deleteShurikenByID(id) {
    let params = {
      TableName: process.env.SHURIKEN_TABLE,
      Key: {},
    };

    params.Key["id"] = id;

    return client.delete(params).promise();
  },
};
